<template>
  <transition name="slide">
    <aside v-if="sidebarLeftOpen"
      :class="['sidebar-left-glass fixed left-0 top-16 bottom-0 z-20 w-64 overflow-y-auto transition-transform duration-300',
        sidebarLeftOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="p-4 space-y-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500" v-if="activeSubmenu !== 'documents'">
            {{ sidebarTitle }}
          </h3>
          <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 cursor-pointer hover:text-brand-600" @click="goBack" v-else>
            ← {{ currentLang === 'en' ? 'Back' : 'ត្រឡប់ក្រោយ' }}
          </h3>
          <button @click="$emit('toggle')"
            class="p-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors text-gray-600 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div v-if="activeSubmenu === 'home'" class="space-y-2">
          <router-link v-for="item in homeItems" :key="item.to" :to="item.to" @click="$emit('close')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium text-left text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100">
            <span>{{ currentLang === 'en' ? item.label : item.labelKh }}</span>
          </router-link>
        </div>

        <div v-else-if="activeSubmenu === 'documents'" class="space-y-2">
          <div v-for="category in categories" :key="category.id" 
            @click="selectCategory(category.id)"
            :class="['w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium text-left',
              selectedCategory === category.id
                ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100']">
            <span>{{ currentLang === 'en' ? getCategoryLabel(category.title) : category.title }}</span>
            <span class="text-xs text-gray-400">{{ getCategoryCount(category.id) }}</span>
          </div>
        </div>

        <div v-else-if="activeSubmenu === 'documents-list' && selectedCategory" class="space-y-2">
          <div v-for="doc in categoryDocuments" :key="doc.id"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium text-left text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 6h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
            <span class="truncate">{{ doc.doc_name }}</span>
          </div>
        </div>

        <div v-else class="space-y-2">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ currentLang === 'en' ? 'Select a menu item from the navbar' : 'ជ្រើសរើសមីនពីចាកទឹក' }}
          </p>
        </div>
      </div>
    </aside>
  </transition>

  <button v-if="!sidebarLeftOpen" @click="$emit('toggle')"
    class="fixed left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-lg bg-white/90 dark:bg-gray-900/90 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors text-gray-600 dark:text-gray-300">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { API_BASE } from '../config/env.js'

const props = defineProps({
  sidebarLeftOpen: Boolean,
  currentLang: String,
  activeSubmenu: String,
})

defineEmits(['toggle', 'close'])

const router = useRouter()

const categories = ref([])
const documents = ref([])
const selectedCategory = ref(null)
const loading = ref(false)

const homeItems = [
  { label: 'Objective', labelKh: 'គោលបំណង', to: '/' },
  { label: 'Donate to Us', labelKh: 'ឧប្បត្ថមពួកយើង', to: '/donate' },
  { label: 'Contact', labelKh: 'ទំនាក់ទំនង', to: '/contact' },
]

const sidebarTitle = computed(() => {
  const titles = {
    'home': { en: 'Home', kh: 'ទំព័រដើម' },
    'documents': { en: 'Documents', kh: 'ឯកសារ' },
  }
  return props.currentLang === 'en' ? (titles[props.activeSubmenu]?.en || 'Menu') : (titles[props.activeSubmenu]?.kh || 'មីន')
})

const categoryDocuments = computed(() => {
  if (!selectedCategory.value) return []
  return documents.value.filter(doc => doc.category_id === selectedCategory.value)
})

const fetchDocuments = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/documents`)
    if (response.data.status === 'success') {
      documents.value = response.data.documents || []
      categories.value = response.data.categories || []
    }
  } catch (error) {
    console.error('Error fetching documents:', error)
  } finally {
    loading.value = false
  }
}

const getCategoryLabel = (title) => {
  const map = {
    'រដ្ឋធម្មនុញ្ញ': 'Constitution',
    'សន្ធិសញ្ញា អនុសញ្ញា កតិកាសញ្ញា': 'Treaty/Convention/Pact',
    'ក្រម': 'Krom',
    'ច្បាប់': 'Law',
    'ព្រះរាជក្រម': 'Preah Reachokram',
    'ព្រះរាជក្រឹត្យ': 'Royal Decree',
    'អនុក្រឹត្យ': 'Sub-Decree',
    'ប្រកាស': 'Brakeas',
    'ដីកា': 'Deyka',
  }
  return map[title] || title
}

const getCategoryCount = (categoryId) => {
  return documents.value.filter(doc => doc.category_id === categoryId).length
}

const selectCategory = async (categoryId) => {
  selectedCategory.value = categoryId
  router.push(`/documents?category=${categoryId}`)
}

const goBack = () => {
  if (selectedCategory.value) {
    selectedCategory.value = null
  }
  // Could emit event to close sidebar or go back to previous view
}

watch(() => props.activeSubmenu, (newVal) => {
  if (newVal === 'documents') {
    fetchDocuments()
  }
})
</script>
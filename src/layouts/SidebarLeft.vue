<template>
  <transition name="slide">
    <aside v-if="sidebarLeftOpen" :class="['sidebar-left-glass flex flex-col fixed left-0 top-16 bottom-0 z-20 transition-transform duration-300',
      props.collapsed ? 'w-16' : 'w-64',
      sidebarLeftOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="p-4 space-y-6 flex-1 flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500"
            v-if="!props.collapsed && activeSubmenu !== 'documents' && activeSubmenu !== 'settings' && activeSubmenu !== 'help'">
            {{ sidebarTitle }}
          </h3>
          <h3
            class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 cursor-pointer hover:text-brand-600"
            @click="goBack"
            v-if="!props.collapsed && (activeSubmenu === 'documents' || activeSubmenu === 'settings' || activeSubmenu === 'help')">
            ← {{ currentLang === 'en' ? 'Back' : 'ត្រឡប់ក្រោយ' }}
          </h3>
          <button @click="$emit('toggle-collapsed')"
            class="p-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors text-gray-600 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div v-if="activeSubmenu === 'home'" class="space-y-2">
          <router-link v-for="item in homeItems" :key="item.to" :to="item.to" @click="$emit('close')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium text-left text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100"
            :class="{ 'justify-center': props.collapsed }">
            <span class="flex-shrink-0">{{ currentLang === 'en' ? item.label : item.labelKh }}</span>
          </router-link>
        </div>

        <div v-else-if="activeSubmenu === 'documents'" class="space-y-2">
          <div v-for="category in categories" :key="category.id" @click="selectCategory(category.id)" :class="['w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium text-left',
            selectedCategory === category.id
              ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100',
            { 'justify-center': props.collapsed }]">
            <span class="truncate">{{ currentLang === 'en' ? getCategoryLabel(category.title) : category.title }}</span>
          </div>
        </div>

        <div v-else-if="activeSubmenu === 'documents-list' && selectedCategory" class="space-y-2">
          <div v-for="doc in categoryDocuments" :key="doc.id"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium text-left text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100"
            :class="{ 'justify-center': props.collapsed }">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 6h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
            <span class="truncate" v-if="!props.collapsed">{{ doc.doc_name }}</span>
          </div>
        </div>

        <div v-else-if="activeSubmenu === 'settings'" class="space-y-2">
          <router-link v-for="item in settingsItems" :key="item.to" :to="item.to" @click="$emit('close')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium text-left text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100"
            :class="{ 'justify-center': props.collapsed }">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="truncate" v-if="!props.collapsed">{{ currentLang === 'en' ? item.label : item.labelKh }}</span>
          </router-link>
        </div>

        <div v-else-if="activeSubmenu === 'help'" class="space-y-2">
          <router-link v-for="item in helpItems" :key="item.to" :to="item.to" @click="$emit('close')"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium text-left text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100"
            :class="{ 'justify-center': props.collapsed }">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2.5-3 4" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span class="truncate" v-if="!props.collapsed">{{ currentLang === 'en' ? item.label : item.labelKh }}</span>
          </router-link>
        </div>

        <div v-else class="space-y-2">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ currentLang === 'en' ? 'Select a menu item from the navbar' : 'ជ្រើសរើសមីនពីចាកទឹក' }}
          </p>
        </div>
      </div>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col gap-1">
          <button @click="$emit('menu-click', 'settings')"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="[
              props.collapsed || activeSubmenu === 'settings' || activeSubmenu === 'help' ? 'justify-center' : 'w-full',
              activeSubmenu === 'settings' ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
            ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span v-if="!props.collapsed && activeSubmenu !== 'settings' && activeSubmenu !== 'help'">
              {{ currentLang === 'en' ? 'Settings' : 'ការកំណត់' }}
            </span>
          </button>
          <button @click="$emit('menu-click', 'help')"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="[
              props.collapsed || activeSubmenu === 'settings' || activeSubmenu === 'help' ? 'justify-center' : 'w-full',
              activeSubmenu === 'help' ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
            ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2.5-3 4" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span v-if="!props.collapsed && activeSubmenu !== 'settings' && activeSubmenu !== 'help'">
              {{ currentLang === 'en' ? 'Help' : 'ជំនួយ' }}
            </span>
          </button>
        </div>
      </div>
    </aside>

  </transition>

  <button v-if="!sidebarLeftOpen" @click="$emit('toggle')"
    class="fixed left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-lg bg-white/90 dark:bg-gray-900/90 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors text-gray-600 dark:text-gray-300">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      stroke-width="2">
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
  collapsed: Boolean,
})

defineEmits(['toggle', 'close', 'menu-click', 'toggle-collapsed'])

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

const settingsItems = [
  { label: 'Profile', labelKh: 'ប្រវត្តិរូប', to: '/settings/profile' },
  { label: 'Preferences', labelKh: 'ចំណូលប្បត្ដិ៍', to: '/settings/preferences' },
  { label: 'Privacy', labelKh: 'ឯកជនភាព', to: '/settings/privacy' },
]

const helpItems = [
  { label: 'FAQ', labelKh: 'សំណួរញឹកញាប់', to: '/help/faq' },
  { label: 'Support', labelKh: 'ជំនួយ', to: '/help/support' },
  { label: 'Documentation', labelKh: 'ឯកសារ', to: '/help/documentation' },
]

const sidebarTitle = computed(() => {
  const titles = {
    'home': { en: 'Home', kh: 'ទំព័រដើម' },
    'documents': { en: 'Documents', kh: 'ឯកសារ' },
    'settings': { en: 'Settings', kh: 'ការកំណតុតូផូស' },
    'help': { en: 'Help', kh: 'ជំនួយ' },
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
}

watch(() => props.activeSubmenu, (newVal) => {
  if (newVal === 'documents') {
    fetchDocuments()
  }
})
</script>
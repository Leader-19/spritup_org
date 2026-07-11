<template>
  <transition name="fade">
    <div v-if="sidebarLeftOpen && isMobile" class="fixed inset-0 z-40 overlay" @click="$emit('toggle')"></div>
  </transition>

  <transition name="slide">
    <aside v-if="sidebarLeftOpen" :class="['sidebar-left-glass flex flex-col fixed left-0 top-28 lg:top-16 bottom-0 z-50 transition-transform duration-300',
      props.collapsed && !isMobile ? 'w-16' : 'w-72 max-w-[85vw]',
      sidebarLeftOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="p-4 flex-1 flex flex-col overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500"
            v-if="!props.collapsed && activeSubmenu === 'home'">
            {{ sidebarTitle }}
          </h3>
          <div v-else-if="!props.collapsed"></div>
          <button @click="$emit('toggle-collapsed')"
            class="p-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors text-gray-600 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <HomeSidebar v-if="activeSubmenu === 'home' && !props.collapsed"
          :current-lang="currentLang"
          :active-section="activeHomeSection"
          @select="goToHomeSection" />

        <DocumentsSidebar v-else-if="isDocumentsRoute && !props.collapsed"
          :current-lang="currentLang"
          :categories="categories"
          root-category-title="អន្តរវិស័យ"
          @select-category="selectCategory" />
      </div>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col gap-1">
          <button @click="goToSettings"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="[
              props.collapsed ? 'justify-center' : 'w-full',
              activeSubmenu === 'settings' ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
            ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span v-if="!props.collapsed">
              {{ currentLang === 'en' ? 'Settings' : 'កំណត់' }}
            </span>
          </button>
          <button @click="goToHelp"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="[
              props.collapsed ? 'justify-center' : 'w-full',
              activeSubmenu === 'help' ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
            ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2.5-3 4" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span v-if="!props.collapsed">
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
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_BASE } from '../config/env.js'
import HomeSidebar from '../components/home/HomeSidebar.vue'
import DocumentsSidebar from '../components/documents/DocumentsSidebar.vue'

const props = defineProps({
  sidebarLeftOpen: Boolean,
  currentLang: String,
  activeSubmenu: String,
  collapsed: Boolean,
  isMobile: Boolean,
})

defineEmits(['toggle', 'close', 'menu-click', 'toggle-collapsed'])

const router = useRouter()
const route = useRoute()

const categories = ref([])
const documents = ref([])
const selectedCategory = ref(null)
const loading = ref(false)

const sidebarTitle = computed(() => {
  const titles = {
    'settings': { en: 'Settings', kh: 'ការកំណត់' },
    'help': { en: 'Help', kh: 'ជំនួយ' },
    'home': { en: 'About SPRITUP', kh: 'អំពី SPRITUP' },
  }
  return props.currentLang === 'en' ? (titles[props.activeSubmenu]?.en || 'Menu') : (titles[props.activeSubmenu]?.kh || 'មីន')
})

const activeHomeSection = computed(() => {
  if (route.name === 'home-about-page') return route.query.section || 'objective'
  return ''
})

const isDocumentsRoute = computed(() => {
  return route.path === '/documents' || route.path.endsWith('-documents')
})

const goToHomeSection = (key) => {
  router.push({ path: '/home', query: { section: key } })
}

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
  router.push(categoryId ? `/documents?category=${categoryId}` : '/documents')
}

const goToSettings = () => {
  router.push('/settings')
}

const goToHelp = () => {
  router.push('/help')
}

const goBack = () => {
  if (selectedCategory.value) {
    selectedCategory.value = null
  }
}

// Fetch whenever the Documents route opens. This makes the All button work
// even if the menu state changes before the sidebar has mounted.
watch([() => props.activeSubmenu, () => isDocumentsRoute.value], ([menu, isDocumentRoute]) => {
  if (menu === 'documents' || isDocumentRoute) {
    fetchDocuments()
  }
}, { immediate: true })
</script>

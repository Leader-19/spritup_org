<template>
  <nav class="navbar-glass fixed top-0 left-0 right-0 z-40">
    <div class="flex items-center justify-between h-full gap-2 px-3 sm:px-4 lg:px-6">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button @click="$emit('toggle-sidebar-left')"
          class="lg:hidden shrink-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300"
          aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex items-center gap-2">
          <div class="flex flex-col">
            <a href="/" class="flex flex-col">
              <span class="font-display font-extrabold text-xl tracking-tight">
                SPRITUP
              </span>
              <span class="hidden sm:block text-sm text-gray-600">
                Center
              </span>
            </a>
          </div>

        </div>

        <div class="hidden lg:flex items-center gap-1 ml-6 overflow-x-auto flex-1 scrollbar-hide" ref="navContainer">
          <button v-for="item in navItems" :key="item.key" @click="handleNavClick(item)"
            :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0',
              activeNavKey === item.key
                ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100']">
            {{ currentLang === 'en' ? item.label : item.labelKh }}
          </button>
        </div>

        <button @click="scrollLeft"
          class="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button @click="scrollRight"
          class="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative hidden sm:flex items-center">

          <input v-model="searchQuery" @keyup.enter="handleSearch" type="text"
            :placeholder="currentLang === 'en' ? 'Search...' : 'ស្វែងរក...'"
            class="w-48 pl-9 pr-12 py-2.5 rounded-xl bg-gray-300 border-collapse dark:bg-gray-800/80 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-brand-400/50 transition" />
          <button @click="handleSearch"
            class="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0a7.5 7.5 0 0115 0z" />
            </svg>
          </button>
        </div>

        <button @click="$emit('toggle-dark')"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300">
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>

        <div class="relative">
          <button @click="langOpen = !langOpen"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300">
            <span>{{ currentLang === 'en' ? '🇺🇸' : '🇰🇭' }}</span>
            <span class="hidden sm:inline">{{ currentLang === 'en' ? 'EN' : 'KH' }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div :class="['lang-dropdown absolute right-0 top-full mt-2 w-36 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50',
            'bg-white dark:bg-gray-900',
            langOpen ? 'lang-visible' : 'lang-hidden']">
            <button v-for="lang in languages" :key="lang.code" @click="selectLang(lang.code)" :class="['w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
              currentLang === lang.code
                ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60']">
              <span>{{ lang.flag }}</span>
              <span>{{ lang.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:hidden h-12 border-t border-gray-200/70 dark:border-gray-800/70">
      <div class="flex h-full items-center gap-1 overflow-x-auto px-3 scrollbar-hide">
        <button v-for="item in navItems" :key="`mobile-${item.key}`" @click="handleNavClick(item)"
          :class="['px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0',
            activeNavKey === item.key
              ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60']">
          {{ currentLang === 'en' ? item.label : item.labelKh }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_BASE } from '../config/env.js'

const props = defineProps({
  isDark: Boolean,
  currentLang: String,
  activeSubmenu: String,
})

const emit = defineEmits(['toggle-sidebar-left', 'toggle-dark', 'menu-click', 'set-lang'])

const router = useRouter()
const route = useRoute()
const langOpen = ref(false)
const searchQuery = ref('')
const navContainer = ref(null)
const categories = ref([])
const catsLoading = ref(false)

const scrollLeft = () => {
  if (navContainer.value) {
    navContainer.value.scrollBy({ left: -200, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (navContainer.value) {
    navContainer.value.scrollBy({ left: 200, behavior: 'smooth' })
  }
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'kh', name: 'ខ្មែរ', flag: '🇰🇭' },
]

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

const fetchCategories = async () => {
  catsLoading.value = true
  try {
    const response = await axios.get(`${API_BASE}/documents`)
    if (response.data.status === 'success') {
      categories.value = response.data.categories || []
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    catsLoading.value = false
  }
}

const navItems = computed(() => {
  const items = [
    { key: 'all', label: 'All', labelKh: 'ទាំងអស់', to: '/documents' },
  ]

  for (const cat of categories.value) {
    items.push({
      key: `cat-${cat.id}`,
      label: getCategoryLabel(cat.title),
      labelKh: cat.title,
      to: `/documents?category=${cat.id}`,
    })
  }

  items.push({ key: 'ai-chat', label: 'AI Chat', labelKh: 'AI Chat' })

  return items
})

const activeNavKey = computed(() => {
  if (route.path === '/documents' && !route.query.category) return 'all'
  if (route.path === '/documents' && route.query.category) return `cat-${route.query.category}`
  return ''
})

const handleNavClick = (item) => {
  if (item.to) {
    // Route changes within /documents keep the same route name, so explicitly
    // activate the Documents sidebar for All and every document category.
    if (item.to.startsWith('/documents')) {
      emit('menu-click', 'documents')
    }
    router.push(item.to)
  } else {
    emit('menu-click', item.key)
  }
}

const selectLang = (code) => {
  langOpen.value = false
  emit('set-lang', code)
}

onMounted(() => {
  fetchCategories()
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'documents-page', query: { search: searchQuery.value } })
  }
}
</script>

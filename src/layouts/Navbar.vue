<template>
  <nav class="navbar-glass fixed top-0 left-0 right-0 z-40">
    <div class="flex items-center justify-between h-14 lg:h-16 gap-1 sm:gap-2 px-2 sm:px-4 lg:px-6">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <NavbarBrand @toggle-sidebar-left="$emit('toggle-sidebar-left')" />

        <NavbarNav :items="navItems" :active-key="activeNavKey" :current-lang="currentLang"
          @navigate="handleNavClick" />
      </div>

      <div class="flex items-center gap-1 sm:gap-2">
        <div class="relative hidden sm:flex items-center">
          <input v-model="searchQuery" @keyup.enter="handleSearch" @input="onSearchInput" type="text"
            :placeholder="currentLang === 'en' ? 'Search...' : 'ស្វែងរក...'"
            class="w-48 pl-9 pr-12 py-2.5 rounded-xl bg-gray-300 border-collapse dark:bg-gray-800/80 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-brand-400/50 transition" />
          <button v-if="searchQuery" @click="clearSearch"
            class="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button @click="handleSearch"
            class="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0a7.5 7.5 0 0115 0z" />
            </svg>
          </button>
        </div>

        <!-- Mobile Plans button (គម្រោង) -->
        <router-link to="/subscription-plans"
          :title="currentLang === 'en' ? 'Plans' : 'គម្រោង'"
          class="sm:hidden p-1.5 rounded-lg transition-colors"
          :class="route.path === '/subscription-plans'
            ? 'bg-amber-500 text-white shadow-sm'
            : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800/60'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </router-link>

        <!-- Mobile Take Quiz button -->
        <router-link v-if="auth.isAuthenticated" to="/quizzes"
          :title="currentLang === 'en' ? 'Take Quiz' : 'ធ្វើតេស្ត'"
          class="sm:hidden p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </router-link>

        <button @click="toggleMobileSearch"
          class="sm:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0a7.5 7.5 0 0115 0z" />
          </svg>
        </button>

        <button @click="$emit('toggle-dark')"
          class="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300">
         <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
         <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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

        <!-- Plans button (គម្រោង) -->
        <router-link to="/subscription-plans"
          class="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all shadow-sm"
          :class="route.path === '/subscription-plans'
            ? 'bg-amber-500 text-white shadow-amber-500/20 shadow-md ring-2 ring-amber-400/40'
            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/40'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{{ currentLang === 'en' ? 'Plans' : 'គម្រោង' }}</span>
        </router-link>

        <!-- Take Quiz button (authenticated users only) -->
        <router-link v-if="auth.isAuthenticated" to="/quizzes"
          class="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
          :class="route.path.startsWith('/quizzes')
            ? 'bg-brand-700 text-white ring-2 ring-brand-400/40'
            : 'bg-brand-600 text-white hover:bg-brand-700'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          {{ currentLang === 'en' ? 'Take Quiz' : 'ធ្វើតេស្ត' }}
        </router-link>

        <LanguageSwitcher :current-lang="currentLang" @set-lang="setLang" />

        <UserMenu v-if="auth.isAuthenticated && auth.user" :current-lang="currentLang" @logout="handleLogout" />
        <ProfileLoginButton v-else :current-lang="currentLang" @open="router.push('/login')" />
      </div>
    </div>

    <div class="lg:hidden border-t border-gray-200/70 dark:border-gray-800/70" v-if="searchOpen">
      <div class="flex items-center gap-2 px-3 py-2">
        <input v-model="searchQuery" @keyup.enter="handleSearch" @input="onSearchInput" type="text"
          :placeholder="currentLang === 'en' ? 'Search...' : 'ស្វែងរក...'"
          class="flex-1 px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-brand-400/50 transition" />
        <button v-if="searchQuery" @click="clearSearch"
          class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button @click="handleSearch"
          class="p-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0a7.5 7.5 0 0115 0z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="lg:hidden h-12 border-t border-gray-200/70 dark:border-gray-800/70" v-else>
      <div class="flex h-full items-center gap-1 overflow-x-auto px-3 scrollbar-hide">
        <button v-for="item in navItems" :key="`mobile-${item.key}`" @click="handleNavClick(item)"
          :class="['px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 inline-flex items-center gap-1.5',
            activeNavKey === item.key
              ? (item.key === 'plans'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400')
              : (item.key === 'plans'
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60')]">
          <svg v-if="item.key === 'plans'" class="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{{ currentLang === 'en' ? item.label : item.labelKh }}</span>
        </button>
      </div>
    </div>

    </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../utils/apiClient.js'
import { normalizeCategories } from '../utils/api.js'
import { useAuth } from '../stores/auth.js'
import { useToast } from '../composables/useToast.js'
import NavbarBrand from '../components/navbar/NavbarBrand.vue'
import NavbarNav from '../components/navbar/NavbarNav.vue'
import LanguageSwitcher from '../components/navbar/LanguageSwitcher.vue'
import UserMenu from '../components/navbar/UserMenu.vue'
import ProfileLoginButton from '../components/navbar/ProfileLoginButton.vue'

const props = defineProps({
  isDark: Boolean,
  currentLang: String,
  activeSubmenu: String,
})

const emit = defineEmits(['toggle-sidebar-left', 'toggle-dark', 'menu-click', 'set-lang'])

const router = useRouter()
const route = useRoute()
const auth = useAuth()
const { success: toastSuccess, error: toastError } = useToast()
const searchQuery = ref('')
const categories = ref([])
const catsLoading = ref(false)
const searchOpen = ref(false)
let searchTimer = null

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
    const response = await apiClient.get('/documents')
    if (response.data.status === 'success') {
      categories.value = normalizeCategories(response.data.categories)
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    catsLoading.value = false
  }
}

const categoryOrder = [
  'ច្បាប់',
  'ព្រះរាជក្រឹត្យ',
  'អនុក្រឹត្យ',
  'ប្រកាស',
  'សេចក្តីសម្រេច',
  'សារាចរ',
  'សេចក្តីណែនាំ',
  'យុទ្ធសាស្ត្រ',
  'គោលនយោបាយ',
]

const categoryOrderMap = {}
categoryOrder.forEach((title, index) => { categoryOrderMap[title] = index })

const navItems = computed(() => {
  const items = [
    { key: 'all', label: 'All', labelKh: 'ទាំងអស់', to: '/documents' },
  ]

  const sortedCats = [...categories.value].sort((a, b) => {
    const aIdx = categoryOrderMap[a.title] ?? Infinity
    const bIdx = categoryOrderMap[b.title] ?? Infinity
    return aIdx - bIdx
  })

  for (const cat of sortedCats) {
    items.push({
      key: `cat-${cat.id}`,
      label: getCategoryLabel(cat.title),
      labelKh: cat.title,
      to: `/documents?category=${cat.id}`,
    })
  }

  items.push({ key: 'plans', label: 'Plans', labelKh: 'គម្រោង', to: '/subscription-plans' })
  items.push({ key: 'quizzes', label: 'Take Quiz', labelKh: 'ធ្វើតេស្ត', to: '/quizzes' })
  items.push({ key: 'ai-chat', label: 'AI Chat', labelKh: 'AI Chat' })

  return items
})

const activeNavKey = computed(() => {
  if (route.path === '/documents' && !route.query.category) return 'all'
  if (route.path === '/documents' && route.query.category) return `cat-${route.query.category}`
  if (route.path === '/subscription-plans') return 'plans'
  if (route.path.startsWith('/quizzes')) return 'quizzes'
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

const setLang = (code) => {
  emit('set-lang', code)
}

const handleLogout = async () => {
  try {
    await apiClient.post('/logout')
  } catch {
    // ignore logout errors (e.g. token already invalid)
  }
  auth.clearAuth()
  router.push('/')
}

const logoutHandler = () => {
  auth.clearAuth()
  router.push('/login')
}

onMounted(() => {
  fetchCategories()
  window.addEventListener('auth:logout', logoutHandler)
})

onUnmounted(() => {
  window.removeEventListener('auth:logout', logoutHandler)
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'documents-page', query: { search: searchQuery.value.trim() } })
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  router.push({ name: 'documents-page', query: {} })
}

const toggleMobileSearch = () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    nextTick(() => {
      const input = document.querySelector('.lg\\:hidden input[type="text"]')
      if (input) input.focus()
    })
  }
}

const onSearchInput = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    const q = searchQuery.value.trim()
    router.push({ name: 'documents-page', query: q ? { search: q } : {} })
  }, 400)
}

watch(() => route.query.search, (newVal) => {
  searchQuery.value = newVal || ''
}, { immediate: true })
</script>

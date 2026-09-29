<template>
  <nav class="navbar-glass fixed top-0 left-0 right-0 z-[70]">
    <div class="mx-auto flex max-w-7xl items-center justify-between h-14 lg:h-16 gap-4 px-4 sm:px-6 lg:px-8">
      <div class="flex min-w-0 flex-1 items-center gap-8 lg:gap-10">
        <button @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden shrink-0 p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300"
          aria-label="Toggle navigation">
          <Menu v-if="!mobileMenuOpen" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </button>

        <NavbarBrand />

        <div class="hidden lg:flex items-center gap-8">
          <router-link to="/home"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white">
            {{ currentLang === 'en' ? 'About us' : 'អំពីយើង' }}
          </router-link>

          <FeatureMenu :current-lang="currentLang" @action="handleFeatureAction" />

          <router-link to="/quizzes"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white">
            {{ currentLang === 'en' ? 'Take a Quiz' : 'ធ្វើតេស្ត' }}
          </router-link>

          <router-link to="/documents"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white">
            {{ currentLang === 'en' ? 'Documents' : 'ឯកសារ' }}
          </router-link>

          <router-link to="/library"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white">
            {{ currentLang === 'en' ? 'Library' : 'បណ្ណាល័យ' }}
          </router-link>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="relative hidden sm:flex items-center">
          <Search class="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input v-model="searchQuery" @keyup.enter="handleSearch" @input="onSearchInput" type="search"
            :placeholder="currentLang === 'en' ? 'Search' : 'ស្វែងរក...'"
            class="w-48 appearance-none rounded-[5px] bg-gray-100 dark:bg-gray-800/80 py-1.5 pl-8 pr-3 text-sm text-gray-900 dark:text-gray-200 outline-none transition-colors placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600" />
        </div>

        <LanguageSwitcher :current-lang="currentLang" @set-lang="setLang" />

        <UserMenu v-if="auth.isAuthenticated && auth.user" :current-lang="currentLang" @logout="handleLogout" />
        <ProfileLoginButton v-else :current-lang="currentLang" @open="router.push('/login')" />
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 max-h-[calc(100vh-56px)] overflow-y-auto">
      <div class="flex flex-col px-4 py-3 gap-1">
        <div class="relative flex items-center sm:hidden mb-2">
          <Search class="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input v-model="searchQuery" @keyup.enter="handleSearch" @input="onSearchInput" type="search"
            :placeholder="currentLang === 'en' ? 'Search' : 'ស្វែងរក...'"
            class="w-full appearance-none rounded-[5px] bg-gray-100 dark:bg-gray-800/80 py-1.5 pl-8 pr-3 text-sm text-gray-900 dark:text-gray-200 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600" />
        </div>

        <router-link to="/home" @click="mobileMenuOpen = false" class="mobile-link">
          {{ currentLang === 'en' ? 'About us' : 'អំពីយើង' }}
        </router-link>
        <router-link to="/quizzes" @click="mobileMenuOpen = false" class="mobile-link">
          {{ currentLang === 'en' ? 'Take a Quiz' : 'ធ្វើតេស្ត' }}
        </router-link>
        <router-link to="/documents" @click="mobileMenuOpen = false" class="mobile-link">
          {{ currentLang === 'en' ? 'Documents' : 'ឯកសារ' }}
        </router-link>
        <router-link to="/library" @click="mobileMenuOpen = false" class="mobile-link">
          {{ currentLang === 'en' ? 'Library' : 'បណ្ណាល័យ' }}
        </router-link>

        <div class="h-px bg-gray-100 dark:bg-gray-800 my-2" />

        <p class="px-3 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {{ currentLang === 'en' ? 'Feature' : 'មុខងារ' }}
        </p>
        <template v-for="column in featureColumns" :key="column.title">
          <template v-for="link in column.links" :key="link.label">
            <router-link v-if="link.to" :to="link.to" @click="mobileMenuOpen = false" class="mobile-link">
              {{ currentLang === 'en' ? link.label : link.labelKh }}
            </router-link>
            <button v-else @click="handleFeatureAction(link.key); mobileMenuOpen = false" class="mobile-link text-left">
              {{ currentLang === 'en' ? link.label : link.labelKh }}
            </button>
          </template>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, X, Search } from 'lucide-vue-next'
import { useAuth } from '../stores/auth.js'
import apiClient from '../utils/apiClient.js'
import NavbarBrand from '../components/navbar/NavbarBrand.vue'
import FeatureMenu from '../components/navbar/FeatureMenu.vue'
import LanguageSwitcher from '../components/navbar/LanguageSwitcher.vue'
import UserMenu from '../components/navbar/UserMenu.vue'
import ProfileLoginButton from '../components/navbar/ProfileLoginButton.vue'
import { featureColumns } from '../components/navbar/featureLinks.js'

defineProps({
  isDark: Boolean,
  currentLang: String,
})

const emit = defineEmits(['toggle-dark', 'menu-click', 'set-lang'])

const router = useRouter()
const auth = useAuth()
const searchQuery = ref('')
const mobileMenuOpen = ref(false)
let searchTimer = null

const handleFeatureAction = (key) => {
  emit('menu-click', key)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    mobileMenuOpen.value = false
    router.push({ name: 'documents-page', query: { search: searchQuery.value.trim() } })
  }
}

const onSearchInput = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    const q = searchQuery.value.trim()
    router.push({ name: 'documents-page', query: q ? { search: q } : {} })
  }, 400)
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
  window.addEventListener('auth:logout', logoutHandler)
})

onUnmounted(() => {
  window.removeEventListener('auth:logout', logoutHandler)
})
</script>

<style scoped>
.mobile-link {
  @apply px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white;
}
</style>

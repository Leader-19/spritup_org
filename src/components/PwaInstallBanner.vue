<template>
  <Transition name="pwa-banner">
    <div
      v-if="visible"
      class="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Banner Content -->
        <div class="p-4 sm:p-5">
          <div class="flex items-start gap-3">
            <!-- App Icon -->
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>

            <!-- Text -->
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                {{ t('title') }}
              </h3>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {{ t('description') }}
              </p>
            </div>

            <!-- Close Button -->
            <button
              @click="dismiss"
              class="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :aria-label="t('dismiss')"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Buttons -->
          <div class="flex gap-2 mt-4">
            <button
              @click="install"
              :disabled="installing"
              class="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg v-if="installing" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {{ installing ? t('installing') : t('install') }}
            </button>
            <button
              @click="dismiss"
              class="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
            >
              {{ t('later') }}
            </button>
          </div>
        </div>

        <!-- Progress Bar (when installing) -->
        <div v-if="installing" class="h-1 bg-gray-200 dark:bg-gray-700">
          <div class="h-full bg-blue-500 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const visible = ref(false)
const installing = ref(false)
const deferredPrompt = ref(null)
const dismissed = ref(false)

const currentLang = computed(() => {
  return document.documentElement.lang || 'en'
})

const t = (key) => {
  const translations = {
    en: {
      title: 'Install SPRITUP Center',
      description: 'Add to your home screen for quick access and offline support.',
      install: 'Install Now',
      installing: 'Installing...',
      later: 'Later',
      dismiss: 'Dismiss',
    },
    km: {
      title: 'ដំឡើង SPRITUP Center',
      description: 'បន្ថែមទៅអេក្រង់ដើមសម្រាប់ការចូលដោយរហ័ស និងការគាំទ្រក្រៅបណ្តាញ។',
      install: 'ដំឡើងឥឡូវនេះ',
      installing: 'កំពុងដំឡើង...',
      later: 'ពេលក្រោយ',
      dismiss: 'បិទ',
    }
  }
  return translations[currentLang.value]?.[key] || translations.en[key]
}

let beforeInstallPromptHandler = null
let appInstalledHandler = null

onMounted(() => {
  // Listen for the browser's beforeinstallprompt event
  beforeInstallPromptHandler = (e) => {
    e.preventDefault()
    deferredPrompt.value = e

    // Check if user has dismissed before
    const dismissedAt = localStorage.getItem('pwa-install-dismissed')
    if (dismissedAt) {
      const daysSinceDismiss = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24)
      // Show again after 7 days
      if (daysSinceDismiss < 7) {
        return
      }
    }

    // Show banner after a short delay
    setTimeout(() => {
      if (!dismissed.value) {
        visible.value = true
      }
    }, 3000)
  }

  // Listen for successful app installation
  appInstalledHandler = () => {
    visible.value = false
    deferredPrompt.value = null
  }

  window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)
  window.addEventListener('appinstalled', appInstalledHandler)
})

onUnmounted(() => {
  if (beforeInstallPromptHandler) {
    window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler)
  }
  if (appInstalledHandler) {
    window.removeEventListener('appinstalled', appInstalledHandler)
  }
})

const install = async () => {
  if (!deferredPrompt.value) return

  installing.value = true

  try {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice

    if (outcome === 'accepted') {
      visible.value = false
    }
  } catch (err) {
    console.error('PWA install error:', err)
  } finally {
    installing.value = false
    deferredPrompt.value = null
  }
}

const dismiss = () => {
  visible.value = false
  dismissed.value = true
  localStorage.setItem('pwa-install-dismissed', Date.now().toString())
}
</script>

<style scoped>
.pwa-banner-enter-active,
.pwa-banner-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.pwa-banner-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.pwa-banner-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
    <div class="w-full max-w-sm rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-2xl text-center space-y-6">
      <!-- Loading State -->
      <div v-if="!errorMessage" class="space-y-5">
        <div class="relative mx-auto size-20 flex items-center justify-center">
          <div class="absolute inset-0 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 animate-ping"></div>
          <img
            src="/logo.jpg"
            alt="SPRITUP"
            class="relative size-16 rounded-2xl object-contain bg-white p-1 shadow-md border border-slate-100 dark:border-slate-700"
          />
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">
            {{ currentLang === 'en' ? 'Completing Google Sign-in…' : 'កំពុងផ្ទៀងផ្ទាត់គណនី Google…' }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ currentLang === 'en' ? 'Setting up your secure session, please wait…' : 'សូមរង់ចាំបន្តិច ប្រព័ន្ធកំពុងរៀបចំគណនីរបស់អ្នក…' }}
          </p>
        </div>

        <!-- Spinner -->
        <div class="flex items-center justify-center pt-2">
          <svg class="animate-spin size-6 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="space-y-5">
        <div class="mx-auto size-14 rounded-2xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400">
          <svg class="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div class="space-y-1.5">
          <h3 class="text-base font-bold text-slate-900 dark:text-white">
            {{ currentLang === 'en' ? 'Sign-in Failed' : 'ការចូលគណនីមិនជោគជ័យ' }}
          </h3>
          <p class="text-xs text-red-600 dark:text-red-400">
            {{ errorMessage }}
          </p>
        </div>

        <button
          type="button"
          @click="router.replace('/login')"
          class="w-full h-11 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          {{ currentLang === 'en' ? 'Return to Sign in' : 'ត្រឡប់ទៅការចូលគណនី' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../stores/auth.js'
import { useToast } from '../../composables/useToast.js'

const route = useRoute()
const router = useRouter()
const currentLang = inject('currentLang', ref('en'))
const { success: toastSuccess } = useToast()

const errorMessage = ref('')

onMounted(async () => {
  const token = typeof route.query.token === 'string' ? route.query.token : ''
  if (!token) {
    errorMessage.value = currentLang.value === 'en'
      ? 'No authentication token was returned from Google sign-in.'
      : 'មិនមាន token ផ្ទៀងផ្ទាត់ត្រឡប់មកពី Google ទេ។'
    return
  }

  try {
    const auth = useAuth()
    auth.setAuth({ token, user: null })
    await auth.fetchUser()
    await auth.fetchUserCategories()
    toastSuccess(currentLang.value === 'en' ? 'Signed in with Google successfully!' : 'ចូលតាម Google បានជោគជ័យ!')
    router.replace('/')
  } catch (err) {
    console.error('Google callback profile fetch error:', err)
    errorMessage.value = currentLang.value === 'en'
      ? 'Failed to retrieve your account profile. Please try again.'
      : 'មិនអាចទាញយកព័ត៌មានគណនីរបស់អ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។'
  }
})
</script>

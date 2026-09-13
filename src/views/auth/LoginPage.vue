<template>
  <div :class="['flex items-center justify-center', modal ? 'w-full' : 'min-h-screen bg-slate-50 dark:bg-slate-950 lg:grid lg:grid-cols-2']">
    <!-- Left Hero Banner (hidden in modal) -->
    <aside v-if="!modal" class="relative hidden h-full min-h-screen overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-900 p-12 text-white lg:flex lg:flex-col justify-between">
      <div class="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_25%),radial-gradient(circle_at_80%_75%,white_0,transparent_30%)]"></div>
      <div class="absolute -bottom-24 -left-24 size-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
      <div class="absolute -top-24 -right-24 size-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>

      <router-link to="/" class="relative z-10 flex items-center gap-3 text-xl font-bold tracking-tight">
        <img src="/logo.jpg" alt="SPRITUP" class="size-11 rounded-xl object-contain bg-white p-1 shadow-lg shadow-indigo-950/30" />
        <span>SPRITUP</span>
      </router-link>

      <div class="relative z-10 my-auto max-w-lg space-y-6">
        <div class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          <svg class="size-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
          <span>{{ currentLang === 'en' ? 'Welcome Back' : 'សូមស្វាគមន៍មកវិញ' }}</span>
        </div>
        <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-white">
          {{ currentLang === 'en' ? 'Learn, explore, and grow with confidence.' : 'រៀនសូត្រ ស្វែងយល់ និងរីកចម្រើនប្រកបដោយទំនុកចិត្ត។' }}
        </h2>
        <p class="text-base leading-relaxed text-blue-100/90">
          {{ currentLang === 'en' ? 'Access your legal library, continue your courses, and take quizzes to test your knowledge.' : 'ចូលប្រើប្រាស់បណ្ណាល័យច្បាប់ ធ្វើតេស្តសាកល្បង និងតាមដានការរីកចម្រើនរបស់អ្នក។' }}
        </p>

        <div class="space-y-3 pt-2">
          <div class="flex items-center gap-3 text-sm text-blue-100">
            <div class="flex size-7 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <svg class="size-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <span>{{ currentLang === 'en' ? 'Comprehensive legal documents & laws' : 'បណ្ណាល័យឯកសារ និងច្បាប់សម្បូរបែប' }}</span>
          </div>
          <div class="flex items-center gap-3 text-sm text-blue-100">
            <div class="flex size-7 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <svg class="size-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span>{{ currentLang === 'en' ? 'Interactive quizzes & instant feedback' : 'ការធ្វើតេស្តសាកល្បង និងលទ្ធផលភ្លាមៗ' }}</span>
          </div>
        </div>
      </div>

      <p class="relative z-10 text-xs text-blue-200/80">
        © {{ new Date().getFullYear() }} SPRITUP. All rights reserved.
      </p>
    </aside>

    <!-- Right Form Section -->
    <div :class="['flex w-full items-center justify-center', modal ? 'p-0' : 'p-6 sm:p-10']">
      <div :class="['w-full', modal ? 'max-w-none' : 'max-w-md']">
        <div :class="['rounded-2xl border border-slate-100 bg-white p-7 sm:p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none', modal ? 'border-none shadow-none p-0 sm:p-0' : '']">
          <div class="text-center mb-6" v-if="!modal">
            <img src="/logo.jpg" alt="SPRITUP Center" @error="handleImageError" class="size-14 rounded-2xl object-contain mx-auto mb-3 shadow-md border border-slate-100 dark:border-slate-700" />
            <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {{ currentLang === 'en' ? 'Sign in to SPRITUP' : 'ចូលគណនី SPRITUP' }}
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {{ currentLang === 'en' ? 'Enter your credentials or continue with Google' : 'បញ្ចូលព័ត៌មានរបស់អ្នក ឬបន្តជាមួយ Google' }}
            </p>
          </div>

          <!-- Google OAuth Error Notice -->
          <div v-if="googleErrorNotice" class="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-300">
            <svg class="size-4 shrink-0 mt-0.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div class="flex-1">
              <span class="font-semibold">{{ currentLang === 'en' ? 'Google Sign-in notice:' : 'ដំណឹងការចូល Google:' }}</span>
              <p class="mt-0.5">{{ googleErrorNotice }}</p>
            </div>
          </div>

          <!-- Google Sign-In Button -->
          <a
            :href="googleLoginUrl"
            class="inline-flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 hover:shadow active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 dark:hover:text-white"
          >
            <svg class="size-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.87h5.24a4.48 4.48 0 0 1-1.94 2.94v2.51h3.14c1.84-1.7 2.91-4.2 2.91-7.27Z"/>
              <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.51c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.59A9.75 9.75 0 0 0 12 21.75Z"/>
              <path fill="#FBBC05" d="M6.53 13.77A5.84 5.84 0 0 1 6.22 12c0-.61.11-1.2.31-1.77V7.64H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.59Z"/>
              <path fill="#EA4335" d="M12 6.2c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.29 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.24 2.59C7.3 7.92 9.46 6.2 12 6.2Z"/>
            </svg>
            <span>{{ currentLang === 'en' ? 'Continue with Google' : 'បន្តជាមួយ Google' }}</span>
          </a>

          <!-- Divider -->
          <div class="relative flex items-center justify-center my-5">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div class="relative bg-white px-3 text-xs uppercase font-medium tracking-wider text-slate-400 dark:bg-slate-900 dark:text-slate-500">
              {{ currentLang === 'en' ? 'or sign in with email' : 'ឬចូលតាមរយៈអ៊ីមែល' }}
            </div>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {{ currentLang === 'en' ? 'Email address' : 'អាសយដ្ឋានអ៊ីមែល' }}
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                </span>
                <input
                  v-model="email"
                  type="email"
                  required
                  autocomplete="email"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {{ currentLang === 'en' ? 'Password' : 'ពាក្យសម្ងាត់' }}
                </label>
                <router-link to="/forgot-password" class="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  {{ currentLang === 'en' ? 'Forgot password?' : 'ភ្លេចពាក្យសម្ងាត់?' }}
                </router-link>
              </div>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </span>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  class="w-full h-11 pl-10 pr-14 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 p-1"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? (currentLang === 'en' ? 'Hide' : 'លាក់') : (currentLang === 'en' ? 'Show' : 'បង្ហាញ') }}
                </button>
              </div>
            </div>

            <div v-if="error" class="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
              <svg class="size-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>{{ error }}</span>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <svg v-if="loading" class="animate-spin size-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ loading ? (currentLang === 'en' ? 'Signing in...' : 'កំពុងចូល...') : (currentLang === 'en' ? 'Sign in' : 'ចូលគណនី') }}</span>
            </button>
          </form>

          <!-- Footer toggle / link -->
          <div class="text-center text-sm text-slate-500 dark:text-slate-400 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            {{ currentLang === 'en' ? "Don't have an account?" : 'មិនទាន់មានគណនី?' }}
            <button
              v-if="modal"
              type="button"
              @click="$emit('switch-to-register')"
              class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold ml-1 inline"
            >
              {{ currentLang === 'en' ? 'Create an account' : 'បង្កើតគណនីថ្មី' }}
            </button>
            <router-link
              v-else
              to="/register"
              class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold ml-1 inline"
            >
              {{ currentLang === 'en' ? 'Sign up' : 'ចុះឈ្មោះឥឡូវនេះ' }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onErrorCaptured, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'
import { useAuth } from '../../stores/auth.js'
import { useToast } from '../../composables/useToast.js'
import { API_URL } from '../../config/env.js'

defineOptions({
  inheritAttrs: false,
})

const router = useRouter()
const route = useRoute()
const { setAuth } = useAuth()
const { success: toastSuccess } = useToast()
const currentLang = inject('currentLang', ref('en'))

const props = defineProps({
  modal: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['success', 'switch-to-register'])

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const googleErrorNotice = ref('')
const googleLoginUrl = `${API_URL}/auth/google/redirect?source=frontend`

onMounted(() => {
  if (route.query.google_error) {
    googleErrorNotice.value = currentLang.value === 'en'
      ? 'Google sign-in was cancelled or could not be completed. Please try again or use your password.'
      : 'ការចូលតាម Google ត្រូវបានបោះបង់ ឬមិនអាចបញ្ចប់បានទេ។ សូមព្យាយាមម្តងទៀត ឬប្រើពាក្យសម្ងាត់។'
  }
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await apiClient.post('/login', {
      email: email.value,
      password: password.value,
    })
    const data = response.data
    if (!data?.token || !data?.user) {
      throw new Error('The server returned an invalid login response.')
    }
    setAuth({
      token: data.token,
      user: data.user,
    })
    const auth = useAuth()
    await auth.fetchUserCategories()
    toastSuccess(currentLang.value === 'en' ? 'Login successful!' : 'ការចូលជោគជ័យ!')
    emit('success')
    if (!props.modal) {
      router.push(route.query.redirect || '/')
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.response?.data?.message || (currentLang.value === 'en' ? 'Login failed. Please verify your credentials.' : 'ការចូលបរាជ័យ។ សូមពិនិត្យមើលព័ត៌មានរបស់អ្នកឡើងវិញ។')
  } finally {
    loading.value = false
  }
}

const handleImageError = (e) => {
  if (e.target) {
    e.target.style.display = 'none'
  }
}

onErrorCaptured((err) => {
  console.error('LoginPage error:', err)
  return false
})
</script>

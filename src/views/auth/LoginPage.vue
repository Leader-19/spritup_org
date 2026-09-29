<template>
  <div :class="['auth-page flex items-center justify-center', modal ? 'w-full' : 'h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 lg:grid lg:grid-cols-2']">
    <!-- Left Panel (hidden in modal) -->
    <aside v-if="!modal" class="relative hidden h-full min-h-screen flex-col justify-between overflow-hidden p-10 lg:flex">
      <img
        src="/images/book-removebg-preview.png"
        alt=""
        class="pointer-events-none absolute -left-8 -top-8 w-64 max-w-none select-none"
      />

      <router-link
        to="/"
        class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        <ArrowLeft :size="18" />
      </router-link>

      <div class="relative z-10">
        <div class="flex items-center gap-3">
          <BrandLogo />
          <span class="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            {{ currentLang === 'en' ? 'Welcome back' : 'សូមស្វាគមន៍មកវិញ' }}
          </span>
        </div>
        <p class="mt-4 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          {{ currentLang === 'en' ? 'Access your legal library, continue your courses, and take quizzes to test your knowledge.' : 'ចូលប្រើប្រាស់បណ្ណាល័យច្បាប់ ធ្វើតេស្តសាកល្បង និងតាមដានការរីកចម្រើនរបស់អ្នក។' }}
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-400 dark:text-zinc-500">
          <span>© {{ new Date().getFullYear() }} SPRITUP. All rights reserved.</span>
          <router-link to="/help" class="hover:text-zinc-700 dark:hover:text-zinc-300">
            {{ currentLang === 'en' ? 'Help' : 'ជំនួយ' }}
          </router-link>
          <router-link to="/contact" class="hover:text-zinc-700 dark:hover:text-zinc-300">
            {{ currentLang === 'en' ? 'Contact' : 'ទំនាក់ទំនង' }}
          </router-link>
        </div>
      </div>
    </aside>

    <!-- Right Form Section -->
    <div :class="['flex w-full items-center justify-center', modal ? 'p-0' : 'h-full overflow-y-auto p-6 sm:p-10']">
      <div :class="['w-full', modal ? 'max-w-none' : 'max-w-sm']">
        <div>
          <router-link
            v-if="!modal"
            to="/"
            class="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 lg:hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
          >
            <ArrowLeft :size="18" />
          </router-link>

          <div class="mb-6" v-if="!modal">
            <h1 class="font-display text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {{ currentLang === 'en' ? 'Sign in to SPRITUP' : 'ចូលគណនី SPRITUP' }}
            </h1>
            <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {{ currentLang === 'en' ? 'Enter your credentials or continue with Google' : 'បញ្ចូលព័ត៌មានរបស់អ្នក ឬបន្តជាមួយ Google' }}
            </p>
          </div>

          <!-- Google OAuth Error Notice -->
          <div v-if="googleErrorNotice" class="mb-5 flex items-start gap-2.5 rounded-[5px] border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-300">
            <svg class="size-4 shrink-0 mt-0.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div class="flex-1">
              <span class="font-semibold">{{ currentLang === 'en' ? 'Google Sign-in notice:' : 'ដំណឹងការចូល Google:' }}</span>
              <p class="mt-0.5">{{ googleErrorNotice }}</p>
            </div>
          </div>

          <!-- Google Sign-In Button -->
          <a
            :href="googleLoginUrl"
            class="flex w-full items-center justify-center gap-3 rounded-[5px] border border-zinc-300 bg-white py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500"
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
          <div class="my-6 flex items-center gap-3 text-xs text-zinc-400">
            <div class="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            {{ currentLang === 'en' ? 'or sign in with email' : 'ឬចូលតាមរយៈអ៊ីមែល' }}
            <div class="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {{ currentLang === 'en' ? 'Email address' : 'អាសយដ្ឋានអ៊ីមែល' }}
              </label>
              <input
                v-model="email"
                type="email"
                required
                autocomplete="email"
                class="mt-1 w-full rounded-[5px] border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-400"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label class="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {{ currentLang === 'en' ? 'Password' : 'ពាក្យសម្ងាត់' }}
                </label>
                <router-link to="/forgot-password" class="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  {{ currentLang === 'en' ? 'Forgot password?' : 'ភ្លេចពាក្យសម្ងាត់?' }}
                </router-link>
              </div>
              <div class="relative mt-1">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  class="w-full rounded-[5px] border border-zinc-300 bg-white px-3 py-2.5 pr-14 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? (currentLang === 'en' ? 'Hide' : 'លាក់') : (currentLang === 'en' ? 'Show' : 'បង្ហាញ') }}
                </button>
              </div>
            </div>

            <div v-if="error" class="p-3.5 rounded-[5px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
              <svg class="size-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>{{ error }}</span>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="flex w-full items-center justify-center gap-2 rounded-[5px] bg-zinc-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <svg v-if="loading" class="animate-spin size-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ loading ? (currentLang === 'en' ? 'Signing in...' : 'កំពុងចូល...') : (currentLang === 'en' ? 'Sign in' : 'ចូលគណនី') }}</span>
            </button>
          </form>

          <!-- Footer toggle / link -->
          <p class="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {{ currentLang === 'en' ? "Don't have an account?" : 'មិនទាន់មានគណនី?' }}
            <button
              v-if="modal"
              type="button"
              @click="$emit('switch-to-register')"
              class="ml-1 inline font-semibold text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            >
              {{ currentLang === 'en' ? 'Create an account' : 'បង្កើតគណនីថ្មី' }}
            </button>
            <router-link
              v-else
              to="/register"
              class="ml-1 inline font-semibold text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            >
              {{ currentLang === 'en' ? 'Sign up' : 'ចុះឈ្មោះឥឡូវនេះ' }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onErrorCaptured, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import apiClient from '../../utils/apiClient.js'
import { useAuth } from '../../stores/auth.js'
import { useToast } from '../../composables/useToast.js'
import { API_URL } from '../../config/env.js'
import BrandLogo from '../../components/navbar/BrandLogo.vue'

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

onErrorCaptured((err) => {
  console.error('LoginPage error:', err)
  return false
})
</script>

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
          <svg class="size-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          <span>{{ currentLang === 'en' ? 'Join SPRITUP' : 'ចូលរួមជាមួយ SPRITUP' }}</span>
        </div>
        <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-white">
          {{ currentLang === 'en' ? 'Start your learning journey today.' : 'ចាប់ផ្តើមដំណើរការសិក្សារបស់អ្នកថ្ងៃនេះ។' }}
        </h2>
        <p class="text-base leading-relaxed text-blue-100/90">
          {{ currentLang === 'en' ? 'Create a free account to read legal summaries, test yourself with law quizzes, and save your progress.' : 'បង្កើតគណនីឥតគិតថ្លៃដើម្បីអានសង្ខេបច្បាប់ ធ្វើតេស្តសាកល្បង និងរក្សាទុកវឌ្ឍនភាពរបស់អ្នក។' }}
        </p>

        <div class="space-y-3 pt-2">
          <div class="flex items-center gap-3 text-sm text-blue-100">
            <div class="flex size-7 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <svg class="size-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <span>{{ currentLang === 'en' ? 'Instant access to legal documents' : 'ចូលមើលឯកសារច្បាប់បានភ្លាមៗ' }}</span>
          </div>
          <div class="flex items-center gap-3 text-sm text-blue-100">
            <div class="flex size-7 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <svg class="size-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <span>{{ currentLang === 'en' ? 'Interactive knowledge quizzes & scores' : 'លំហាត់តេស្តចំណេះដឹង និងការវាយតម្លៃពិន្ទុ' }}</span>
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
            <img src="/logo.jpg" alt="SPRITUP Center" class="size-14 rounded-2xl object-contain mx-auto mb-3 shadow-md border border-slate-100 dark:border-slate-700" />
            <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {{ currentLang === 'en' ? 'Create your account' : 'បង្កើតគណនីថ្មី' }}
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {{ currentLang === 'en' ? 'Join the SPRITUP learning community' : 'ចូលរួមជាមួយសហគមន៍សិក្សា SPRITUP' }}
            </p>
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
            <span>{{ currentLang === 'en' ? 'Sign up with Google' : 'ចុះឈ្មោះជាមួយ Google' }}</span>
          </a>

          <!-- Divider -->
          <div class="relative flex items-center justify-center my-5">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div class="relative bg-white px-3 text-xs uppercase font-medium tracking-wider text-slate-400 dark:bg-slate-900 dark:text-slate-500">
              {{ currentLang === 'en' ? 'or register with email' : 'ឬចុះឈ្មោះតាមអ៊ីមែល' }}
            </div>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {{ currentLang === 'en' ? 'Full name' : 'ឈ្មោះពេញ' }}
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </span>
                <input
                  v-model="name"
                  type="text"
                  required
                  autocomplete="name"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                <span v-if="password && password.length < 8" class="text-xs text-amber-600 font-medium">
                  {{ currentLang === 'en' ? 'Min. 8 characters' : 'យ៉ាងតិច ៨ តួអក្សរ' }}
                </span>
              </div>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </span>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  minlength="8"
                  autocomplete="new-password"
                  class="w-full h-11 pl-10 pr-14 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  :placeholder="currentLang === 'en' ? 'Min. 8 characters' : 'យ៉ាងតិច ៨ តួអក្សរ'"
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

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {{ currentLang === 'en' ? 'Confirm password' : 'បញ្ជាក់ពាក្យសម្ងាត់' }}
                </label>
                <div v-if="password_confirmation" class="text-xs font-medium">
                  <span v-if="passwordsMatch" class="text-emerald-600 flex items-center gap-1">
                    <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    {{ currentLang === 'en' ? 'Matches' : 'ត្រូវគ្នា' }}
                  </span>
                  <span v-else class="text-amber-600">
                    {{ currentLang === 'en' ? 'Does not match' : 'មិនទាន់ត្រូវគ្នា' }}
                  </span>
                </div>
              </div>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </span>
                <input
                  v-model="password_confirmation"
                  :type="showPasswordConfirmation ? 'text' : 'password'"
                  required
                  autocomplete="new-password"
                  class="w-full h-11 pl-10 pr-14 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  :placeholder="currentLang === 'en' ? 'Repeat password' : 'បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត'"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 p-1"
                  :aria-label="showPasswordConfirmation ? 'Hide password confirmation' : 'Show password confirmation'"
                  @click="showPasswordConfirmation = !showPasswordConfirmation"
                >
                  {{ showPasswordConfirmation ? (currentLang === 'en' ? 'Hide' : 'លាក់') : (currentLang === 'en' ? 'Show' : 'បង្ហាញ') }}
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
              <span>{{ loading ? (currentLang === 'en' ? 'Creating account...' : 'កំពុងបង្កើតគណនី...') : (currentLang === 'en' ? 'Create Account' : 'បង្កើតគណនីថ្មី') }}</span>
            </button>
          </form>

          <!-- Footer toggle / link -->
          <div class="text-center text-sm text-slate-500 dark:text-slate-400 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            {{ currentLang === 'en' ? 'Already have an account?' : 'មានគណនីរួចហើយ?' }}
            <button
              v-if="modal"
              type="button"
              @click="$emit('switch-to-login')"
              class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold ml-1 inline"
            >
              {{ currentLang === 'en' ? 'Sign in' : 'ចូលគណនី' }}
            </button>
            <router-link
              v-else
              to="/login"
              class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold ml-1 inline"
            >
              {{ currentLang === 'en' ? 'Sign in' : 'ចូលគណនី' }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'
import { useAuth } from '../../stores/auth.js'
import { useToast } from '../../composables/useToast.js'
import { API_URL } from '../../config/env.js'

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

const emit = defineEmits(['success', 'switch-to-login'])

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
const loading = ref(false)
const error = ref('')
const googleLoginUrl = `${API_URL}/auth/google/redirect?source=frontend`

const passwordsMatch = computed(() => {
  if (!password.value || !password_confirmation.value) return false
  return password.value === password_confirmation.value
})

const handleRegister = async () => {
  if (password.value !== password_confirmation.value) {
    error.value = currentLang.value === 'en' ? 'Passwords do not match.' : 'ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។'
    return
  }

  loading.value = true
  error.value = ''
  try {
    const response = await apiClient.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })
    const data = response.data
    
    // Now with our backend fix, response returns token and user
    if (data?.token && data?.user) {
      setAuth({
        token: data.token,
        user: data.user,
      })
      const auth = useAuth()
      await auth.fetchUserCategories()
      toastSuccess(currentLang.value === 'en' ? 'Account created successfully!' : 'បង្កើតគណនីបានជោគជ័យ!')
      emit('success')
      if (!props.modal) {
        router.push(route.query.redirect || '/')
      }
    } else {
      // Fallback: registered successfully, redirect to login
      toastSuccess(currentLang.value === 'en' ? 'Registration successful! Please sign in.' : 'ការចុះឈ្មោះជោគជ័យ! សូមចូលគណនី។')
      if (props.modal) {
        emit('switch-to-login')
      } else {
        router.push('/login')
      }
    }
  } catch (err) {
    console.error('Registration error:', err)
    error.value = err.response?.data?.message || (currentLang.value === 'en' ? 'Registration failed. Please try again.' : 'ការចុះឈ្មោះបរាជ័យ។ សូមព្យាយាមម្តងទៀត។')
    if (err.response?.data?.errors) {
      const firstError = Object.values(err.response.data.errors)[0]
      error.value = Array.isArray(firstError) ? firstError[0] : firstError
    }
  } finally {
    loading.value = false
  }
}
</script>

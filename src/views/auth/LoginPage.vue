<template>
  <div :class="['flex items-center justify-center', modal ? '' : 'min-h-screen bg-gray-50 dark:bg-gray-900 px-4']">
    <div :class="['w-full max-w-8xl mx-auto', modal ? '' : '']">
      <div :class="['max-w-md mx-auto', modal ? '' : '']">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
        <div class="text-center mb-8" v-if="!modal">
          <img src="/logo.jpg" alt="SPRITUP Center" @error="handleImageError" class="w-16 h-16 rounded-xl object-contain mx-auto mb-4 shadow-md" />
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentLang === 'en' ? 'Welcome back' : 'សូមស្វាគមន៍' }}</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ currentLang === 'en' ? 'Sign in to your account' : 'ចូលគណនីរបស់អ្នក' }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Email' : 'អ៊ីមែល' }}</label>
            <input v-model="email" type="email" required class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition" placeholder="you@example.com" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Password' : 'ពាក្យសម្ងាត់' }}</label>
            <input v-model="password" type="password" required class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition" placeholder="••••••••" />
          </div>

          <div v-if="error" class="p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
            {{ error }}
          </div>

          <button type="submit" :disabled="loading" class="w-full py-2.5 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {{ loading ? (currentLang === 'en' ? 'Signing in...' : 'កំពុងចូល...') : (currentLang === 'en' ? 'Sign in' : 'ចូល') }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6" v-if="!modal">
          {{ currentLang === 'en' ? "Don't have an account?" : 'មិនមានគណនីទេ?' }}
          <router-link to="/register" class="text-brand-600 hover:text-brand-700 font-medium">{{ currentLang === 'en' ? 'Sign up' : 'ចុះឈ្មោះ' }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onErrorCaptured } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'
import { useAuth } from '../../stores/auth.js'
import { useToast } from '../../composables/useToast.js'

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

const emit = defineEmits(['success'])

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

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
    router.push(route.query.redirect || '/')
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.response?.data?.message || (currentLang.value === 'en' ? 'Login failed. Please try again.' : 'ការចូលបរាជ័យ។ សូមព្យាយាមម្តងទៀត។')
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

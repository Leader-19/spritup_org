<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-8xl mx-auto">
      <div class="max-w-md mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
        <div class="text-center mb-8">
          <img src="/logo.jpg" alt="SPRITUP Center" class="w-16 h-16 rounded-xl object-contain mx-auto mb-4 shadow-md" />
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentLang === 'en' ? 'Create account' : 'បង្កើតគណនី' }}</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ currentLang === 'en' ? 'Join SPRITUP Center today' : 'ចូលរួមជាមួយ SPRITUP Center ថ្ងៃនេះ' }}</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Full name' : 'ឈ្មោះពេញ' }}</label>
            <input v-model="name" type="text" required class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition" placeholder="John Doe" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Email' : 'អ៊ីមែល' }}</label>
            <input v-model="email" type="email" required class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition" placeholder="you@example.com" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Password' : 'ពាក្យសម្ងាត់' }}</label>
            <input v-model="password" type="password" required minlength="8" class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition" placeholder="Min. 8 characters" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Confirm password' : 'បញ្ជាក់ពាក្យសម្ងាត់' }}</label>
            <input v-model="password_confirmation" type="password" required class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition" placeholder="Repeat password" />
          </div>

          <div v-if="error" class="p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
            {{ error }}
          </div>

          <button type="submit" :disabled="loading" class="w-full py-2.5 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {{ loading ? (currentLang === 'en' ? 'Creating account...' : 'កំពុងបង្កើតគណនី...') : (currentLang === 'en' ? 'Sign up' : 'ចុះឈ្មោះ') }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          {{ currentLang === 'en' ? 'Already have an account?' : 'មានគណនីរួចហើយ?' }}
          <router-link to="/login" class="text-brand-600 hover:text-brand-700 font-medium">{{ currentLang === 'en' ? 'Sign in' : 'ចូល' }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'
import { useAuth } from '../../stores/auth.js'

const router = useRouter()
const route = useRoute()
const { setAuth } = useAuth()
const currentLang = inject('currentLang', ref('en'))

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  if (password.value !== password_confirmation.value) {
    error.value = currentLang.value === 'en' ? 'Passwords do not match.' : 'ពាក្យសម្ងាត់មិនដំណូចទេ។'
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
    if (!data?.token || !data?.user) {
      throw new Error('The server returned an invalid registration response.')
    }
    setAuth({
      token: data.token,
      user: data.user,
    })
    const auth = useAuth()
    await auth.fetchUserCategories()
    router.push(route.query.redirect || '/')
  } catch (err) {
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

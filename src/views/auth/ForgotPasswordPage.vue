<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-8 text-center">
        <img src="/logo.jpg" alt="SPRITUP" class="mx-auto mb-4 h-16 w-16 rounded-xl object-contain shadow-md" />
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Enter your email and we will send a reset link.</p>
      </div>

      <form v-if="!sent" class="space-y-5" @submit.prevent="submit">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input v-model="email" type="email" required autocomplete="email" placeholder="you@example.com" class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-brand-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
        </div>
        <p v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400">{{ error }}</p>
        <button type="submit" :disabled="loading" class="w-full rounded-xl bg-brand-600 py-2.5 font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
          {{ loading ? 'Sending…' : 'Email reset link' }}
        </button>
      </form>

      <div v-else class="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">
        If an account exists for <strong>{{ email }}</strong>, a reset link has been sent. Please check your inbox and spam folder.
      </div>

      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">Remembered your password? <router-link to="/login" class="font-medium text-brand-600 hover:text-brand-700">Sign in</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import apiClient from '../../utils/apiClient.js'

const email = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

const submit = async () => {
  loading.value = true
  error.value = ''
  try {
    await apiClient.post('/forgot-password', { email: email.value })
    sent.value = true
  } catch (err) {
    error.value = err.response?.data?.message || 'Unable to send a reset link. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

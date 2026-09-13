<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-8 text-center">
        <img src="/logo.jpg" alt="SPRITUP" class="mx-auto mb-4 h-16 w-16 rounded-xl object-contain shadow-md" />
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Choose a new password</h1>
      </div>

      <form v-if="!completed" class="space-y-5" @submit.prevent="submit">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input v-model="email" type="email" required autocomplete="email" class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-brand-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">New password</label>
          <input v-model="password" type="password" required minlength="8" autocomplete="new-password" class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-brand-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm new password</label>
          <input v-model="passwordConfirmation" type="password" required minlength="8" autocomplete="new-password" class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-brand-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
        </div>
        <p v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400">{{ error }}</p>
        <button type="submit" :disabled="loading || !token" class="w-full rounded-xl bg-brand-600 py-2.5 font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
          {{ loading ? 'Resetting…' : 'Reset password' }}
        </button>
        <p v-if="!token" class="text-center text-sm text-red-600">This reset link is incomplete. Request a new one.</p>
      </form>

      <div v-else class="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">
        Your password has been reset. <router-link to="/login" class="font-semibold underline">Sign in now</router-link>.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'

const route = useRoute()
const token = String(route.query.token || '')
const email = ref(String(route.query.email || ''))
const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)
const completed = ref(false)
const error = ref('')

const submit = async () => {
  if (password.value !== passwordConfirmation.value) {
    error.value = 'Passwords do not match.'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await apiClient.post('/reset-password', {
      token,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })
    completed.value = true
  } catch (err) {
    const errors = err.response?.data?.errors
    error.value = errors?.email?.[0] || errors?.password?.[0] || err.response?.data?.message || 'Unable to reset password. Request a new link and try again.'
  } finally {
    loading.value = false
  }
}
</script>

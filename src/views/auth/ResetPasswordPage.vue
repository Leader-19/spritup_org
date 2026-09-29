<template>
  <div class="auth-page flex h-screen items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 lg:grid lg:grid-cols-2">
    <!-- Left Panel -->
    <aside class="relative hidden h-full min-h-screen flex-col justify-between overflow-hidden p-10 lg:flex">
      <img
        src="/images/book-removebg-preview.png"
        alt=""
        class="pointer-events-none absolute -left-8 -top-8 w-64 max-w-none select-none"
      />

      <router-link
        to="/login"
        class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        <ArrowLeft :size="18" />
      </router-link>

      <div class="relative z-10">
        <div class="flex items-center gap-3">
          <BrandLogo />
          <span class="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            Account recovery
          </span>
        </div>
        <p class="mt-4 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          Access your legal library, continue your courses, and take quizzes to test your knowledge.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-400 dark:text-zinc-500">
          <span>© {{ new Date().getFullYear() }} SPRITUP. All rights reserved.</span>
          <router-link to="/help" class="hover:text-zinc-700 dark:hover:text-zinc-300">Help</router-link>
          <router-link to="/contact" class="hover:text-zinc-700 dark:hover:text-zinc-300">Contact</router-link>
        </div>
      </div>
    </aside>

    <!-- Right Form Section -->
    <div class="flex h-full w-full items-center justify-center overflow-y-auto p-6 sm:p-10">
      <div class="w-full max-w-sm">
        <router-link
          to="/login"
          class="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 lg:hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
        >
          <ArrowLeft :size="18" />
        </router-link>

        <div class="mb-6">
          <h1 class="font-display text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Choose a new password
          </h1>
          <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Enter a new password for your account below.
          </p>
        </div>

        <form v-if="!completed" class="space-y-4" @submit.prevent="submit">
          <div>
            <label class="text-xs font-medium text-zinc-600 dark:text-zinc-400">Email address</label>
            <input
              v-model="email"
              type="email"
              required
              autocomplete="email"
              class="mt-1 w-full rounded-[5px] border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-400"
            />
          </div>

          <div>
            <label class="text-xs font-medium text-zinc-600 dark:text-zinc-400">New password</label>
            <div class="relative mt-1">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="8"
                autocomplete="new-password"
                class="w-full rounded-[5px] border border-zinc-300 bg-white px-3 py-2.5 pr-14 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-400"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div>
            <label class="text-xs font-medium text-zinc-600 dark:text-zinc-400">Confirm new password</label>
            <input
              v-model="passwordConfirmation"
              :type="showPassword ? 'text' : 'password'"
              required
              minlength="8"
              autocomplete="new-password"
              class="mt-1 w-full rounded-[5px] border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-400"
            />
          </div>

          <div v-if="error" class="flex items-start gap-2 rounded-[5px] border border-red-200 bg-red-50 p-3.5 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400">
            <svg class="size-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>{{ error }}</span>
          </div>

          <p v-if="!token" class="text-center text-sm text-red-600">This reset link is incomplete. Request a new one.</p>

          <button
            type="submit"
            :disabled="loading || !token"
            class="flex w-full items-center justify-center gap-2 rounded-[5px] bg-zinc-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <svg v-if="loading" class="animate-spin size-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>{{ loading ? 'Resetting…' : 'Reset password' }}</span>
          </button>
        </form>

        <div v-else class="flex items-start gap-2 rounded-[5px] border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">
          <svg class="size-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span>
            Your password has been reset.
            <router-link to="/login" class="font-semibold underline underline-offset-2">Sign in now</router-link>.
          </span>
        </div>

        <p class="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Remembered your password?
          <router-link to="/login" class="ml-1 font-semibold text-zinc-900 underline underline-offset-2 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import apiClient from '../../utils/apiClient.js'
import BrandLogo from '../../components/navbar/BrandLogo.vue'

const route = useRoute()
const token = String(route.query.token || '')
const email = ref(String(route.query.email || ''))
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
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

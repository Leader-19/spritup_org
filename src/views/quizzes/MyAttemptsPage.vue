<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-4xl mx-auto">
    <router-link to="/quizzes"
      class="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ currentLang === 'en' ? 'Back to Quizzes' : 'ត្រឡប់ទៅការធ្វើតេស្ត' }}
    </router-link>

    <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white mb-8">
      {{ currentLang === 'en' ? 'My Attempts' : 'ការព្យាយាមរបស់ខ្ញុំ' }}
    </h1>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 4" :key="i" class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div class="flex-1">
            <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-1"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="attempts.length === 0" class="text-center py-16">
      <p class="text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'No attempts yet' : 'មិនទាន់មានការព្យាយាម' }}</p>
    </div>

    <div v-else class="space-y-4">
      <router-link v-for="attempt in attempts" :key="attempt.id"
        :to="`/quizzes/attempts/${attempt.id}`"
        class="block p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center"
              :class="attempt.passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'">
              <svg v-if="attempt.passed" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 class="font-display font-semibold text-gray-900 dark:text-white">{{ attempt.quiz?.title }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ attempt.completed_at }}</p>
            </div>
          </div>
          <p class="font-bold text-lg" :class="attempt.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
            {{ attempt.score }}%
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'

const currentLang = inject('currentLang')
const loading = ref(true)
const attempts = ref([])

async function fetchAttempts() {
  loading.value = true
  try {
    const response = await apiClient.get('/my-attempts')
    attempts.value = response.data.data || response.data || []
  } catch (err) {
    console.error('Failed to fetch attempts:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAttempts)
</script>

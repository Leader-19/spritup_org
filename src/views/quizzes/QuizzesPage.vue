<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white">
          {{ currentLang === 'en' ? 'Quizzes' : 'ការធ្វើតេស្ត' }}
        </h1>
        <!-- <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ quizzes.length }} {{ currentLang === 'en' ? 'available' : 'មាន' }}
        </p> -->
      </div>
      <router-link to="/my-attempts"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        {{ currentLang === 'en' ? 'My Attempts' : 'ការព្យាយាមរបស់ខ្ញុំ' }}
      </router-link>
    </div>

    Loading
    <!-- <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="i in 6" :key="i" class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    </div> -->

    <!-- Empty -->
    <!-- <div v-else-if="quizzes.length === 0" class="text-center py-20">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
        {{ currentLang === 'en' ? 'No quizzes available' : 'មិនមានការធ្វើតេស្ត' }}
      </h3>
    </div> -->

    <!-- Quiz Grid -->
    <!-- <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="quiz in quizzes" :key="quiz.id"
        class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-start justify-between mb-3">
          <span class="inline-block px-2 py-0.5 text-xs font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/20 rounded-full">
            {{ quiz.category?.title }}
          </span>
          <span v-if="quiz.user_passed"
            class="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ currentLang === 'en' ? 'Passed' : 'ជោគជ័យ' }}
          </span>
          <span v-else-if="quiz.user_attempts > 0"
            class="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
            {{ currentLang === 'en' ? 'Failed' : 'បរាជ័យ' }}
          </span>
        </div>

        <h3 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-2">{{ quiz.title }}</h3>
        <p v-if="quiz.description" class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{{ quiz.description }}</p>

        <div class="space-y-1.5 text-sm text-gray-500 dark:text-gray-400 mb-5">
          <div class="flex items-center justify-between">
            <span>{{ currentLang === 'en' ? 'Questions' : 'សំណួរ' }}</span>
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ quiz.questions_count }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{ currentLang === 'en' ? 'Pass Score' : 'ពិន្ទុជោគជ័យ' }}</span>
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ quiz.passing_score }}%</span>
          </div>
          <div v-if="quiz.time_limit_minutes" class="flex items-center justify-between">
            <span>{{ currentLang === 'en' ? 'Time Limit' : 'កំណត់ពេល' }}</span>
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ quiz.time_limit_minutes }} min</span>
          </div>
          <div v-if="quiz.user_attempts > 0" class="flex items-center justify-between">
            <span>{{ currentLang === 'en' ? 'Best Score' : 'ពិន្ទុល្អបំផុត' }}</span>
            <span class="font-semibold text-orange-600 dark:text-orange-400">{{ quiz.user_best_score }}%</span>
          </div>
        </div>

        <div class="flex gap-3">
          <router-link :to="`/quizzes/${quiz.id}`"
            class="flex-1 text-center px-4 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            {{ currentLang === 'en' ? 'Details' : 'ព័ត៌មាន' }}
          </router-link>
          <router-link v-if="quiz.can_attempt" :to="`/quizzes/${quiz.id}/take`"
            class="flex-1 text-center px-4 py-2.5 text-sm font-medium bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors">
            {{ currentLang === 'en' ? 'Take Quiz' : 'ធ្វើតេស្ត' }}
          </router-link>
          <span v-else class="flex-1 text-center px-4 py-2.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-xl cursor-not-allowed">
            {{ currentLang === 'en' ? 'Max Attempts' : 'ឈានដល់កំណត់' }}
          </span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'

const currentLang = inject('currentLang')
const loading = ref(true)
const quizzes = ref([])

async function fetchQuizzes() {
  loading.value = true
  try {
    const response = await apiClient.get('/quizzes')
    console.log(response);
    quizzes.value = response.data.data || response.data || []
  } catch (err) {
    console.error('Failed to fetch quizzes:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchQuizzes)
</script>

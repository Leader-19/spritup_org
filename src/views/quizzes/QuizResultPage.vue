<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl mx-auto">
    <!-- Loading -->
    <div v-if="loading" class="space-y-6">
      <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
      <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
    </div>

    <template v-else-if="attempt">
      <router-link :to="`/quizzes/${attempt.quiz?.id}`"
        class="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {{ currentLang === 'en' ? 'Back to Quiz' : 'ត្រឡប់ទៅការធ្វើតេស្ត' }}
      </router-link>

      <!-- Result Header -->
      <div class="p-8 rounded-2xl text-center mb-6"
        :class="attempt.passed ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
          :class="attempt.passed ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'">
          <svg v-if="attempt.passed" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="font-display font-bold text-2xl mb-1"
          :class="attempt.passed ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'">
          {{ attempt.passed ? (currentLang === 'en' ? 'Congratulations! You Passed!' : 'សូមអបអរសាទរ! អ្នកជោគជ័យ!') : (currentLang === 'en' ? 'Not Passed' : 'មិនជោគជ័យ') }}
        </h1>
        <p class="text-sm" :class="attempt.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
          {{ attempt.quiz?.title }}
        </p>

        <div class="flex justify-center gap-8 mt-6">
          <div class="text-center">
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ attempt.score }}%</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ currentLang === 'en' ? 'Score' : 'ពិន្ទុ' }}</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ attempt.correct_answers }}/{{ attempt.total_questions }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ currentLang === 'en' ? 'Correct' : 'ត្រឹមត្រូវ' }}</p>
          </div>
          <div class="text-center">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ currentLang === 'en' ? 'Pass:' : 'ជោគជ័យ:' }} {{ attempt.quiz?.passing_score }}%</p>
          </div>
        </div>

        <!-- Certificate -->
        <div v-if="attempt.certificate" class="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-green-200 dark:border-green-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-yellow-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <p class="font-display font-semibold text-gray-900 dark:text-white">{{ currentLang === 'en' ? 'Certificate Earned!' : 'បានរកឃើញសញ្ញាបត្រ!' }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">#{{ attempt.certificate.certificate_number }}</p>
          <router-link :to="`/certificates/${attempt.certificate.id}`"
            class="mt-2 inline-block text-sm text-brand-600 hover:text-brand-700 font-medium">
            {{ currentLang === 'en' ? 'View Certificate' : 'មើលសញ្ញាបត្រ' }} →
          </router-link>
        </div>
      </div>

      <!-- Answer Review -->
      <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
        <h2 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-5">
          {{ currentLang === 'en' ? 'Review Answers' : 'ពិនិត្យមើលចម្លើយ' }}
        </h2>
        <div class="space-y-4">
          <div v-for="(answer, index) in attempt.answers" :key="answer.id"
            class="p-4 rounded-xl border"
            :class="answer.is_correct ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'">
            <div class="flex items-start gap-2">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                :class="answer.is_correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'">
                <svg v-if="answer.is_correct" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Q{{ index + 1 }}. {{ answer.question?.question }}</p>
                <p class="text-sm mt-1" :class="answer.is_correct ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
                  {{ currentLang === 'en' ? 'Your answer' : 'ចម្លើយរបស់អ្នក' }}: {{ answer.option?.option_text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 text-center">
        <router-link :to="`/quizzes/${attempt.quiz?.id}/take`"
          class="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors">
          {{ currentLang === 'en' ? 'Retake Quiz' : 'ធ្វើតេស្តម្តងទៀត' }}
        </router-link>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'

const currentLang = inject('currentLang')
const route = useRoute()

const loading = ref(true)
const attempt = ref(null)

async function fetchResult() {
  loading.value = true
  try {
    const response = await apiClient.get(`/quizzes/attempts/${route.params.id}`)
    attempt.value = response.data.attempt || response.data
  } catch (err) {
    console.error('Failed to fetch result:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchResult)
</script>

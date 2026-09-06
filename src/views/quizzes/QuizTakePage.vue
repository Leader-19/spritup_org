<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl mx-auto">
    <!-- Loading -->
    <div v-if="loading" class="space-y-6">
      <div class="h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div class="space-y-3">
          <div v-for="i in 4" :key="i" class="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    </div>

    <!-- Quiz Active -->
    <template v-else-if="quiz">
      <!-- Header Bar -->
      <div class="p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm mb-5 flex items-center justify-between">
        <button @click="handleExit" class="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ currentLang === 'en' ? 'Exit' : 'ចេញ' }}
        </button>
        <h1 class="font-display font-bold text-lg text-gray-900 dark:text-white">{{ quiz.title }}</h1>
        <div v-if="timeRemaining !== null" class="flex items-center gap-2 text-lg font-mono"
          :class="timeRemaining < 60 ? 'text-red-500' : 'text-gray-900 dark:text-white'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ formatTime(timeRemaining) }}
          <span v-if="timeRemaining <= 60" class="text-xs font-normal text-red-500">
            {{ currentLang === 'en' ? '⚠ Low time!' : '⚠ ពេលតិច!' }}
          </span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-5">
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-1.5">
          <span>{{ currentLang === 'en' ? 'Question' : 'សំណួរ' }} {{ currentQuestion + 1 }} / {{ totalQuestions }}</span>
          <span class="font-medium">{{ Math.round(((currentQuestion + 1) / totalQuestions) * 100) }}%</span>
        </div>
        <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <div class="h-full rounded-full bg-brand-500 transition-all duration-300"
            :style="{ width: ((currentQuestion + 1) / totalQuestions * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Question Navigation Dots -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button v-for="(q, index) in quiz.questions" :key="q.id" @click="goToQuestion(index)"
          class="w-9 h-9 rounded-full text-xs font-semibold transition-all"
          :class="index === currentQuestion
            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30'
            : answers[q.id] !== undefined
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'">
          {{ index + 1 }}
        </button>
      </div>

      <!-- Question Card -->
      <div v-if="question" class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm mb-6">
        <h2 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-1">{{ question.question }}</h2>
        <p class="text-xs text-gray-400 dark:text-gray-500 mb-5 capitalize">{{ question.type?.replace('_', ' ') }}</p>

        <div class="space-y-3">
          <button v-for="option in question.options" :key="option.id" @click="selectOption(question.id, option.id)"
            class="w-full text-left p-4 rounded-xl border-2 transition-all"
            :class="answers[question.id] === option.id
              ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-900 dark:text-brand-100'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'">
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                :class="answers[question.id] === option.id
                  ? 'border-brand-500 bg-brand-500'
                  : 'border-gray-300 dark:border-gray-600'">
                <svg v-if="answers[question.id] === option.id" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-sm font-medium">{{ option.option_text }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between">
        <button @click="prevQuestion" :disabled="currentQuestion === 0"
          class="px-5 py-2.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          ← {{ currentLang === 'en' ? 'Previous' : 'មុន' }}
        </button>
        <button v-if="isLastQuestion" @click="submitQuiz" :disabled="isSubmitting"
          class="px-6 py-2.5 text-sm font-semibold bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors">
          {{ isSubmitting ? (currentLang === 'en' ? 'Submitting...' : 'កំពុងដាក់ស្នើ...') : (currentLang === 'en' ? 'Submit Quiz' : 'ដាក់ស្នើការធ្វើតេស្ត') }}
        </button>
        <button v-else @click="nextQuestion"
          class="px-5 py-2.5 text-sm font-medium bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors">
          {{ currentLang === 'en' ? 'Next' : 'បន្ទាប់' }} →
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'

const currentLang = inject('currentLang')
const router = useRouter()
const route = useRoute()

const loading = ref(true)
const quiz = ref(null)
const answers = ref({})
const currentQuestion = ref(0)
const timeRemaining = ref(null)
const timerInterval = ref(null)
const isSubmitting = ref(false)

const totalQuestions = computed(() => quiz.value?.questions?.length || 0)
const question = computed(() => quiz.value?.questions?.[currentQuestion.value])
const isLastQuestion = computed(() => currentQuestion.value === totalQuestions.value - 1)

function selectOption(questionId, optionId) {
  answers.value[questionId] = optionId
}

function nextQuestion() {
  if (currentQuestion.value < totalQuestions.value - 1) currentQuestion.value++
}

function prevQuestion() {
  if (currentQuestion.value > 0) currentQuestion.value--
}

function goToQuestion(index) {
  currentQuestion.value = index
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function handleExit() {
  if (Object.keys(answers.value).length > 0) {
    if (!confirm(currentLang?.value === 'en' ? 'Are you sure? Progress will be lost.' : 'តើអ្នកប្រាកដទេ? វឌ្ឍនភាពនឹងបាត់បង់។')) return
  }
  router.push(`/quizzes/${route.params.id}`)
}

async function submitQuiz() {
  const answeredCount = Object.keys(answers.value).length
  const unansweredCount = totalQuestions.value - answeredCount

  if (unansweredCount > 0) {
    if (!confirm(currentLang?.value === 'en'
      ? `You have ${unansweredCount} unanswered question(s). Submit anyway?`
      : `អ្នកមាន ${unansweredCount} សំណួរមិនទាន់ឆ្លើយ។ ដាក់ស្នើទេ?`)) return
  }

  isSubmitting.value = true
  if (timerInterval.value) clearInterval(timerInterval.value)

  try {
    const answersArray = Object.entries(answers.value).map(([questionId, optionId]) => ({
      question_id: parseInt(questionId),
      option_id: optionId,
    }))
    const response = await apiClient.post(`/quizzes/${route.params.id}/submit`, { answers: answersArray })
    router.push(response.data.redirect || `/quizzes/attempts/${response.data.attempt_id}`)
  } catch (err) {
    console.error('Submit failed:', err)
    alert(currentLang?.value === 'en' ? 'Submit failed. Please try again.' : 'ដាក់ស្នើបរាជ័យ។ សូមព្យាយាមម្តងទៀត។')
    isSubmitting.value = false
  }
}

async function fetchQuiz() {
  loading.value = true
  try {
    const response = await apiClient.get(`/quizzes/${route.params.id}`)
    quiz.value = response.data.quiz || response.data
  } catch (err) {
    console.error('Failed to fetch quiz:', err)
    router.push('/quizzes')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchQuiz().then(() => {
    if (quiz.value?.time_limit_minutes) {
      timeRemaining.value = quiz.value.time_limit_minutes * 60
      timerInterval.value = setInterval(() => {
        if (timeRemaining.value !== null && timeRemaining.value > 0) {
          timeRemaining.value--
          if (timeRemaining.value <= 0) submitQuiz()
        }
      }, 1000)
    }
  })
})

onUnmounted(() => {
  if (timerInterval.value) clearInterval(timerInterval.value)
})
</script>

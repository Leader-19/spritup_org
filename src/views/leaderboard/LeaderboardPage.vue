<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl mx-auto">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white">
        {{ currentLang === 'en' ? 'Leaderboard' : 'តារាងចំណាត់ថ្នាក់' }}
      </h1>
    </div>

    <!-- User Stats Card -->
    <div class="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-8">
      <h2 class="font-display font-semibold text-lg mb-4">{{ currentLang === 'en' ? 'Your Stats' : 'ស្ថិតិរបស់អ្នក' }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <p class="text-2xl font-bold">{{ userRank ?? '-' }}</p>
          <p class="text-xs text-blue-100">{{ currentLang === 'en' ? 'Rank' : 'ចំណាត់ថ្នាក់' }}</p>
        </div>
        <div class="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <p class="text-2xl font-bold">{{ userStats.best_score }}%</p>
          <p class="text-xs text-blue-100">{{ currentLang === 'en' ? 'Best Score' : 'ពិន្ទុល្អបំផុត' }}</p>
        </div>
        <div class="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <p class="text-2xl font-bold">{{ userStats.quizzes_passed }}</p>
          <p class="text-xs text-blue-100">{{ currentLang === 'en' ? 'Passed' : 'ជោគជ័យ' }}</p>
        </div>
        <div class="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <p class="text-2xl font-bold">{{ userStats.average_score }}%</p>
          <p class="text-xs text-blue-100">{{ currentLang === 'en' ? 'Avg Score' : 'ពិន្ទុមធ្យម' }}</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
      <div v-for="i in 5" :key="i" class="flex items-center gap-4 p-3">
        <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div class="flex-1">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-1"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    </div>

    <!-- Leaderboard Table -->
    <div v-else-if="leaderboard.length > 0" class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
      <div v-for="(entry, index) in leaderboard" :key="entry.user_id"
        class="flex items-center gap-4 p-4 rounded-xl transition-colors"
        :class="[
          entry.user_id === currentUserId ? 'bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40',
          index < leaderboard.length - 1 ? 'border-b border-gray-100 dark:border-gray-700/50' : ''
        ]">
        <div class="w-10 text-center">
          <span v-if="entry.rank === 1" class="text-2xl">🥇</span>
          <span v-else-if="entry.rank === 2" class="text-2xl">🥈</span>
          <span v-else-if="entry.rank === 3" class="text-2xl">🥉</span>
          <span v-else class="font-bold text-gray-500 dark:text-gray-400">#{{ entry.rank }}</span>
        </div>
        <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <span class="text-sm font-bold text-gray-500 dark:text-gray-400">{{ entry.user?.name?.charAt(0) || '?' }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-gray-900 dark:text-white truncate">{{ entry.user?.name }}</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-gray-900 dark:text-white">{{ entry.best_score }}%</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ entry.quizzes_passed }} {{ currentLang === 'en' ? 'passed' : 'ជោគជ័យ' }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-16">
      <p class="text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'No leaderboard data yet' : 'មិនទាន់មានស្ថិតិ' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'
import { useAuth } from '../../stores/auth.js'

const currentLang = inject('currentLang')
const auth = useAuth()
const currentUserId = computed(() => auth.user?.id)

const loading = ref(true)
const leaderboard = ref([])
const userRank = ref(null)
const userStats = ref({ best_score: 0, quizzes_passed: 0, average_score: 0 })

async function fetchLeaderboard() {
  loading.value = true
  try {
    const response = await apiClient.get('/leaderboard')
    leaderboard.value = response.data.leaderboard || []
    userRank.value = response.data.user_rank
    userStats.value = response.data.user_stats || userStats.value
  } catch (err) {
    console.error('Failed to fetch leaderboard:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchLeaderboard)
</script>

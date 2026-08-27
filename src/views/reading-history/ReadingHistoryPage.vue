<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl mx-auto">
    <div class="mb-8">
      <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white">
        {{ currentLang === 'en' ? 'Reading History' : 'ប្រវត្តិនៃការអាន' }}
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {{ historyItems.length }} {{ currentLang === 'en' ? 'documents' : 'ឯកសារ' }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
          <div class="flex-1">
            <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="historyItems.length === 0" class="text-center py-20">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
        {{ currentLang === 'en' ? 'No reading history yet' : 'មិនមានប្រវត្តិនៃការអាន' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        {{ currentLang === 'en' ? 'Start reading documents to track your progress.' : 'ចាប់ផ្តើមអានឯកសារដើម្បីតាមដានការរីកចម្រើន។' }}
      </p>
      <router-link to="/documents"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
        {{ currentLang === 'en' ? 'Browse Documents' : 'រកមើលឯកសារ' }}
      </router-link>
    </div>

    <!-- History List -->
    <div v-else class="space-y-4">
      <div v-for="item in historyItems" :key="item.id"
        class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            :class="item.progress_percent >= 100 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'">
            <svg v-if="item.progress_percent >= 100" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <router-link :to="`/documents/${item.document?.id}`" class="font-display font-semibold text-gray-900 dark:text-white hover:text-brand-600 transition-colors">
              {{ item.document?.doc_title }}
            </router-link>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.document?.doc_name }}</p>
            <span v-if="item.document?.category" class="inline-block px-2 py-0.5 text-xs font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/20 rounded-full mt-1">
              {{ item.document.category.title }}
            </span>

            <!-- Progress Bar -->
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                <span>{{ currentLang === 'en' ? 'Page' : 'ទំព័រ' }} {{ item.last_page }} / {{ item.total_pages }}</span>
                <span class="font-semibold text-gray-700 dark:text-gray-300">{{ item.progress_percent }}%</span>
              </div>
              <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500"
                  :class="item.progress_percent >= 100 ? 'bg-green-500' : 'bg-blue-500'"
                  :style="{ width: Math.min(item.progress_percent, 100) + '%' }"></div>
              </div>
            </div>

            <p v-if="item.last_opened_at" class="text-xs text-gray-400 dark:text-gray-500 mt-2">
              {{ currentLang === 'en' ? 'Last opened' : 'បើកចុងក្រោយ' }}: {{ item.last_opened_at }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'

const currentLang = inject('currentLang')
const loading = ref(true)
const historyItems = ref([])

async function fetchHistory() {
  loading.value = true
  try {
    const response = await apiClient.get('/reading-history')
    historyItems.value = response.data.data || response.data || []
  } catch (err) {
    console.error('Failed to fetch reading history:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchHistory)
</script>

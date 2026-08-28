<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl mx-auto">
    <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white mb-8">
      {{ currentLang === 'en' ? 'Dashboard' : 'ផ្ទាំងគ្រប់គ្រង' }}
    </h1>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div v-for="i in 4" :key="i" class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm animate-pulse">
          <div class="flex items-center justify-between mb-3">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div class="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
      <div class="grid lg:grid-cols-3 gap-5">
        <div class="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
          <div class="space-y-3">
            <div v-for="i in 3" :key="i" class="flex items-center gap-3 p-3">
              <div class="w-9 h-9 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
          <div class="space-y-3">
            <div v-for="i in 4" :key="i" class="space-y-1.5">
              <div class="flex justify-between">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
              </div>
              <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
        {{ currentLang === 'en' ? 'Something went wrong' : 'មានបញ្ហាមួយផង' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
        {{ currentLang === 'en' ? 'Failed to load dashboard data. Please try again later.' : 'មិនអាចទាញយកទិន្នន័យបាន។ សូមព្យាយាមម្តងទៀត។' }}
      </p>
      <button @click="fetchDashboardData"
        class="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
        {{ currentLang === 'en' ? 'Retry' : 'ព្យាយាមម្តងទៀត' }}
      </button>
    </div>

    <!-- Dashboard Content -->
    <template v-else>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          v-for="metric in metrics"
          :key="metric.title"
          class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-gray-500 dark:text-gray-400 text-sm">{{ currentLang === 'en' ? metric.title : metric.titleKh }}</span>
            <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', metric.color]">
              <span v-html="metric.icon" class="w-4 h-4 text-white"></span>
            </div>
          </div>
          <p class="font-display font-bold text-2xl text-gray-900 dark:text-white">{{ metric.value }}</p>
          <p v-if="metric.change" class="text-xs text-green-500 mt-1 font-medium">{{ metric.change }}</p>
        </div>
      </div>

      <!-- All Categories with Item Counts -->
      <div v-if="allCategories.length" class="mb-6 p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
        <h2 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">
          {{ currentLang === 'en' ? 'All Categories' : 'ប្រភេទទាំងអស់' }}
          <span class="text-sm font-normal text-gray-400 ml-2">({{ allCategories.length }})</span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div
            v-for="cat in allCategories"
            :key="cat.id"
            class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors cursor-pointer"
            @click="$router.push(`/documents?category=${cat.id}`)"
          >
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ cat.name }}</p>
              <p class="text-xs text-gray-400">
                <span class="font-bold text-blue-500">{{ cat.count }}</span>
                {{ currentLang === 'en' ? 'items' : 'ឯកសារ' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-5">
        <div class="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
          <h2 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">
            {{ currentLang === 'en' ? 'Recent Documents' : 'ឯកសារថ្មីៗ' }}
          </h2>
          <div v-if="recentDocuments.length" class="space-y-3">
            <div
              v-for="doc in recentDocuments"
              :key="doc.id"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors cursor-pointer"
              @click="viewDocument(doc)"
            >
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {{ doc.name }}
                </p>
                <p class="text-xs text-gray-400">{{ doc.category }} &#x2022; {{ doc.created_at }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-400 text-sm">
            {{ currentLang === 'en' ? 'No recent documents' : 'មិនមានឯកសារថ្មីៗ' }}
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
          <h2 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">
            {{ currentLang === 'en' ? 'Top Categories' : 'ប្រភេទកំពូល' }}
          </h2>
          <div v-if="topCategories.length" class="space-y-3">
            <div v-for="(cat, index) in topCategories" :key="cat.name" class="space-y-1.5">
              <div class="flex justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ cat.name }}</span>
                <span class="text-gray-500 dark:text-gray-400">{{ cat.count }} docs</span>
              </div>
              <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div
                  :style="{ width: getCatWidth(cat.count) + '%' }"
                  :class="['h-full rounded-full transition-all duration-700', catColors[index % catColors.length]]">
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-400 text-sm">
            {{ currentLang === 'en' ? 'No categories available' : 'មិនមានប្រភេទ' }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'
import { useAuth } from '../../stores/auth.js'

const currentLang = inject('currentLang')

const loading = ref(true)
const error = ref(null)
const dashboardData = ref(null)

const catColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500']

const metrics = computed(() => {
  const data = dashboardData.value?.metrics
  return [
    {
      title: 'Total Users',
      titleKh: 'សរុបអ្នកប្រើ',
      value: data?.total_users?.toLocaleString() ?? '0',
      change: '',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM15 20H9m6 0h6" /></svg>',
      color: 'bg-blue-500'
    },
    {
      title: 'Categories',
      titleKh: 'ប្រភេទ',
      value: data?.total_categories?.toLocaleString() ?? '0',
      change: '',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
      color: 'bg-green-500'
    },
    {
      title: 'Documents',
      titleKh: 'ឯកសារ',
      value: data?.total_documents?.toLocaleString() ?? '0',
      change: '',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
      color: 'bg-purple-500'
    },
    {
      title: 'Quick Access',
      titleKh: 'ចូលប្រើប្រាស់រហ័ស',
      value: 'Open',
      change: currentLang?.value === 'en' ? 'Browse all documents' : 'រកមើលឯកសារទាំងអស់',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>',
      color: 'bg-orange-500'
    },
  ]
})

const recentDocuments = computed(() => dashboardData.value?.recent_documents ?? [])
const topCategories = computed(() => dashboardData.value?.top_categories ?? [])
const allCategories = computed(() => dashboardData.value?.all_categories ?? [])

const maxCatCount = computed(() => {
  if (!topCategories.value.length) return 1
  return Math.max(...topCategories.value.map(c => c.count))
})

function getCatWidth(count) {
  return Math.max(5, (count / maxCatCount.value) * 100)
}

function viewDocument(doc) {
  window.location.href = '/documents'
}

async function fetchDashboardData() {
  loading.value = true
  error.value = null
  try {
    const response = await apiClient.get('/dashboard')
    if (response.data.status === 'success') {
      dashboardData.value = response.data
    } else {
      error.value = 'Unexpected response from server'
    }
  } catch (err) {
    console.error('Error fetching dashboard data:', err)
    const auth = useAuth()
    if (auth.isAuthenticated && auth.user) {
      dashboardData.value = {
        metrics: {
          total_users: 1,
          total_categories: auth.user.assigned_categories?.length ?? 0,
          total_documents: 0,
        },
        top_categories: (auth.user.assigned_categories || []).map(c => ({
          name: c.title || c.name,
          count: 0,
          id: c.id,
        })),
        recent_documents: [],
      }
    } else {
      error.value = err.message || 'Failed to load dashboard data'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

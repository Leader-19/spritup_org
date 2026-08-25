<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">Subscription Plans</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage subscription plans and assign them to users.</p>
          </div>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="plan in plans" :key="plan.id" class="relative flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:border-blue-500 transition-all">
            <div>
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {{ plan.currency }}
                </span>
                <span :class="['inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', plan.is_active ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800']">
                  {{ plan.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>

              <h2 class="mt-3 text-lg font-bold text-gray-900 dark:text-white">{{ plan.name }}</h2>
              <p class="mt-1 text-xs text-gray-500 line-clamp-2">{{ plan.description || 'No description provided.' }}</p>

              <div class="mt-4 flex items-baseline gap-1">
                <span class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{{ plan.formatted_price }}</span>
                <span class="text-xs text-gray-500">/ {{ plan.duration_days ? `${plan.duration_days} days` : 'lifetime' }}</span>
              </div>

              <ul class="mt-6 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li class="flex items-center gap-2">
                  <svg class="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <span>Up to {{ plan.max_categories || 'Unlimited' }} categories</span>
                </li>
                <li class="flex items-center gap-2">
                  <svg class="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <span>Up to {{ plan.max_documents || 'Unlimited' }} documents</span>
                </li>
                <li v-if="plan.max_storage_mb" class="flex items-center gap-2">
                  <svg class="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <span>{{ plan.max_storage_mb }} MB storage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="!plans.length && !loading" class="text-center py-20">
          <p class="text-gray-500 dark:text-gray-400">No subscription plans available.</p>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'

const plans = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await apiClient.get('/admin/plans')
    plans.value = response.data.plans
  } catch (error) {
    console.error('Failed to load plans:', error)
  } finally {
    loading.value = false
  }
})
</script>

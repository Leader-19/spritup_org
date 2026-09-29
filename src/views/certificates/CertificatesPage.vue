<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white">
        {{ currentLang === 'en' ? 'My Certificates' : 'សញ្ញាបត្ររបស់ខ្ញុំ' }}
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {{ certificates.length }} {{ currentLang === 'en' ? 'earned' : 'បានរកឃើញ' }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="i in 3" :key="i" class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
        <div class="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4"></div>
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="certificates.length === 0" class="text-center py-20">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
        {{ currentLang === 'en' ? 'No certificates yet' : 'មិនទាន់មានសញ្ញាបត្រ' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        {{ currentLang === 'en' ? 'Pass quizzes to earn certificates.' : 'ជោគជ័យការធ្វើតេស្តដើម្បីទទួលបានសញ្ញាបត្រ។' }}
      </p>
      <router-link to="/quizzes"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
        {{ currentLang === 'en' ? 'Browse Quizzes' : 'រកមើលការធ្វើតេស្ត' }}
      </router-link>
    </div>

    <!-- Certificates Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <router-link v-for="cert in certificates" :key="cert.id" :to="`/certificates/${cert.id}`"
        class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-yellow-200 dark:border-yellow-800/50 shadow-sm hover:shadow-md transition-all text-center group">
        <div class="w-14 h-14 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h3 class="font-display font-semibold text-gray-900 dark:text-white mb-1">{{ cert.quiz?.title }}</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ cert.quiz?.category?.title }}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 font-mono">#{{ cert.certificate_number }}</p>
        <div class="mt-3 flex items-center justify-center gap-4 text-sm">
          <span class="font-bold text-green-600 dark:text-green-400">{{ cert.score }}%</span>
          <span class="text-gray-400">{{ cert.created_at }}</span>
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
const certificates = ref([])

async function fetchCertificates() {
  loading.value = true
  try {
    const response = await apiClient.get('/certificates')
    certificates.value = response.data.data || response.data || []
  } catch (err) {
    console.error('Failed to fetch certificates:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchCertificates)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <router-link to="/certificates"
      class="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ currentLang === 'en' ? 'Back to Certificates' : 'ត្រឡប់ទៅសញ្ញាបត្រ' }}
    </router-link>

    <!-- Loading -->
    <div v-if="loading" class="h-96 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

    <!-- Certificate Card -->
    <div v-else-if="certificate" class="p-8 rounded-2xl bg-white dark:bg-gray-800/80 border-2 border-yellow-300 dark:border-yellow-700 text-center shadow-lg print:shadow-none">
      <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>

      <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white mb-1">
        {{ currentLang === 'en' ? 'Certificate of Achievement' : 'សញ្ញាបត្រសមិទ្ធផល' }}
      </h1>
      <div class="w-24 h-0.5 bg-yellow-400 mx-auto my-4"></div>

      <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">{{ currentLang === 'en' ? 'This is proudly presented to' : 'នេះជាការផ្តល់ជូនដោយមោទនភាពដល់' }}</p>
      <h2 class="font-display font-bold text-2xl text-brand-600 dark:text-brand-400 mb-4">{{ certificate.user?.name }}</h2>

      <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">{{ currentLang === 'en' ? 'for completing' : 'សម្រាប់ការបញ្ចប់' }}</p>
      <h3 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-1">{{ certificate.quiz?.title }}</h3>
      <p class="text-xs text-gray-400 dark:text-gray-500 mb-6">{{ certificate.quiz?.category?.title }}</p>

      <div class="flex justify-center gap-8 mb-6">
        <div>
          <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ certificate.score }}%</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Score' : 'ពិន្ទុ' }}</p>
        </div>
      </div>

      <div class="w-full h-px bg-gray-200 dark:bg-gray-700 my-6"></div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Certificate Number' : 'លេខសញ្ញាបត្រ' }}</p>
          <p class="font-mono font-semibold text-gray-900 dark:text-white">{{ certificate.certificate_number }}</p>
        </div>
        <div>
          <p class="text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Date Issued' : 'ថ្ងៃចេញ' }}</p>
          <p class="font-semibold text-gray-900 dark:text-white">{{ certificate.created_at }}</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="certificate" class="mt-6 flex justify-center gap-4 print:hidden">
      <button @click="printCertificate"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        {{ currentLang === 'en' ? 'Print' : 'ព្រីន' }}
      </button>
      <a :href="`/api/certificates/${certificate.id}/download`"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {{ currentLang === 'en' ? 'Download PDF' : 'ទាញយក PDF' }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'

const currentLang = inject('currentLang')
const route = useRoute()

const loading = ref(true)
const certificate = ref(null)

function printCertificate() {
  window.print()
}

async function fetchCertificate() {
  loading.value = true
  try {
    const response = await apiClient.get(`/certificates/${route.params.id}`)
    certificate.value = response.data.certificate || response.data
  } catch (err) {
    console.error('Failed to fetch certificate:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchCertificate)
</script>

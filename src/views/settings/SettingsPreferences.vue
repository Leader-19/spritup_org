<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {{ currentLang === 'en' ? 'Preferences' : 'ចំណូលចិត្ត' }}
      </h1>
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <p class="text-gray-600 dark:text-gray-300">
          {{ currentLang === 'en' ? 'Preferences content goes here.' : 'ការកំណត់ចំណូលចិត្តបង្ហាញនៅទីនេះ' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const currentLang = inject('currentLang')
</script>
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {{ currentLang === 'en' ? 'Support' : 'ជំនួយ' }}
      </h1>
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <p class="text-gray-600 dark:text-gray-300">
          {{ currentLang === 'en' ? 'Support content goes here.' : 'បង្ហាញជំនួយ' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const currentLang = inject('currentLang')
</script>
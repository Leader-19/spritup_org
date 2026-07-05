<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {{ currentLang === 'en' ? 'Help' : 'ជំនួយ' }}
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <router-link to="/help/faq" class="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ currentLang === 'en' ? 'FAQ' : 'សំណួរញឹកញាប់' }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Frequently asked questions.' : 'សំណួរដែលសួរញឹកញាប់។' }}</p>
        </router-link>
        <router-link to="/help/support" class="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ currentLang === 'en' ? 'Support' : 'ជំនួយ' }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Get support from our team.' : 'ទទួលបានជំនួពីក្រុមការងាររបស់យើង។' }}</p>
        </router-link>
        <router-link to="/help/documentation" class="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ currentLang === 'en' ? 'Documentation' : 'ឯកសារ' }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Read our documentation and guides.' : 'អានឯកសារនិងមគ្គុម្មនៃយើង។' }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const currentLang = inject('currentLang')
</script>

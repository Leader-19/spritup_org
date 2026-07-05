<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {{ currentLang === 'en' ? 'Settings' : 'ការកំណត់' }}
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <router-link to="/settings/profile" class="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ currentLang === 'en' ? 'Profile' : 'ប្រវត្តិរូប' }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Manage your profile information.' : 'គ្រប់គ្រងព័ត៌មានប្រវត្តិរូបអ្នក។' }}</p>
        </router-link>
        <router-link to="/settings/preferences" class="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ currentLang === 'en' ? 'Preferences' : 'ចំណូលប្បត្ដិ' }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Customize your preferences.' : 'ប្ដូរប្រែការកំណត់ចំណូលប្បត្ដិអ្នក។' }}</p>
        </router-link>
        <router-link to="/settings/privacy" class="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ currentLang === 'en' ? 'Privacy' : 'ឯកជនភាព' }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Manage your privacy settings.' : 'គ្រប់គ្រងការកំណត់ឯកជនភាពអ្នក។' }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const currentLang = inject('currentLang')
</script>

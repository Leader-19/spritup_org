<template>
  <div class="mt-6 mb-6 rounded-[5px] border border-amber-200 dark:border-amber-800/60 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-100/50 dark:from-amber-950/40 dark:via-orange-950/20 dark:to-amber-900/20 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-[5px] bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-bold text-amber-900 dark:text-amber-200">
          {{ currentLang === 'en' ? 'Create a Free Account to Read Documents' : 'ចុះឈ្មោះគណនីឥតគិតថ្លៃដើម្បីអានឯកសារ' }}
        </p>
        <p class="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
          {{ currentLang === 'en'
            ? 'Browsing preview catalog. Register or sign in to open full legal documents, save to library, and take quizzes.'
            : 'អ្នកកំពុងមើលបញ្ជីសាកល្បង។ សូមចុះឈ្មោះ ឬចូលគណនីដើម្បីអានឯកសារពេញលេញ រក្សាទុកក្នុងបណ្ណាល័យ និងធ្វើតេស្ត។' }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
      <button
        @click="$emit('register')"
        class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[5px] bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition whitespace-nowrap"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        <span>{{ currentLang === 'en' ? 'Register Free' : 'ចុះឈ្មោះឥតគិតថ្លៃ' }}</span>
      </button>
      <button
        @click="$emit('login')"
        class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[5px] bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 text-xs font-semibold transition whitespace-nowrap"
      >
        <span>{{ currentLang === 'en' ? 'Sign In' : 'ចូលគណនី' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ currentLang: { type: String, required: true } })
defineEmits(['register', 'login'])
</script>
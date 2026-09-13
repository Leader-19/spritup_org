<template>
  <div class="mb-6 rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-blue-100/50 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-blue-900/20 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
          <span>{{ currentLang === 'en' ? 'Free Plan: Preview Access' : 'គម្រោងឥតគិតថ្លៃ (Free Plan)' }}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold">
            {{ limit || 5 }} {{ currentLang === 'en' ? 'docs / category' : 'ឯកសារ / ប្រភេទ' }}
          </span>
        </p>
        <p class="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
          {{ currentLang === 'en'
            ? `You can read up to ${limit || 5} documents per category for free. Upgrade to a paid plan for unlimited reading of all documents.`
            : `អ្នកអាចអានឯកសាររហូតដល់ ${limit || 5} ក្នុងមួយប្រភេទដោយឥតគិតថ្លៃ។ សូមដំឡើងគម្រោងដើម្បីអានឯកសារទាំងអស់ដោយគ្មានដែនកំណត់។` }}
        </p>
      </div>
    </div>
    <router-link
      to="/subscription-plans"
      class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-sm transition whitespace-nowrap"
    >
      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{{ currentLang === 'en' ? 'Upgrade Plan' : 'ដំឡើងគម្រោង' }}</span>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  currentLang: { type: String, required: true },
  limit: { type: Number, default: 5 }
})
</script>
<template>
  <div class="text-center py-16">
    <div class="w-20 h-20 mx-auto mb-5 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
      <svg class="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    </div>
    <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
      {{ currentLang === 'en' ? 'Something went wrong' : 'មានបញ្ហាមួយកើតឡើង' }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-5">
      {{ currentLang === 'en' ? 'Failed to load documents. Please try again later.' : 'មិនអាចទាញយកឯកសារបានទេ។ សូមព្យាយាមម្តងទៀត។' }}
    </p>
    <button
      @click="$emit('retry')"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 shadow-sm transition-colors"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>{{ currentLang === 'en' ? 'Retry' : 'ព្យាយាមម្តងទៀត' }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({ currentLang: { type: String, required: true } })
defineEmits(['retry'])
</script>
<template>
  <div class="mt-8 pt-6 border-t border-gray-200/80 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div class="text-xs text-gray-500 dark:text-gray-400">
      {{ currentLang === 'en'
        ? `Showing ${pageStart} - ${pageEnd} of ${total} documents`
        : `បង្ហាញពី ${pageStart} ដល់ ${pageEnd} នៃ ${total} ឯកសារ`
      }}
    </div>

    <div class="flex items-center gap-1.5 flex-wrap justify-center">
      <button
        @click="$emit('go-to-page', currentPage - 1)"
        :disabled="currentPage === 1"
        :class="['inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors',
          currentPage === 1
            ? 'text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800/40 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm']"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>{{ currentLang === 'en' ? 'Previous' : 'មុន' }}</span>
      </button>

      <template v-for="(page, idx) in visiblePages" :key="idx">
        <span v-if="page === '...'" class="px-2 py-1 text-xs text-gray-400">...</span>
        <button
          v-else
          @click="$emit('go-to-page', page)"
          :class="['w-8 h-8 rounded-xl text-xs font-semibold transition-all',
            currentPage === page
              ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
              : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700']"
        >
          {{ page }}
        </button>
      </template>

      <button
        @click="$emit('go-to-page', currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="['inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors',
          currentPage === totalPages
            ? 'text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800/40 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm']"
      >
        <span>{{ currentLang === 'en' ? 'Next' : 'បន្ទាប់' }}</span>
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentLang: { type: String, required: true },
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  pageStart: { type: Number, required: true },
  pageEnd: { type: Number, required: true },
  total: { type: Number, required: true },
  visiblePages: { type: Array, required: true }
})
defineEmits(['go-to-page'])
</script>
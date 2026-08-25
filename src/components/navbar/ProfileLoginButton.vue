<template>
  <button @click="$emit('open')"
    class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
    :aria-label="currentLang === 'en' ? 'Account menu' : 'ម៉ឺនុយគណនី'">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
  </button>
</template>

<script setup>
defineProps({
  currentLang: {
    type: String,
    default: 'en',
  },
})

defineEmits(['open'])
</script>

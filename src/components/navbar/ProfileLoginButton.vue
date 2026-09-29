<template>
  <button @click="$emit('open')"
    class="text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
    :aria-label="currentLang === 'en' ? 'Account menu' : 'ម៉ឺនុយគណនី'">
    <User class="w-5 h-5" />
  </button>
</template>

<script setup>
import { User } from 'lucide-vue-next'

defineProps({
  currentLang: {
    type: String,
    default: 'en',
  },
})

defineEmits(['open'])
</script>

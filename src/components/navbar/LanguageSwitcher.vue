<template>
  <div class="relative">
    <button @click="open = !open"
      class="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300">
      <span>{{ currentLang === 'en' ? '🇺🇸' : '🇰🇭' }}</span>
      <span class="hidden sm:inline">{{ currentLang === 'en' ? 'EN' : 'KH' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div :class="['lang-dropdown absolute right-0 top-full mt-2 w-36 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50',
      'bg-white dark:bg-gray-900',
      open ? 'lang-visible' : 'lang-hidden']">
      <button v-for="lang in languages" :key="lang.code" @click="selectLang(lang.code)" :class="['w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
        currentLang === lang.code
          ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60']">
        <span>{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentLang: {
    type: String,
    default: 'en',
  },
})

const emit = defineEmits(['set-lang'])

const open = ref(false)

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'kh', name: 'ខ្មែរ', flag: '🇰🇭' },
]

const selectLang = (code) => {
  open.value = false
  emit('set-lang', code)
}
</script>

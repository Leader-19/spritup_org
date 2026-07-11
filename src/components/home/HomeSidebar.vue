<template>
  <div class="flex flex-col gap-1">
    <button v-for="item in sections" :key="item.key" @click="$emit('select', item.key)"
      class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left"
      :class="activeSection === item.key
        ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'">
      <span class="flex-shrink-0" v-html="item.icon"></span>
      {{ currentLang === 'en' ? item.label : item.labelKh }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentLang: { type: String, default: 'en' },
  activeSection: { type: String, default: '' },
})

defineEmits(['select'])

const sections = [
  {
    key: 'objective',
    label: 'Objective',
    labelKh: 'គោលបំណង',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  },
  {
    key: 'mission',
    label: 'Mission',
    labelKh: 'បេសកកម្ម',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>',
  },
  {
    key: 'vision',
    label: 'Vision',
    labelKh: 'ទស្សនវិស័យ',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>',
  },
  {
    key: 'contact',
    label: 'Contact',
    labelKh: 'ទំនាក់ទំនង',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
  },
  {
    key: 'donate',
    label: 'Donate',
    labelKh: 'ឧបត្ថម្ភ',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>',
  },
]
</script>

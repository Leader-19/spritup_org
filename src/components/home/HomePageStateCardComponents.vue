<template>
    <div v-for="stat in stats" :key="stat.label"
        class="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 glass border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow">
        <p class="font-display font-bold text-3xl text-gray-900 dark:text-white">{{ stat.value }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ currentLang === 'en' ? stat.label : stat.labelKh }}
        </p>
        <div class="mt-3 flex items-center gap-1 text-green-500 text-xs font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            {{ stat.change }}
        </div>
    </div>
    
</template>

<script setup>
defineProps({
  currentLang: { type: String, default: 'en' }
})

const stats = [
  { value: '99.9%', label: 'Uptime', labelKh: 'ពេលវេលាដំណើរការ', change: '+12% from last month' },
  { value: '50K+', label: 'Users', labelKh: 'អ្នកប្រើប្រាស់', change: '+23% growth' },
  { value: '24/7', label: 'Support', labelKh: 'ការគាំទ្យ', change: 'Always available' },
  { value: '$2.5M', label: 'Revenue', labelKh: 'ចំណូល', change: '+45% YoY' },
]
</script>
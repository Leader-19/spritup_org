<template>
  <div class="hidden lg:flex items-center gap-1 ml-6 overflow-x-auto flex-1 scrollbar-hide" ref="navContainer">
    <button v-for="item in items" :key="item.key" @click="$emit('navigate', item)"
      :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0',
        activeKey === item.key
          ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100']">
      {{ currentLang === 'en' ? item.label : item.labelKh }}
    </button>
  </div>

  <button @click="scrollLeft"
    class="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button @click="scrollRight"
    class="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  activeKey: {
    type: String,
    default: '',
  },
  currentLang: {
    type: String,
    default: 'en',
  },
})

defineEmits(['navigate'])

const navContainer = ref(null)

const scrollLeft = () => {
  if (navContainer.value) {
    navContainer.value.scrollBy({ left: -200, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (navContainer.value) {
    navContainer.value.scrollBy({ left: 200, behavior: 'smooth' })
  }
}
</script>

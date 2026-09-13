<template>
  <div class="hidden lg:flex items-center gap-1 ml-6 overflow-x-auto flex-1 scrollbar-hide" ref="navContainer">
    <button v-for="item in items" :key="item.key" @click="$emit('navigate', item)"
      :class="['px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 inline-flex items-center gap-1.5',
        activeKey === item.key
          ? (item.key === 'plans'
              ? 'bg-amber-500 text-white shadow-sm font-semibold'
              : 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400')
          : (item.key === 'plans'
              ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 font-semibold'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100')]">
      <svg v-if="item.key === 'plans'" class="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{{ currentLang === 'en' ? item.label : item.labelKh }}</span>
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

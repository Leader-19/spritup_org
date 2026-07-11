<template>
  <transition name="fade">
    <div v-if="sidebarOpen && isMobile" class="fixed inset-0 z-30 overlay" @click="$emit('close')">
    </div>
  </transition>

  <aside :class="['sidebar-glass fixed right-0 top-28 lg:top-16 bottom-0 z-30 w-72 overflow-y-auto transition-transform duration-300',
    sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
    !sidebarOpen && 'lg:w-0 lg:overflow-hidden']"
    style="transition: transform 0.3s cubic-bezier(.4,0,.2,1), width 0.3s;">

    <div class="p-4 space-y-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          {{ sidebarTitle }}
        </h3>
        <button @click="$emit('toggle')"
          class="p-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <ChatWidget :current-lang="currentLang" />
    </div>
  </aside>

  <button v-if="!sidebarOpen" @click="$emit('toggle')"
    class="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-lg bg-white/90 dark:bg-gray-900/90 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors text-gray-600 dark:text-gray-300">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import ChatWidget from '../components/ai-assistants/ChatWidget.vue'

const props = defineProps({
  sidebarOpen: Boolean,
  isMobile: Boolean,
  currentLang: String,
})

defineEmits(['close', 'toggle'])

const sidebarTitle = computed(() => {
  return props.currentLang === 'en' ? 'AI Assistant' : 'ជំនួយ AI'
})
</script>

<template>
  <!-- Floating popup card -->
  <Transition name="chat-popup">
    <div v-if="sidebarOpen"
      class="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 h-[28rem] max-h-[70vh] rounded-[5px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col">
      <ChatWidget :current-lang="currentLang" />
    </div>
  </Transition>

  <!-- Persistent floating trigger button, bottom-right on every screen -->
  <button @click="$emit('toggle')"
    class="fixed bottom-6 right-4 sm:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700 transition-colors"
    :aria-label="currentLang === 'en' ? 'Open AI Assistant' : 'បើកជំនួយ AI'">
    <X v-if="sidebarOpen" :size="24" />
    <BotMessageSquare v-else :size="24" />
  </button>
</template>

<script setup>
import { BotMessageSquare, X } from 'lucide-vue-next'
import ChatWidget from '../components/ai-assistants/ChatWidget.vue'

defineProps({
  sidebarOpen: Boolean,
  isMobile: Boolean,
  currentLang: String,
})

defineEmits(['close', 'toggle'])
</script>

<style scoped>
.chat-popup-enter-active,
.chat-popup-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.chat-popup-enter-from,
.chat-popup-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
</style>

<template>
  <transition-group name="toast" tag="div"
      class="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      <div v-for="toast in toasts" :key="toast.id"
        :class="['flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border max-w-sm',
          'transition-all duration-300',
          toastTypeClasses(toast.type)]">
        <span class="text-lg flex-shrink-0">{{ toastIcon(toast.type) }}</span>
        <span class="text-sm font-medium text-gray-800 dark:text-gray-100 flex-1">{{ toast.message }}</span>
        <button @click="remove(toast.id)"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition-group>
</template>

<script setup>
import { useToast } from '../composables/useToast'

const { toasts, remove } = useToast()

const toastTypeClasses = (type) => {
  const map = {
    info: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800',
    success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
  }
  return map[type] || map.info
}

const toastIcon = (type) => {
  const map = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️',
  }
  return map[type] || 'ℹ️'
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
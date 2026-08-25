<template>
  <Teleport to="body">
    <Transition name="auth-modal">
      <div v-if="show" class="fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto">
       
        <div class="flex items-center justify-center min-h-[calc(100vh-60px)] px-4 py-8">
          <div class="w-full max-w-md">
            <LoginPage :current-lang="currentLang" @success="close" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, inject } from 'vue'
import LoginPage from '../../views/auth/LoginPage.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  currentLang: {
    type: String,
    default: 'en',
  },
})

const emit = defineEmits(['update:show', 'close'])

const currentLang = inject('currentLang', ref('en'))

const close = () => {
  emit('update:show', false)
  emit('close')
}
</script>

<style>
.auth-modal-enter-active,
.auth-modal-leave-active {
  transition: opacity 0.2s ease;
}
.auth-modal-enter-from,
.auth-modal-leave-to {
  opacity: 0;
}
</style>

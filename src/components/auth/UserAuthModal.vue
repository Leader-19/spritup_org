<template>
  <Teleport to="body">
    <Transition name="auth-modal">
      <div
        v-if="show"
        class="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          class="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[5px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-6 sm:p-7 transition-all"
          role="dialog"
          aria-modal="true"
        >
          <!-- Close Button -->
          <button
            type="button"
            @click="close"
            class="absolute top-3 right-3 p-1.5 rounded-[5px] text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
            :aria-label="currentLang === 'en' ? 'Close dialog' : 'បិទផ្ទាំង'"
          >
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Header with Logo -->
          <div class="text-center mb-5">
            <div class="flex justify-center mb-3">
              <BrandLogo />
            </div>
            <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {{ activeTab === 'login'
                ? (currentLang === 'en' ? 'Welcome back to SPRITUP' : 'សូមស្វាគមន៍មកកាន់ SPRITUP')
                : (currentLang === 'en' ? 'Create your account' : 'បង្កើតគណនីថ្មី') }}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {{ activeTab === 'login'
                ? (currentLang === 'en' ? 'Sign in to access your library & quizzes' : 'ចូលដើម្បីប្រើប្រាស់បណ្ណាល័យ និងលំហាត់')
                : (currentLang === 'en' ? 'Join today for free legal resources' : 'ចូលរួមថ្ងៃនេះដើម្បីទទួលបានឯកសារច្បាប់ឥតគិតថ្លៃ') }}
            </p>
          </div>

          <!-- Tab Switcher -->
          <div class="grid grid-cols-2 p-1 mb-5 rounded-[5px] bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              type="button"
              @click="activeTab = 'login'"
              :class="[
                'py-2 rounded-[5px] transition-all',
                activeTab === 'login'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              ]"
            >
              {{ currentLang === 'en' ? 'Sign in' : 'ចូលគណនី' }}
            </button>
            <button
              type="button"
              @click="activeTab = 'register'"
              :class="[
                'py-2 rounded-[5px] transition-all',
                activeTab === 'register'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              ]"
            >
              {{ currentLang === 'en' ? 'Create account' : 'បង្កើតគណនី' }}
            </button>
          </div>

          <!-- Views -->
          <div v-show="activeTab === 'login'">
            <LoginPage
              :modal="true"
              :current-lang="currentLang"
              @success="handleSuccess"
              @switch-to-register="activeTab = 'register'"
            />
          </div>
          <div v-show="activeTab === 'register'">
            <RegisterPage
              :modal="true"
              :current-lang="currentLang"
              @success="handleSuccess"
              @switch-to-login="activeTab = 'login'"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, inject, watch, onMounted, onUnmounted } from 'vue'
import LoginPage from '../../views/auth/LoginPage.vue'
import RegisterPage from '../../views/auth/RegisterPage.vue'
import BrandLogo from '../navbar/BrandLogo.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  currentLang: {
    type: String,
    default: 'en',
  },
  initialTab: {
    type: String,
    default: 'login',
  },
})

const emit = defineEmits(['update:show', 'close', 'success'])

const currentLang = inject('currentLang', ref('en'))
const activeTab = ref(props.initialTab || 'login')

watch(() => props.initialTab, (val) => {
  if (val) activeTab.value = val
})

watch(() => props.show, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})

const handleSuccess = () => {
  emit('success')
  close()
}

const close = () => {
  emit('update:show', false)
  emit('close')
}
</script>

<style>
.auth-modal-enter-active,
.auth-modal-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.auth-modal-enter-from,
.auth-modal-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>

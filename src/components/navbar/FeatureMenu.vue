<template>
  <div class="-my-5 py-5" @mouseenter="handleEnter" @mouseleave="handleLeave">
    <button
      class="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white">
      {{ currentLang === 'en' ? 'Feature' : 'មុខងារ' }}
      <ChevronDown :size="14" :class="`transition-transform duration-300 ${open ? 'rotate-180' : ''}`" />
    </button>

    <div
      :class="`absolute inset-x-0 top-full z-[60] border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-out ${
        open ? 'visible translate-y-0' : 'invisible -translate-y-2'
      }`">
      <div class="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div class="flex items-center gap-3 text-sm">
          <span class="font-semibold text-gray-900 dark:text-white">{{ currentLang === 'en' ? 'Feature' : 'មុខងារ' }}</span>
          <router-link to="/documents" @click="open = false"
            class="flex items-center gap-1 text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
            {{ currentLang === 'en' ? 'All features' : 'មុខងារទាំងអស់' }}
            <ArrowRight :size="14" />
          </router-link>
        </div>
        <div class="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div v-for="column in columns" :key="column.title">
            <div class="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <component :is="icons[column.iconKey]" :size="18" :stroke-width="1.75" class="flex-shrink-0" />
              {{ currentLang === 'en' ? column.title : column.titleKh }}
            </div>
            <ul class="mt-4 space-y-3">
              <li v-for="link in column.links" :key="link.label">
                <router-link v-if="link.to" :to="link.to" @click="open = false"
                  class="text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                  {{ currentLang === 'en' ? link.label : link.labelKh }}
                </router-link>
                <button v-else @click="handleAction(link)"
                  class="text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                  {{ currentLang === 'en' ? link.label : link.labelKh }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MessageCircle, GraduationCap, HeartHandshake, CheckSquare, ChevronDown, ArrowRight } from 'lucide-vue-next'
import { featureColumns } from './featureLinks.js'

const props = defineProps({
  currentLang: {
    type: String,
    default: 'en',
  },
})

const emit = defineEmits(['action'])

const CLOSE_DELAY = 250
const open = ref(false)
let closeTimeout = null

function handleEnter() {
  if (closeTimeout) clearTimeout(closeTimeout)
  open.value = true
}

function handleLeave() {
  closeTimeout = setTimeout(() => (open.value = false), CLOSE_DELAY)
}

function handleAction(link) {
  open.value = false
  emit('action', link.key)
}

const icons = {
  chat: MessageCircle,
  training: GraduationCap,
  wellbeing: HeartHandshake,
  operations: CheckSquare,
}

const columns = featureColumns
</script>

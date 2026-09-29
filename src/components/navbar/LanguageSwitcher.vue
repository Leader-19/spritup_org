<template>
  <div class="relative" @mouseenter="open = true" @mouseleave="open = false">
    <button
      class="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
      {{ current.name }}
      <ChevronDown :size="14" class="text-gray-400 transition-transform duration-300" :class="open ? 'rotate-180' : ''" />
    </button>

    <div
      :class="`absolute right-0 top-full min-w-[160px] rounded-[5px] border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 py-2 shadow-lg transition-all duration-200 ease-out ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
      }`">
      <button v-for="lang in languages" :key="lang.code" @click="selectLang(lang.code)"
        :class="`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60 ${
          currentLang === lang.code ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
        }`">
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  currentLang: {
    type: String,
    default: 'en',
  },
})

const emit = defineEmits(['set-lang'])

const open = ref(false)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'kh', name: 'ភាសាខ្មែរ' },
]

const current = computed(() => languages.find((option) => option.code === props.currentLang) ?? languages[0])

const selectLang = (code) => {
  open.value = false
  emit('set-lang', code)
}
</script>

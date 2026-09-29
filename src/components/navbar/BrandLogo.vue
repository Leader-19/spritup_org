<script setup>
import { LOGO_PATH } from './logo-path.js'

defineProps({
  light: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div :class="['flex items-center gap-2.5', light ? 'text-white' : 'text-zinc-900 dark:text-white']">
    <svg v-if="light" width="28" height="28" viewBox="0 0 512 512" fill="#ffffff" class="shrink-0" aria-hidden="true">
      <path :d="LOGO_PATH" fill="#ffffff" fill-rule="evenodd" />
    </svg>
    <template v-else>
      <svg width="28" height="28" viewBox="0 0 512 512" fill="#0B0B0B" class="shrink-0 dark:hidden" aria-hidden="true">
        <path :d="LOGO_PATH" fill="#0B0B0B" fill-rule="evenodd" />
      </svg>
      <svg width="28" height="28" viewBox="0 0 512 512" fill="#ffffff" class="hidden shrink-0 dark:block" aria-hidden="true">
        <path :d="LOGO_PATH" fill="#ffffff" fill-rule="evenodd" />
      </svg>
    </template>
    <span class="hidden sm:inline text-lg font-bold tracking-tight">Spritup Center</span>
  </div>
</template>

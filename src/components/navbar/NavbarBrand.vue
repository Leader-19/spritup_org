<template>
  <div class="flex items-center gap-2">
    <button @click="$emit('toggle-sidebar-left')"
      class="lg:hidden shrink-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-gray-600 dark:text-gray-300"
      aria-label="Toggle navigation">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <a href="/" class="flex items-center gap-2">
      <img src="/logo.jpg" alt="SPRITUP Center Logo"
        class="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl object-contain shadow-md flex-shrink-0" />
      <!-- Text: hidden on mobile, visible on sm+ -->
      <div class="hidden sm:flex flex-col">
        <span class="font-display font-extrabold text-base lg:text-lg tracking-tight leading-tight">
          មជ្ឈមណ្ឌល
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400 leading-tight">
          SPRITUP
        </span>
      </div>
    </a>
  </div>
</template>

<script setup>
defineEmits(['toggle-sidebar-left'])
</script>

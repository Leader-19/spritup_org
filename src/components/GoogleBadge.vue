<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon-tabler-brand-google flex-shrink-0 text-zinc-500 dark:text-zinc-400"
    role="img"
    :aria-label="title"
  >
    <title>{{ title }}</title>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945" />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 16,
  },
  title: {
    type: String,
    default: 'Signed in with Google',
  },
})
</script>

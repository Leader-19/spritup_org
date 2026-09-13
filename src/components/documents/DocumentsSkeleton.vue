<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div
      v-for="i in 8"
      :key="i"
      class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col animate-pulse"
    >
      <div class="bg-gray-200 dark:bg-gray-700 h-48 w-full"></div>
      <div class="p-4 flex-1 flex flex-col gap-3">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div class="h-9 bg-gray-200 dark:bg-gray-700 rounded-xl mt-auto"></div>
      </div>
    </div>
  </div>
</template>
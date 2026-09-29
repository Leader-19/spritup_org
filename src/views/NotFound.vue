<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
    <div class="text-center max-w-7xl mx-auto">
      <div class="mx-auto w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
        <span class="text-4xl font-extrabold text-slate-300 dark:text-slate-600">404</span>
      </div>
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Page Not Found</h1>
      <p class="text-base text-slate-600 dark:text-slate-400 mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Go Home
      </router-link>
    </div>
  </div>
</template>
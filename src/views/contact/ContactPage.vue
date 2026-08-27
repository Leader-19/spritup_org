<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
    <div class="max-w-8xl mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
          {{ currentLang === 'en' ? 'Contact Us' : 'ទំនាក់ទំនងយើង' }}
        </h1>
        <p class="mt-3 text-gray-500 dark:text-gray-400">
          {{ currentLang === 'en' ? 'Get in touch with our team' : 'ទំនាក់ទំនងជាមួយក្រុមយើង' }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {{ currentLang === 'en' ? 'Send us a message' : 'ផ្ញើសារមកយើង' }}
          </h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                {{ currentLang === 'en' ? 'Name' : 'ឈ្មោះ' }}
              </label>
              <input type="text"
                class="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                {{ currentLang === 'en' ? 'Email' : 'អ៊ីមែល' }}
              </label>
              <input type="email"
                class="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                {{ currentLang === 'en' ? 'Message' : 'សារ' }}
              </label>
              <textarea rows="4"
                class="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 outline-none"></textarea>
            </div>
            <button type="submit"
              class="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-xl">
              {{ currentLang === 'en' ? 'Send Message' : 'ផ្ញើសារ' }}
            </button>
          </form>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {{ currentLang === 'en' ? 'Contact Information' : 'ព័ត៌មានទំនាក់ទំនង' }}
          </h2>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-brand-500 mt-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-gray-600 dark:text-gray-300">dinleader200@gmail.com</span>
            </div>
            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-brand-500 mt-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-gray-600 dark:text-gray-300">+855 98265667</span>
            </div>            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-brand-500 mt-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-gray-600 dark:text-gray-300">Sen Sokh, Pnhom Penh, Cambodia</span>
            </div>
            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-0.5" viewBox="0 0 24 24" fill="#229ED9">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.26-5.61 3.7-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 3.97-1.73 6.62-2.87 7.94-3.44 3.77-1.59 4.56-1.87 5.07-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .37z"/>
              </svg>
              <a href="https://t.me/Leader_DEV1" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-300 hover:text-[#229ED9] transition-colors">@Leader_DEV1</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const currentLang = inject('currentLang')
</script>
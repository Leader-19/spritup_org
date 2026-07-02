<template>
  <footer class="mt-2 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 glass">
    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <!-- <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div> -->
            <span class="font-display font-800 text-xl">SPRITUP Organization
            </span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ currentLang === 'en'
              ? 'Modern platform for building and scaling your digital presence with AI-powered tools.'
              : 'វេទិកាទំនើបសម្រាប់ការបង្កើតនិងពង្រីកវត្តមានឌីជីថលរបស់អ្នក។' }}
          </p>
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.name"
              class="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-brand-100 dark:hover:bg-brand-900/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer">
              <span v-html="social.icon" class="w-4 h-4"></span>
            </a>
          </div>
        </div>

        <!-- About Us -->
        <div>
          <h4 class="font-display font-semibold text-gray-900 dark:text-white mb-4">
            {{ currentLang === 'en' ? 'About Us' : 'អំពីយើង' }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in footerAbout" :key="link.en"
              class="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors">
              {{ currentLang === 'en' ? link.en : link.kh }}
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-display font-semibold text-gray-900 dark:text-white mb-4">
            {{ currentLang === 'en' ? 'Contact' : 'ទំនាក់ទំនង' }}
          </h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
                  dinleader200@gmail.com
            </li>
            <li class="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +855 98265667
            </li>
            <li class="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ currentLang === 'en' ? 'Mon–Fri, 9AM–6PM EST' : 'ច័ន្ទ–សុក្រ, 9AM–6PM' }}
            </li>
          </ul>
        </div>

        <!-- Location -->
        <div>
          <h4 class="font-display font-semibold text-gray-900 dark:text-white mb-4">
            {{ currentLang === 'en' ? 'Location' : 'ទីតាំង' }}
          </h4>
          <div class="space-y-3">
            <div class="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Sen Sokh, Pnhom Penh, Canbodia</span>
            </div>
            <!-- Mini Map Placeholder -->
            <div
              class="w-full h-28 rounded-xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/40 flex items-center justify-center relative">
              <div class="absolute inset-0 opacity-20"
                style="background-image: repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(99,102,241,0.3) 20px, rgba(99,102,241,0.3) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(99,102,241,0.3) 20px, rgba(99,102,241,0.3) 21px);">
              </div>
              <div class="relative z-10 text-center">
                <div class="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center mx-auto shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <p class="text-xs text-brand-600 dark:text-brand-400 font-medium mt-1">Pnhom Penh, Cambodia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-gray-400">
          © 2026 . {{ currentLang === 'en' ? 'All rights reserved.' : 'រក្សាសិទ្ធិគ្រប់យ៉ាង។' }}
        </p>
        <div class="flex gap-4 text-xs text-gray-400">
          <a class="hover:text-brand-500 cursor-pointer transition-colors">{{ currentLang === 'en' ? 'Privacy' :
            'ឯកជនភាព' }}</a>
          <a class="hover:text-brand-500 cursor-pointer transition-colors">{{ currentLang === 'en' ? 'Terms' :
            'លក្ខខណ្ឌ' }}</a>
          <a class="hover:text-brand-500 cursor-pointer transition-colors">{{ currentLang === 'en' ? 'Cookies' :
            'Cookies' }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  currentLang: String,
})

const socials = [
  { name: 'Twitter', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z"/></svg>' },
  { name: 'GitHub', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.91 1.186.092-.923.35-1.547.636-1.903-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>' },
  { name: 'LinkedIn', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.364c.43-.665 1.199-1.61 2.920-1.61 2.135 0 3.734 1.39 3.734 4.38v5.512zM5.337 9.432c-1.144 0-1.915-.758-1.915-1.71 0-.959.77-1.71 1.954-1.71 1.184 0 1.915.751 1.94 1.71 0 .952-.756 1.71-1.979 1.71zm1.581 11.02H3.656V9.806h3.262v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>' },
]

const footerAbout = [
  { en: 'Company', kh: 'ក្រុមហ៊ុន' },
  { en: 'Blog', kh: 'ម៉ាកបង្ហាញ' },
  { en: 'Careers', kh: 'អាជីវកម្ម' },
  { en: 'Press', kh: 'សារព័ត៌មាន' },
]
</script>

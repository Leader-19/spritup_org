<template>
  <footer class="mt-2 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 glass">
    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="space-y-4 lg:pr-6">
          <div class="flex items-center gap-2.5">
            <!-- <div
              class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div> -->
            <span class="font-display font-extrabold text-xl text-gray-900 dark:text-white">SPRITUP Center</span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            ជាឆ្អឹងខ្នងឌីជីថលដែលផ្ដល់អំណាចដល់ប្រជាពលរដ្ឋ សិស្ស និស្សិត
            និងអ្នកសិក្សាស្រាវតាមរយ:ចូលប្រើប្រាស់ទិន្នន័យអប់រំសម្រាប់សង្គម។
          </p>
        </div>

        <!-- About Us -->
        <div>
          <h4 class="font-display font-semibold text-gray-900 dark:text-white mb-4">
            {{ currentLang === 'en' ? 'About Us' : 'អំពីយើង' }}
          </h4>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
            <b>ចក្ខុវិស័យ៖ </b>មជ្ឈមណ្ឌល
            ចែលរំលែកចំណេះ ផ្ដល់ជាជំនួយ ភាពងាយស្រួលបំផុត ក្នុងការសិក្សា ស្វែងរក និងប្រើប្រាស់។
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            <b>បេសកកម្ម៖ </b> ប្រមូលផ្ដុំ បណ្ដុំឯកសារនៅកន្លែងមួយធ្វើឲ្យកាន់តែងាយស្រួល លឿន រហ័ស
            បានជាប្រយោជន៍ដល់អ្នកប្រើប្រាស។
          </p>
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
              spritup.center@gmail.com
            </li>
            <li class="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              078489153
            </li>
            <li class="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 text-brand-500 flex-shrink-0" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Sen Sokh, Phnom Penh, Cambodia</span>
            </li>
          </ul>

          <div class="flex items-center gap-3 mt-4">
            <a href="#" aria-label="Facebook"
              class="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245z" />
              </svg>
            </a>
            <a href="#" aria-label="Telegram"
              class="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-display font-semibold text-gray-900 dark:text-white mb-4">
            {{ currentLang === 'en' ? 'Donate US' : 'ផ្ដល់​ ការឧបត្ថម្ភគាំទ្រ' }}
          </h4>

          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
            យើងខ្ញុំទទួលការបរិច្ចាគតាមរយៈប្រព័ន្ធធនាគារដែលមានសុវត្ថិភាព និងងាយស្រួលបំផុត
          </p>

          <img src="../../public/qr-code.jpg" alt="">

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
</script>

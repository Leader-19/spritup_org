<template>
  <footer class="site-footer relative mt-auto overflow-hidden bg-zinc-950">
    <div class="h-px w-full bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

    <div class="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8">
      <router-link to="/" class="inline-flex text-white transition-opacity hover:opacity-90">
        <BrandLogo light />
      </router-link>

      <div class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div class="space-y-4 sm:col-span-2 lg:col-span-4">
          <p class="max-w-xs text-sm leading-relaxed text-zinc-400">
            ជាឆ្អឹងខ្នងឌីជីថលដែលផ្ដល់អំណាចដល់ប្រជាពលរដ្ឋ សិស្ស និស្សិត
            និងអ្នកសិក្សាស្រាវតាមរយ:ចូលប្រើប្រាស់ទិន្នន័យអប់រំសម្រាប់សង្គម។
          </p>
        </div>

        <div class="lg:col-span-3">
          <h3 class="text-sm font-semibold text-white">{{ currentLang === 'en' ? 'About Us' : 'អំពីយើង' }}</h3>
          <p class="mt-4 text-sm leading-relaxed text-zinc-400">
            <b class="text-zinc-300">{{ currentLang === 'en' ? 'Vision: ' : 'ចក្ខុវិស័យ៖ ' }}</b>មជ្ឈមណ្ឌល
            ចែលរំលែកចំណេះ ផ្ដល់ជាជំនួយ ភាពងាយស្រួលបំផុត ក្នុងការសិក្សា ស្វែងរក និងប្រើប្រាស់។
          </p>
          <p class="mt-3 text-sm leading-relaxed text-zinc-400">
            <b class="text-zinc-300">{{ currentLang === 'en' ? 'Mission: ' : 'បេសកកម្ម៖ ' }}</b>ប្រមូលផ្ដុំ បណ្ដុំឯកសារនៅកន្លែងមួយធ្វើឲ្យកាន់តែងាយស្រួល
            លឿន រហ័ស បានជាប្រយោជន៍ដល់អ្នកប្រើប្រាស។
          </p>
        </div>

        <div class="lg:col-span-3">
          <h3 class="text-sm font-semibold text-white">{{ currentLang === 'en' ? 'Contact' : 'ទំនាក់ទំនង' }}</h3>
          <ul class="mt-4 space-y-3">
            <li class="flex items-start gap-2.5 text-sm text-zinc-400">
              <Mail class="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
              <a href="mailto:spritup.center@gmail.com" class="transition-colors hover:text-white">spritup.center@gmail.com</a>
            </li>
            <li class="flex items-start gap-2.5 text-sm text-zinc-400">
              <Phone class="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
              <a href="tel:078489153" class="transition-colors hover:text-white">078 489 153</a>
            </li>
            <li class="flex items-start gap-2.5 text-sm text-zinc-400">
              <MapPin class="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
              <span>Sen Sokh, Phnom Penh, Cambodia</span>
            </li>
          </ul>

          <div class="mt-5 flex items-center gap-3">
            <a href="#" aria-label="Facebook"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-white hover:text-zinc-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245z" />
              </svg>
            </a>
            <a href="https://t.me/Leader_DEV1" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-white hover:text-zinc-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-2">
          <h3 class="text-sm font-semibold text-white">{{ currentLang === 'en' ? 'Donate Us' : 'ផ្ដល់​ ការឧបត្ថម្ភគាំទ្រ' }}</h3>
          <p class="mt-4 text-sm leading-relaxed text-zinc-400">
            យើងខ្ញុំទទួលការបរិច្ចាគតាមរយៈប្រព័ន្ធធនាគារដែលមានសុវត្ថិភាព និងងាយស្រួលបំផុត
          </p>
          <div class="mt-4 inline-block rounded-[5px] border border-zinc-700 bg-white p-2">
            <img src="/qr-code.jpg" alt="QR Code for Donation" class="h-24 w-24 rounded object-contain">
          </div>
        </div>
      </div>

      <div class="mt-14 flex flex-col items-start gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-zinc-500">
          © {{ new Date().getFullYear() }} Spritup Center. {{ currentLang === 'en' ? 'All rights reserved.' : 'រក្សាសិទ្ធិគ្រប់យ៉ាង។' }}
        </p>
        <div class="flex items-center gap-6 text-xs text-zinc-400">
          <a class="cursor-pointer underline-offset-2 transition-colors hover:text-white hover:underline">
            {{ currentLang === 'en' ? 'Privacy' : 'ឯកជនភាព' }}
          </a>
          <a class="cursor-pointer underline-offset-2 transition-colors hover:text-white hover:underline">
            {{ currentLang === 'en' ? 'Terms' : 'លក្ខខណ្ឌ' }}
          </a>
          <a class="cursor-pointer underline-offset-2 transition-colors hover:text-white hover:underline">Cookies</a>
        </div>
      </div>
    </div>

    <div
      aria-hidden="true"
      class="pointer-events-none select-none overflow-hidden whitespace-nowrap pb-2 text-center text-[16vw] font-bold leading-none text-zinc-900 sm:text-[9rem]">
      Spritup Center
    </div>
  </footer>
</template>

<script setup>
import { Mail, Phone, MapPin } from 'lucide-vue-next'
import BrandLogo from '../components/navbar/BrandLogo.vue'

defineProps({
  currentLang: String,
})
</script>

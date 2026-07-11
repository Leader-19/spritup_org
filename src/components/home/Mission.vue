<template>
  <div v-if="section === 'mission'" class="text-center">
    <h1 class="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-6">
      {{ currentLang === 'en' ? 'Our Mission' : 'បេសកកម្មរបស់យើង' }}
    </h1>
    <div class="mx-auto max-w-2xl">
      <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {{ currentLang === 'en'
          ? 'Our mission is to build an open, reliable, and user-friendly platform where everyone can freely explore official documents. We strive to digitize, categorize, and preserve legal knowledge for present and future generations.'
          : 'បេសកកម្មរបស់យើងគឺកសាងវេទិកាបើកចំហ អាចទុកចិត្តបាន និងងាយស្រួលប្រើប្រាស់ ដែលមនុស្សគ្រប់គ្នាអាចរុករកឯកសារផ្លូវការដោយសេរី។ យើងខិតខំធ្វើឱ្យឯកសារជាប់ទាក់ទងនឹងប្រព័ន្ធឌីជីថល រៀបចំប្រភេទ និងរក្សាទុកចំណេះដឹងផ្លូវការសម្រាប់ជំនាន់បច្ចុប្បន្ន និងអនាគត។' }}
      </p>
      <ul class="space-y-2 text-gray-600 dark:text-gray-300 list-none">
        <li>{{ currentLang === 'en' ? 'Provide free and open access to public documents.' : 'ផ្តល់ការចូលដំណើរការឯកសារសាធារណៈដោយឥតគិតថ្លៃ និងបើកចំហ។' }}</li>
        <li>{{ currentLang === 'en' ? 'Simplify search and discovery of legal information.' : 'ធ្វើឱ្យការស្វែងរក និងរកឃើញព័ត៌មានច្បាប់កាន់តែងាយស្រួល។' }}</li>
        <li>{{ currentLang === 'en' ? 'Support education and civic awareness.' : 'គាំទ្រការអប់រំ និងការយល់ដឹងពលរដ្ឋ។' }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  section: { type: String, default: '' },
})

const currentLang = inject('currentLang')
</script>
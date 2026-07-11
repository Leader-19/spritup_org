<template>
  <div v-if="section === 'vision'" class="text-center">
    <h1 class="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-6">
      {{ currentLang === 'en' ? 'Our Vision' : 'ទស្សនវិស័យរបស់យើង' }}
    </h1>
    <p class="text-gray-600 dark:text-gray-300 leading-relaxed mx-auto max-w-2xl">
      {{ currentLang === 'en'
        ? 'We envision a society where every citizen has equal access to the laws and policies that shape their lives. SPRITUP aims to become the leading digital archive of legal documents in the region, fostering transparency, accountability, and informed public participation.'
        : 'យើងមើលឃើញសង្គមមួយដែលពលរដ្ឋគ្រប់រូបមានការចូលដំណើរការស្មើភាពទៅនឹងច្បាប់ និងគោលនយោបាយដែលកំណត់ជីវិតរបស់ពួកគេ។ SPRITUP មានគោលបំណងក្លាយជាឃ្លាំងឯកសារឌីជីថលឈានមុខគេនៃឯកសារច្បាប់ក្នុងតំបន់ ដើម្បីលើកកម្ពស់តម្លាភាព ការទទួលខុសត្រូវ និងការចូលរួមរបស់សាធារណជនដោយប្រកបដោយការយល់ដឹង។' }}
    </p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  section: { type: String, default: '' },
})

const currentLang = inject('currentLang')
</script>
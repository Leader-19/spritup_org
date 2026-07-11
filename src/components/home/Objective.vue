<template>
  <div v-if="section === 'objective'" class="text-center">
    <h1 class="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-6">
      {{ currentLang === 'en' ? 'Our Objective' : 'គោលបំណងរបស់យើង' }}
    </h1>
    <div class="mx-auto max-w-2xl space-y-4">
      <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
        {{ currentLang === 'en'
          ? 'SPRITUP Organization is a non-profit initiative dedicated to making legal and public documents accessible to everyone. Our objective is to collect, organize, and share official documents—such as laws, decrees, conventions, and regulations—so that citizens, researchers, and professionals can easily find and understand them.'
          : 'SPRITUP Organization គឺជាគណៈកម្មាធិការក្រៅរដ្ឋាភិបាលមួយដែលប្ដេជ្ញាចិត្តធ្វើឱ្យឯកសារច្បាប់ និងឯកសារសាធារណៈអាចចូលដំណើរការបានសម្រាប់មនុស្សគ្រប់គ្នា។ គោលបំណងរបស់យើងគឺប្រមូល រៀបចំ និងចែករំលែកឯកសារផ្លូវការ—ដូចជាច្បាប់ អនុក្រឹត្យ អនុសញ្ញា និងបទប្បញ្ញត្តិ—ដើម្បីឱ្យពលរដ្ឋ អ្នកស្រាវជ្រាវ និងអ្នកជំនាញអាចស្វែងរក និងយល់ពីពួកវាបានយ៉ាងងាយស្រួល។' }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
        {{ currentLang === 'en'
          ? 'We believe that transparent access to information empowers communities and strengthens democracy. Through technology, we bridge the gap between complex legal frameworks and the people they serve.'
          : 'យើងជឿថា ការចូលដំណើរការព័ត៌មានប្រកបដោយតម្លាភាព ជួយពង្រឹងសិទ្ធិអំណាចដល់សហគមន៍ និងពង្រឹងលទ្ធិប្រជាធិបតេយ្យ។ តាមរយៈបច្ចេកវិទ្យា យើងជួយបំពេញគម្លាតរវាងក្របខ័ណ្ឌច្បាប់ស្មុគស្មាញ និងប្រជាជនដែលពួកគេបម្រើ។' }}
      </p>
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
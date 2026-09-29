<template>
  <div class="flex flex-col md:flex-row items-center gap-10 md:gap-16">
    <div class="flex-1 text-left">
      <h1 class="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
        {{ currentLang === 'en' ? 'Legal Resources Hub' : 'Spritup Center' }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {{ currentLang === 'en' ?
        'Your comprehensive source for Cambodian legal documents, laws, and regulations. We provide easy access to constitutional documents, statutes, and legal frameworks to help citizens, researchers, and legal professionals navigate the Cambodian legal system.' : 'រាល់សមិទ្ធផល និងការផ្លាស់ប្តូរជាវិជ្ជមានដែល SPRITUP បាននិងកំពុងបង្កើតឡើង គឺមិនអាចខ្វះបានឡើយនូវការចូលរួមចំណែកពីសប្បុរសជន និងដៃគូគាំទ្រដូចជាលោកអ្នក។ មិនថាការឧបត្ថម្ភនោះតិច ឬច្រើន ក្ដីស្រឡាញ់របស់អ្នកគឺជាកម្លាំងចលករដ៏សំខាន់ ក្នុងការជួយទ្រទ្រង់មជ្ឈមណ្ឌលរបស់យើង ឱ្យបន្តបេសកកម្មអភិវឌ្ឍយុវជន និងជួយសង្គ្រោះសហគមន៍បានកាន់តែទូលំទូលាយ។' }}
      </p>

      <div class="flex flex-wrap gap-4 mt-8">
        <router-link to="/documents"
          class="px-4 py-2 text-sm rounded-[5px] bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors inline-block">
          {{ currentLang === 'en' ? 'Browse Documents' : 'ស្វែងរកឯកសារ' }}
        </router-link>
        <router-link to="/contact"
          class="px-4 py-2 text-sm rounded-[5px] bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-block">
          {{ currentLang === 'en' ? 'Contact Us' : 'ទំនាក់ទំនងយើង' }}
        </router-link>
      </div>
    </div>

    <div class="flex-1 flex justify-center md:justify-end">
      <img src="/profile-removebg-preview.png" alt="SPRITUP"
        class="w-full max-w-md h-auto object-contain" />
    </div>
  </div>
</template>

<script setup>

defineProps({
  currentLang: { type: String, default: 'en' }
})
</script>
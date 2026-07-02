<template>
  <div class="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 glass border border-gray-100 dark:border-gray-700/50">
    <h1 class="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
      {{ currentLang === 'en' ? 'Legal Resources Hub' : 'កីយផ្សំឯកសារច្បាប់' }}
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
      {{ currentLang === 'en' ? 'Your comprehensive source for Cambodian legal documents, laws, and regulations. We provide easy access to constitutional documents, statutes, and legal frameworks to help citizens, researchers, and legal professionals navigate the Cambodian legal system.' : 'ស្វុងរឿងឯកសារច្បាប់កម្ពុជា ច្បាប់ និងបទបញ្ញត្តិ។ យើងបង្ហាញសម្រាប់ចូលរួតចិត្តច្បាប់ សន្ធិសញ្ញា និងការងារបណ្តាញដើម្បីជួយពលរដ្ឋ ការស្រាវជ្រាវ និងអ្នកវិភាគ។' }}
    </p>
    <div class="flex flex-wrap gap-4">
      <router-link to="/documents"
        class="px-6 py-3 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors inline-block">
        {{ currentLang === 'en' ? 'Browse Documents' : 'រុករកឯកសារ' }}
      </router-link>
      <router-link to="/contact"
        class="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-block">
        {{ currentLang === 'en' ? 'Contact Us' : 'ទំនាក់ទំនងយើង' }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentLang: { type: String, default: 'en' }
})
</script>
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
    <div class="max-w-8xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
          {{ currentLang === 'en' ? '💙 Support Our Work' : '💙 ជួយឧបសម្ពលការងាររបស់យើង' }}
        </h1>
        <p class="mt-3 text-gray-500 dark:text-gray-400">
          {{ currentLang === 'en' ? 'Your donation helps us maintain and improve this platform.' : 'ការជូនអរគុណរបស់អ្នកជួយយើងក្នុងការថែរក្សាបណ្ដាលគុណនិងការងារបង្កើនផលិតភាព។' }}
        </p>
      </div>

<!-- Donation Cards -->
       <div class="grid md:grid-cols-3 gap-6">

         <!-- Small -->
         <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition">
           <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ currentLang === 'en' ? 'Supporter' : 'អ្នកឧបសម្ពល' }}</h2>
           <p class="text-2xl font-bold mt-2">{{ currentLang === 'en' ? '$5' : '5$' }}</p>
           <p class="text-sm text-gray-500 mt-2">{{ currentLang === 'en' ? 'Buy us a coffee ☕' : 'ទិញកាក់ជូនអរគុណ ☕' }}</p>
           <button class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl">
             {{ currentLang === 'en' ? 'Donate' : 'ជូនអរគុណ' }}
           </button>
         </div>

         <!-- Medium -->
         <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-blue-500">
           <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ currentLang === 'en' ? 'Contributor' : 'អ្នកចូលរួម' }}</h2>
           <p class="text-2xl font-bold mt-2">{{ currentLang === 'en' ? '$15' : '15$' }}</p>
           <p class="text-sm text-gray-500 mt-2">{{ currentLang === 'en' ? 'Help us grow 🚀' : 'ជួយយើងរីកចម្រើន 🚀' }}</p>
           <button class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl">
             {{ currentLang === 'en' ? 'Donate' : 'ជូនអរគុណ' }}
           </button>
         </div>

         <!-- Large -->
         <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition">
           <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ currentLang === 'en' ? 'Sponsor' : 'អ្នកឧបសម្ពលសរីរស្តី' }}</h2>
           <p class="text-2xl font-bold mt-2">{{ currentLang === 'en' ? '$50' : '50$' }}</p>
           <p class="text-sm text-gray-500 mt-2">{{ currentLang === 'en' ? 'Support development ❤️' : 'ឧបសម្ពលការអភិវឌ្ឍ ❤️' }}</p>
           <button class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl">
             {{ currentLang === 'en' ? 'Donate' : 'ជូនអរគុណ' }}
           </button>
         </div>

       </div>

       <!-- Custom Donation -->
       <div class="mt-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
         <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
           {{ currentLang === 'en' ? 'Custom Amount' : 'ចំនួនផ្ទាល់ខ្លួន' }}
         </h2>

         <div class="flex gap-3">
           <input
             v-model="amount"
             type="number"
             :placeholder="currentLang === 'en' ? 'Enter amount' : 'បញ្ចូលចំនួន'"
             class="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 outline-none"
           />

           <button
             @click="handleDonate"
             class="bg-green-500 hover:bg-green-600 text-white px-6 rounded-xl"
           >
             {{ currentLang === 'en' ? 'Donate' : 'ជូនអរគុណ' }}
           </button>
         </div>
       </div>

       <!-- Payment Methods -->
       <div class="mt-10 text-center">
         <p class="text-gray-500 mb-3">{{ currentLang === 'en' ? 'We accept:' : 'យើងទទួលយក:' }}</p>

         <div class="flex justify-center gap-4 text-sm">
           <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg">Visa</span>
           <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg">MasterCard</span>
           <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg">PayPal</span>
         </div>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const currentLang = inject('currentLang')
const amount = ref('')

const handleDonate = () => {
  if (!amount.value || amount.value <= 0) {
    alert(currentLang.value === 'en' ? 'Please enter a valid amount' : 'សូមបញ្ចូលចំនួនដែលមានសុទ្ធតែ')
    return
  }

  alert(currentLang.value === 'en' ? `Thank you for donating $${amount.value}!` : `អរគុណសម្រាប់ការជូនអរគុណ $${amount.value}!`)
}
</script>
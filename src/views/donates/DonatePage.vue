<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl">
            💙
          </div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {{ currentLang === 'en' ? 'Support Our Mission' : 'ជួយគាំទ្របេសកកម្មរបស់យើង' }}
          </h1>
        </div>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {{ currentLang === 'en' 
            ? 'Every contribution helps us keep this platform free, updated, and growing.' 
            : 'រាល់ការរួមចំណែករបស់អ្នកជួយយើងរក្សាវេទិកានេះឥតគិតថ្លៃ ទាន់សម័យ និងកំពុងរីកចម្រើន។' }}
        </p>
      </div>

      <!-- Donation Tiers -->
      <div class="grid md:grid-cols-3 gap-8">

        <!-- Tier 1: Supporter -->
        <div class="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <div class="text-center">
            <div class="text-4xl mb-4">☕</div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {{ currentLang === 'en' ? 'Supporter' : 'អ្នកឧបត្ថម្ភ' }}
            </h2>
            <div class="mt-6">
              <span class="text-5xl font-bold text-gray-900 dark:text-white">$5</span>
            </div>
            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              {{ currentLang === 'en' ? 'Buy us a coffee' : 'ទិញកាហ្វេជូនយើង' }}
            </p>
          </div>

          <button 
            @click="selectTier(5)"
            class="mt-10 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-3.5 rounded-2xl transition">
            {{ currentLang === 'en' ? 'Donate $5' : 'ជូន 5$' }}
          </button>
        </div>

        <!-- Tier 2: Contributor (Popular) -->
        <div class="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-blue-500 scale-105">
          <!-- Popular Badge -->
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-6 py-1.5 rounded-full">
            {{ currentLang === 'en' ? 'MOST POPULAR' : 'ពេញនិយមបំផុត' }}
          </div>

          <div class="text-center">
            <div class="text-5xl mb-4">🚀</div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {{ currentLang === 'en' ? 'Contributor' : 'អ្នកចូលរួម' }}
            </h2>
            <div class="mt-6">
              <span class="text-6xl font-bold text-blue-600">$15</span>
            </div>
            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              {{ currentLang === 'en' ? 'Help us grow faster' : 'ជួយយើងរីកចម្រើនលឿន' }}
            </p>
          </div>

          <button 
            @click="selectTier(15)"
            class="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition shadow-lg shadow-blue-500/30">
            {{ currentLang === 'en' ? 'Donate $15' : 'ជូន 15$' }}
          </button>
        </div>

        <!-- Tier 3: Sponsor -->
        <div class="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <div class="text-center">
            <div class="text-4xl mb-4">❤️</div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {{ currentLang === 'en' ? 'Sponsor' : 'អ្នកឧបត្ថម្ភធំ' }}
            </h2>
            <div class="mt-6">
              <span class="text-5xl font-bold text-gray-900 dark:text-white">$50</span>
            </div>
            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              {{ currentLang === 'en' ? 'Support long-term development' : 'គាំទ្រការអភិវឌ្ឍរយៈពេលវែង' }}
            </p>
          </div>

          <button 
            @click="selectTier(50)"
            class="mt-10 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-3.5 rounded-2xl transition">
            {{ currentLang === 'en' ? 'Donate $50' : 'ជូន 50$' }}
          </button>
        </div>

      </div>

      <!-- Custom Amount -->
      <div class="mt-12 max-w-md mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center">
          <h3 class="font-semibold text-lg mb-4">
            {{ currentLang === 'en' ? 'Custom Amount' : 'ចំនួនផ្ទាល់ខ្លួន' }}
          </h3>
          
          <div class="flex items-center justify-center gap-3">
            <span class="text-3xl font-bold text-gray-400">$</span>
            <input 
              v-model="amount"
              type="number"
              placeholder="25"
              class="w-36 text-center text-5xl font-bold bg-transparent focus:outline-none dark:text-white"
            >
          </div>

          <button 
            @click="handleDonate"
            :disabled="!amount || amount <= 0"
            class="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-2xl transition disabled:opacity-50">
            {{ currentLang === 'en' ? 'Donate Custom Amount' : 'ជូនចំនួនផ្ទាល់ខ្លួន' }}
          </button>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup>
import { ref, inject } from 'vue'

const currentLang = inject('currentLang')
const amount = ref('')

const selectTier = (value) => {
  amount.value = value
  handleDonate()
}

const handleDonate = () => {
  if (!amount.value || amount.value <= 0) {
    alert(currentLang.value === 'en' ? 'Please enter a valid amount' : 'សូមបញ្ចូលចំនួនត្រឹមត្រូវ')
    return
  }

  // Here you can integrate payment gateway later
  alert(currentLang.value === 'en' 
    ? `Thank you so much for donating $${amount.value}! ❤️` 
    : `អរគុណអ្នកខ្លាំងណាស់សម្រាប់ការជូន $${amount.value}! ❤️`
  )
}
</script>

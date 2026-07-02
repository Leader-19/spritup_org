<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl mx-auto">
    <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white mb-8">
      {{ currentLang === 'en' ? 'Dashboard' : 'ផ្ទាំងគ្រប់គ្រង' }}
    </h1>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div 
        v-for="metric in metrics" 
        :key="metric.title"
        class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 dark:text-gray-400 text-sm">{{ currentLang === 'en' ? metric.title : metric.titleKh }}</span>
          <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', metric.color]">
            <span v-html="metric.icon" class="w-4 h-4 text-white"></span>
          </div>
        </div>
        <p class="font-display font-bold text-2xl text-gray-900 dark:text-white">{{ metric.value }}</p>
        <p class="text-xs text-green-500 mt-1 font-medium">{{ metric.change }}</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
        <h2 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">
          {{ currentLang === 'en' ? 'Recent Activity' : 'សកម្មភាពថ្មីៗ' }}
        </h2>
        <div class="space-y-3">
          <div 
            v-for="activity in activities" 
            :key="activity.action"
            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
            <div :class="['w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white', activity.color]">
              <span v-html="activity.icon" class="w-4 h-4"></span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                {{ currentLang === 'en' ? activity.action : activity.actionKh }}
              </p>
              <p class="text-xs text-gray-400">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
        <h2 class="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">
          {{ currentLang === 'en' ? 'Top Categories' : 'ប្រភេទកំពូល' }}
        </h2>
        <div class="space-y-3">
          <div v-for="cat in topCategories" :key="cat.name" class="space-y-1.5">
            <div class="flex justify-between text-sm">
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ cat.name }}</span>
              <span class="text-gray-500 dark:text-gray-400">{{ cat.pct }}%</span>
            </div>
            <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div 
                :style="{ width: cat.pct + '%' }"
                :class="['h-full rounded-full transition-all duration-700', cat.color]">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const currentLang = inject('currentLang')

const metrics = [
  { title: 'Total Users', titleKh: 'សរុបអ្នកប្រើ', value: '12.5K', change: '+5% from last week', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM15 20H9m6 0h6" /></svg>', color: 'bg-blue-500' },
  { title: 'Revenue', titleKh: 'ចំណូល', value: '$45.2K', change: '+12% from last week', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>', color: 'bg-green-500' },
  { title: 'Orders', titleKh: 'បញ្ជាទិញ', value: '324', change: '+8% from last week', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>', color: 'bg-orange-500' },
  { title: 'Growth', titleKh: 'ការរីកចម្រើន', value: '24.5%', change: '+3% from last week', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" text-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>', color: 'bg-purple-500' },
]

const activities = [
  { action: 'New user registered', actionKh: 'អ្នកប្រើឯកលេខថ្មីបានចុះឈ្មោះ', time: '2 hours ago', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>', color: 'bg-blue-500' },
  { action: 'Payment processed', actionKh: 'ការបង់ប្រាក់ដែលបានដំណើរការ', time: '4 hours ago', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>', color: 'bg-green-500' },
  { action: 'System update completed', actionKh: 'ការធ្វើបច្ចុប្បន្នភាពប្រព័ន្ធបានបញ្ចប់', time: '6 hours ago', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>', color: 'bg-purple-500' },
  { action: 'New project created', actionKh: 'គម្រោងថ្មីដែលបានបង្កើត', time: '8 hours ago', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>', color: 'bg-orange-500' },
  { action: 'Database backup completed', actionKh: 'ការបម្រុងទុកមូលដ្ឋានទិន្នន័យបានបញ្ចប់', time: '1 day ago', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" /></svg>', color: 'bg-pink-500' },
]

const topCategories = [
  { name: 'Electronics', pct: 45, color: 'bg-blue-500' },
  { name: 'Clothing', pct: 25, color: 'bg-purple-500' },
  { name: 'Food', pct: 20, color: 'bg-green-500' },
  { name: 'Others', pct: 10, color: 'bg-orange-500' },
]
</script>
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">Categories</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage document categories.</p>
          </div>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        <div v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead class="border-b text-xs uppercase text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3.5">ID</th>
                  <th class="px-6 py-3.5">Title</th>
                  <th class="px-6 py-3.5">Description</th>
                  <th class="px-6 py-3.5">Parent</th>
                  <th class="px-6 py-3.5">Documents</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="cat in categories" :key="cat.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td class="px-6 py-4 text-xs">{{ cat.id }}</td>
                  <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ cat.title }}</td>
                  <td class="px-6 py-4 text-xs">{{ cat.description || '-' }}</td>
                  <td class="px-6 py-4 text-xs">{{ cat.parent_id || '-' }}</td>
                  <td class="px-6 py-4 text-xs">{{ cat.documents_count || 0 }}</td>
                </tr>
                <tr v-if="!categories.length">
                  <td colspan="5" class="px-6 py-8 text-center text-sm text-gray-400">No categories found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'

const categories = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await apiClient.get('/admin/categories')
    categories.value = response.data.categories
  } catch (error) {
    console.error('Failed to load categories:', error)
  } finally {
    loading.value = false
  }
})
</script>

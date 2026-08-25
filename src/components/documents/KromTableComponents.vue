<template>
    <div class="p-6 bg-gray-100 dark:bg-gray-900">

        <div class="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-5">

            <!-- Header -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
                    ឯកសារ​ ទាំងអស់
                </h2>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table class="w-full text-sm">

                    <!-- THEAD -->
                    <thead class="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        <tr>
                            <th class="p-3 text-left">ID</th>
                            <th class="p-3 text-left">Name</th>
                            <th class="p-3 text-left">Title</th>
                            <th class="p-3 text-left">Category</th>
                            <th class="p-3 text-left">File</th>
                            <th class="p-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <!-- TBODY -->
                    <tbody>
                        <!-- Loading -->
                        <tr v-if="loading">
                            <td colspan="6" class="text-center p-4">Loading...</td>
                        </tr>

                        <!-- Error -->
                        <tr v-else-if="error">
                            <td colspan="6" class="text-center text-red-500 p-4">
                                {{ error }}
                            </td>
                        </tr>

                        <!-- Data -->
                        <tr v-else v-for="(document, index) in documents" :key="document.id"
                            class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <!-- ID -->
                            <td class="p-3 text-gray-800 dark:text-gray-200">
                                {{ document.id }}
                            </td>

                            <!-- Name -->
                            <td class="p-3 font-medium text-gray-800 dark:text-gray-200">
                                {{ document.doc_name }}
                            </td>

                            <!-- Title -->
                            <td class="p-3 text-gray-700 dark:text-gray-300 max-w-xs">
                                <div v-if="document.doc_title && document.doc_title.length > 50">
                                    <span v-if="!expandedRows.has(document.id)">
                                        {{ document.doc_title.slice(0, 50) }}...
                                    </span>
                                    <span v-else>
                                        {{ document.doc_title }}
                                    </span>
                                    <span class="text-brand-600 dark:text-brand-400 cursor-pointer hover:underline ml-1"
                                        @click="toggleRow(document.id)">
                                        {{ expandedRows.has(document.id) ? 'See less' : 'See more' }}
                                    </span>
                                </div>
                                <span v-else>{{ document.doc_title }}</span>
                            </td>

                            <!-- Category -->
                            <td class="p-3 text-gray-700 dark:text-gray-300">
                                {{ document.category?.title }}
                            </td>

                            <!-- File -->
                            <td class="p-3">
                                <button @click="viewDoc(document)"
                                    class="text-indigo-600 hover:underline">
                                    View
                                </button>
                            </td>

                            <!-- Date -->
                            <td class="p-3 text-gray-700 dark:text-gray-300">
                                {{ new Date(document.created_at).toLocaleDateString() }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
                <p>Rows per page: 10</p>

                <div class="flex gap-1">
                    <button
                        class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Prev
                    </button>
                    <button class="px-3 py-1 bg-indigo-600 text-white rounded">
                        1
                    </button>
                    <button
                        class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Next
                    </button>
                </div>
            </div>

        </div>
    </div>

    <DocumentViewer :visible="viewerVisible" :document="selectedDoc" @close="viewerVisible = false" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { API_URL } from '../../config/env'
import { normalizeCategories, flattenDocuments } from '../../utils/api.js'
import axios from 'axios'
import DocumentViewer from './DocumentViewer.vue'


const documents = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref(null)
const expandedRows = ref(new Set())
const selectedDoc = ref(null)
const viewerVisible = ref(false)

const viewDoc = (doc) => {
    selectedDoc.value = doc
    viewerVisible.value = true
}

const toggleRow = (id) => {
  const next = new Set(expandedRows.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  expandedRows.value = next
}

const fetchDocuments = async () => {
    loading.value = true
    error.value = null

    try {
        const res = await axios.get(`${API_URL}/api/documents`)

        // ✅ IMPORTANT (match your API)
        categories.value = normalizeCategories(res.data.categories)
        documents.value = flattenDocuments(categories.value)

    } catch (err) {
        error.value = err.message
        console.error(err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchDocuments()
})


</script>
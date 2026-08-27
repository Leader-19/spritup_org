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
                            <th class="p-3 text-left">Library</th>
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

                            <!-- Library -->
                            <td class="p-3">
                                <button v-if="auth.isAuthenticated" @click="toggleLibrary(document)"
                                    :class="['p-1.5 rounded-lg transition-colors',
                                        libraryIds.has(document.id) ? 'text-brand-600 hover:text-brand-700' : 'text-gray-400 hover:text-brand-600 dark:text-gray-500 dark:hover:text-brand-400']"
                                    :title="libraryIds.has(document.id) ? 'Remove from Library' : 'Add to Library'">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :fill="libraryIds.has(document.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </button>
                                <span v-else class="text-gray-300 dark:text-gray-600 text-xs">—</span>
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
import { useAuth } from '../../stores/auth.js'
import { useLibrary } from '../../composables/useLibrary.js'

const auth = useAuth()
const { libraryIds, fetchLibraryIds, toggleLibrary } = useLibrary()

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
    fetchLibraryIds()
})


</script>
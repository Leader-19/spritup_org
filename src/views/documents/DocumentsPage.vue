<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl mx-auto">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div class="flex items-center gap-4 flex-wrap">
        <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white">
          {{ currentLang === 'en' ? 'Documents' : 'ឯកសារ' }}
        </h1>

        <!-- Category Filter -->
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Items Per Page -->
        <div class="relative">
          <select v-model="itemsPerPage" @change="changeItemsPerPage"
            class="appearance-none pl-3 pr-8 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-brand-400/50">
            <option :value="10">{{ currentLang === 'en' ? '10 per page' : '១០ ក្នុងមួយទំព័រ' }}</option>
            <option :value="20">{{ currentLang === 'en' ? '20 per page' : '២០ ក្នុងមួយទំព័រ' }}</option>
            <option :value="30">{{ currentLang === 'en' ? '30 per page' : '៣០ ក្នុងមួយទំព័រ' }}</option>
            <option :value="40">{{ currentLang === 'en' ? '40 per page' : '៤០ ក្នុងមួយទំព័រ' }}</option>
            <option :value="50">{{ currentLang === 'en' ? '50 per page' : '៥០ ក្នុងមួយទំព័រ' }}</option>
            <option :value="100">{{ currentLang === 'en' ? '100 per page' : '១០០ ក្នុងមួយទំព័រ' }}</option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div class="relative w-full sm:w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input v-model="searchQuery" @input="handleSearchInput" type="text"
          :placeholder="currentLang === 'en' ? 'Search documents...' : 'ស្វែងរកឯកសារ...'"
          class="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-brand-400/50 transition" />
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Loading documents...' : 'កំពុងទាញឯកសារ...'
      }}</p>
    </div>

    <div v-else-if="!viewerOpen" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="doc in documents" :key="doc.id"
        class="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 glass border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow">
        <div class="flex items-start gap-3 mb-3">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 6h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-display font-semibold text-lg text-gray-900 dark:text-white truncate">{{ doc.doc_name }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ doc.category?.title }}</p>
          </div>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{{ doc.description }}</p>
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{{ formatDate(doc.created_at) }}</span>
          <button @click="viewDocument(doc)"
            class="px-3 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ currentLang === 'en' ? 'View' : 'មើល' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading && !viewerOpen" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'No documents found' : 'រកមិនឃីញឯកសារ' }}
      </p>
  </div>

  <div v-if="pagination.last_page > 1" class="flex justify-center mt-8">
    <div class="flex items-center gap-2">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
        :class="['px-3 py-1 rounded-lg', currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800']">
        {{ currentLang === 'en' ? 'Previous' : 'មុន' }}
      </button>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ currentPage }} / {{ pagination.last_page }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === pagination.last_page"
        :class="['px-3 py-1 rounded-lg', currentPage === pagination.last_page ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800']">
        {{ currentLang === 'en' ? 'Next' : 'បន្ទាប់' }}
      </button>
    </div>
  </div>

  <!-- INLINE FULL VIEW (does NOT affect sidebar/navbar) -->
  <transition name="fade">
    <div v-if="viewerOpen"
      class="relative w-full h-[calc(100vh-140px)] mt-4 bg-black rounded-xl overflow-hidden border">
      <!-- Header -->
      <div class="flex items-center justify-between p-3 bg-gray-900 text-white">
        <h3 class="font-semibold truncate">
          {{ viewingDoc?.doc_name }}
        </h3>

        <button @click="closeViewer" class="p-2 hover:bg-gray-800 rounded">
          ✕
        </button>
      </div>

      <!-- Viewer Body -->
      <div class="h-[calc(100vh-200px)] w-full bg-white">
        <!-- PDF -->
        <iframe v-if="fileExt === 'pdf'" :src="fileUrl" class="w-full h-full border-0">
        </iframe>

        <!-- Image -->
        <div v-else-if="['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExt)"
          class="w-full h-full flex items-center justify-center">
          <img :src="fileUrl" class="max-h-full max-w-full object-contain" />
        </div>

        <!-- DOCX HTML -->
        <iframe v-else-if="isHtmlContent" :srcdoc="documentContent" class="w-full h-full border-0">
        </iframe>

        <!-- Text -->
        <pre v-else-if="documentContent" class="p-6 text-sm h-full overflow-auto">
{{ documentContent }}
      </pre>

        <!-- Fallback -->
        <div v-else class="flex items-center justify-center h-full text-gray-500">
          No preview available
        </div>

      </div>
    </div>
  </transition>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { API_BASE, API_URL } from '../../config/env.js'

const currentLang = inject('currentLang')
const route = useRoute()

const documents = ref([])
const categories = ref([])
const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const viewerOpen = ref(false)
const viewingDoc = ref(null)
const documentContent = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0
})

const fileExt = computed(() => {
  return viewingDoc.value?.doc_upload?.split('.').pop()?.toLowerCase()
})

const isHtmlContent = computed(() => {
  return documentContent.value && documentContent.value.includes('<')
})

const fileUrl = computed(() => {
  if (!viewingDoc.value?.doc_upload) return ''

  return `${API_URL}/storage/${viewingDoc.value.doc_upload}`
})

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE}/categories`)
    if (response.data.status === 'success') {
      categories.value = response.data.categories || []
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const fetchDocuments = async (page = 1) => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/documents`, {
      params: {
        page: page,
        per_page: itemsPerPage.value,
        search: searchQuery.value,
        category_id: selectedCategory.value || undefined
      }
    })
    if (response.data.status === 'success') {
      documents.value = response.data.documents || []
      pagination.value = response.data.pagination || {
        current_page: 1,
        last_page: 1,
        per_page: itemsPerPage.value,
        total: (response.data.documents || []).length
      }
      currentPage.value = pagination.value.current_page
    }
  } catch (error) {
    console.error('Error fetching documents:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'km-KH')
}

const viewDocument = async (doc) => {
  viewingDoc.value = doc
  viewerOpen.value = true
  documentContent.value = ''

  if (fileExt.value === 'docx') {
    try {
      const response = await axios.get(`${API_BASE}/documents/${doc.id}/content`)
      documentContent.value = response.data.content || ''
    } catch (error) {
      console.error('Error fetching document content:', error)
      documentContent.value = currentLang.value === 'en' ? 'Content extraction failed: ' + error.message : 'រកមិនអាចទាញយកមាតិកានេះ: ' + error.message
    }
  }
}

const closeViewer = () => {
  viewerOpen.value = false
  viewingDoc.value = null
  documentContent.value = ''
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    fetchDocuments(page)
  }
}

const changeItemsPerPage = () => {
  currentPage.value = 1
  fetchDocuments(1)
}

const handleSearchInput = () => {
  currentPage.value = 1
  fetchDocuments(1)
}

const handleCategoryChange = () => {
  currentPage.value = 1
  fetchDocuments(1)
}

onMounted(() => {
  fetchCategories()
  const catId = route.query.category
  if (catId) {
    selectedCategory.value = catId
  }
  fetchDocuments()
})

watch(() => route.query.category, (newVal) => {
  selectedCategory.value = newVal || ''
  if (newVal) {
    fetchDocuments()
  }
})
</script>

<style scoped>
#download {
  display: none !important;
}

#print {
  display: none !important;
}

#secondaryDownload {
  display: none !important;
}
</style>
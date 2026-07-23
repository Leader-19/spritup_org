<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl ml-auto">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div class="flex items-center gap-4 flex-wrap">
        <h1 class="font-display font-bold text-2xl text-gray-900 dark:text-white">
          {{ currentLang === 'en' ? 'Documents' : 'ឯកសារ' }}
        </h1>

        <button @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'"
          class="px-3 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          {{ viewMode === 'grid' ? (currentLang === 'en' ? 'List View' : 'ទិដ្ឋភាពបញ្ជី') : (currentLang === 'en' ? 'Card View' : 'ទិដ្ឋភាពកាត') }}
        </button>

        <select v-model="itemsPerPage" @change="changeItemsPerPage"
          class="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 outline-none">
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">{{ currentLang === 'en' ? `${opt} per page` : `${opt} ក្នុងមួយទំព័រ` }}</option>
        </select>
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

    <div v-else-if="!viewerOpen && viewMode === 'grid' && paginatedDocuments.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="doc in paginatedDocuments" :key="doc.id"
        class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col cursor-pointer"
        @click="viewDocument(doc)">
        <div class="relative bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          <img v-if="doc.image" :src="docImage(doc)" :alt="doc.doc_name" class="block w-full h-auto" />
          <div v-else class="w-full h-48 flex items-center justify-center text-gray-400 text-sm">No image</div>
        </div>
        <div class="p-4 flex-1 flex flex-col min-h-0">
          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">{{ doc.doc_name }}</h3>
          <!-- <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ getCategoryLabel(doc.categoryTitle) }}</p> -->
          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ doc.description }}</p>
          <span class="mt-4 w-full py-2 rounded-xl bg-brand-600 text-white text-sm font-medium text-center hover:bg-brand-700 transition-colors">View Document</span>
        </div>
      </div>
    </div>

    <div v-else-if="!viewerOpen && viewMode === 'list' && paginatedDocuments.length" class="space-y-3">
      <div v-for="doc in paginatedDocuments" :key="doc.id" @click="viewDocument(doc)"
        class="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
        <div class="w-40 h-40 rounded-xl bg-gray-100 dark:bg-gray-700 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <img v-if="doc.image" :src="docImage(doc)" :alt="doc.doc_name" class="max-w-full max-h-full object-contain" />
          <div v-else class="text-gray-400 text-xs">No image</div>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{{ doc.doc_name }}</h3>
          <!-- <p class="text-gray-600 dark:text-gray-400">{{ getCategoryLabel(doc.categoryTitle) }}</p> -->
          <p class="text-gray-500 dark:text-gray-500 line-clamp-1">{{ doc.description }}</p>
        </div>
        <span class="px-4 py-2 bg-brand-600 text-white rounded-xl whitespace-nowrap hover:bg-brand-700 transition-colors">View</span>
      </div>
    </div>

    <div v-if="!loading && !viewerOpen && !filteredDocuments.length" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'No documents found' : 'រកមិនឃីញឯកសារ'
      }}</p>
    </div>

    <div v-if="!viewerOpen && filteredDocuments.length" class="flex items-center justify-end gap-3 mt-6">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700']">
        {{ currentLang === 'en' ? 'Previous' : 'មុន' }}
      </button>

      <span class="text-sm text-gray-600 dark:text-gray-400">
        {{ currentLang === 'en' ? 'Page' : 'ទំព័រ' }} {{ currentPage }} / {{ totalPages }} ({{ filteredDocuments.length }} {{ currentLang === 'en' ? 'total' : 'សរុប' }})
      </span>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
        :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700']">
        {{ currentLang === 'en' ? 'Next' : 'បន្ទាប់' }}
      </button>
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
import { normalizeCategories } from '../../utils/api.js'

const currentLang = inject('currentLang')
const route = useRoute()

const rawCategories = ref([])
const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const viewerOpen = ref(false)
const viewingDoc = ref(null)
const documentContent = ref('')
const viewMode = ref('grid')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const perPageOptions = [10, 20, 30, 40, 50, 100]

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

const allDocuments = computed(() => {
  const docs = []
  const collectDocuments = (categories) => {
    for (const cat of categories) {
      for (const doc of (cat.documents || [])) {
        docs.push({
          ...doc,
          categoryId: cat.id,
          categoryTitle: cat.title,
        })
      }
      // Laravel serializes `subCategories` as `sub_categories` in JSON.
      // Without this, documents in child categories never reach the listing.
      collectDocuments(cat.sub_categories || cat.subcategories || cat.children || [])
    }
  }
  collectDocuments(rawCategories.value)
  return docs
})

const filteredDocuments = computed(() => {
  let docs = [...allDocuments.value]

  if (selectedCategory.value) {
    docs = docs.filter(d => String(d.categoryId) === String(selectedCategory.value))
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    docs = docs.filter(d =>
      ((d.doc_name || '')).toLowerCase().includes(q) ||
      ((d.doc_title || '')).toLowerCase().includes(q) ||
      ((d.description || '')).toLowerCase().includes(q)
    )
  }

  return docs
})

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredDocuments.value.slice(start, end)
})

const fetchDocuments = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/documents`)
    if (response.data.status === 'success') {
      rawCategories.value = normalizeCategories(response.data.categories)
    } else {
      console.warn('Unexpected documents API response:', response.data)
    }
  } catch (error) {
    console.error('Error fetching documents:', error)
  } finally {
    loading.value = false
  }
}

const docImage = (doc) => {
  if (!doc.image) return ''
  return `${API_URL}/storage/${doc.image}`
}

const getCategoryLabel = (title) => {
  const map = {
    'រដ្ឋធម្មនុញ្ញ': 'Constitution',
    'សន្ធិសញ្ញា អនុសញ្ញា កតិកាសញ្ញា': 'Treaty/Convention/Pact',
    'ក្រម': 'Krom',
    'ច្បាប់': 'Law',
    'ព្រះរាជក្រម': 'Preah Reachokram',
    'ព្រះរាជក្រឹត្យ': 'Royal Decree',
    'អនុក្រឹត្យ': 'Sub-Decree',
    'ប្រកាស': 'Brakeas',
    'ដីកា': 'Deyka',
  }
  return map[title] || title
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

const totalPages = computed(() => Math.max(1, Math.ceil(filteredDocuments.value.length / itemsPerPage.value)))

const goToPage = (page) => {
  currentPage.value = Math.max(1, Math.min(page, totalPages.value))
}

const handleSearchInput = () => {
  currentPage.value = 1
}

const handleCategoryChange = () => {
  currentPage.value = 1
}

const changeItemsPerPage = () => {
  currentPage.value = 1
}

onMounted(() => {
  const catId = route.query.category
  if (catId) {
    selectedCategory.value = catId
  }
  const search = route.query.search
  if (search) {
    searchQuery.value = search
  }
  fetchDocuments()
})

watch(() => route.query.category, (newVal) => {
  selectedCategory.value = newVal || ''
  currentPage.value = 1
})

watch(() => route.query.search, (newVal) => {
  searchQuery.value = newVal || ''
  currentPage.value = 1
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

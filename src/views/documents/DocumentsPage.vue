<template>
  <div class="px-4 md:px-6 lg:px-10 py-8 max-w-8xl ml-auto">
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="font-display font-bold text-2xl text-gray-900 dark:text-white">
          {{ currentLang === 'en' ? 'Documents' : 'ឯកសារ' }}
        </h1>

        <button @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'"
          class="px-3 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          {{ viewMode === 'grid' ? (currentLang === 'en' ? 'List View' : 'ទិដ្ឋភាពបញ្ជី') : (currentLang === 'en' ? 'Card View' : 'ទិដ្ឋភាពកាត') }}
        </button>

        <select v-model="sortBy"
          class="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 outline-none">
          <option value="newest">{{ currentLang === 'en' ? 'Newest first' : 'ថ្មីបំផុត' }}</option>
          <option value="oldest">{{ currentLang === 'en' ? 'Oldest first' : 'ចាស់បំផុត' }}</option>
          <option value="title_asc">{{ currentLang === 'en' ? 'Title A-Z' : 'ចំណងជើង A-Z' }}</option>
          <option value="title_desc">{{ currentLang === 'en' ? 'Title Z-A' : 'ចំណងជើង Z-A' }}</option>
          <option value="category">{{ currentLang === 'en' ? 'By category' : 'តាមប្រភេទ' }}</option>
        </select>

        <select v-model="itemsPerPage" @change="changeItemsPerPage"
          class="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 outline-none">
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">{{ currentLang === 'en' ? `${opt} per page` : `${opt} ក្នុងមួយទំព័រ` }}</option>
        </select>
      </div>

      <div class="relative w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input v-model="searchQuery" @input="onSearchInput" @keyup.enter="handleSearch" type="text"
          :placeholder="currentLang === 'en' ? 'Search documents...' : 'ស្វែងរកឯកសារ...'"
          class="w-full pl-9 pr-10 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-brand-400/50 transition" />
        <button v-if="searchQuery" @click="clearSearch"
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Loading documents...' : 'កំពុងទាញឯកសារ...'
      }}</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      <div v-for="i in 8" :key="i" class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col animate-pulse">
        <div class="bg-gray-200 dark:bg-gray-700 h-48 w-full"></div>
        <div class="p-4 flex-1 flex flex-col gap-3">
          <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl mt-auto"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-red-400" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
        {{ currentLang === 'en' ? 'Something went wrong' : 'មានបញ្ហាមួយផង' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
        {{ currentLang === 'en' ? 'Failed to load documents. Please try again later.' : 'មិនអាចទាញយកឯកសារ។ សូមព្យាយាមម្តងទៀត។' }}
      </p>
      <button @click="fetchDocuments"
        class="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
        {{ currentLang === 'en' ? 'Retry' : 'ព្យាយាមម្តងទៀត' }}
      </button>
    </div>

    <div v-else-if="!viewerOpen && viewMode === 'grid' && paginatedDocuments.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      <div v-for="doc in paginatedDocuments" :key="doc.id"
        class="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col cursor-pointer"
        @click="viewDocument(doc)">
        <div class="relative bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          <img v-if="doc.image" :src="docImage(doc)" :alt="doc.doc_name" class="block w-full h-auto" />
          <div v-else class="w-full h-48 flex items-center justify-center text-gray-400 text-sm">No image</div>
          <button v-if="auth.isAuthenticated" @click.stop="toggleLibrary(doc)"
            :class="['absolute top-2 right-2 p-2 rounded-full transition-colors shadow-sm',
              libraryIds.has(doc.id) ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-white/90 dark:bg-gray-800/90 text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400']"
            :title="libraryIds.has(doc.id) ? 'Remove from Library' : 'Add to Library'">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :fill="libraryIds.has(doc.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>
        </div>
        <div class="p-4 flex-1 flex flex-col min-h-0">
          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-1"
            :class="isExpanded(doc.id) ? '' : 'line-clamp-1'">
            {{ doc.doc_name }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300"
            :class="isExpanded(doc.id) ? '' : 'line-clamp-2'">
            {{ doc.description }}
          </p>
          <span class="mt-2 text-xs text-brand-600 dark:text-brand-400 cursor-pointer hover:underline"
            @click.stop="toggleExpand(doc.id)">
            {{ isExpanded(doc.id) ? (currentLang === 'en' ? 'See less' : 'បង្កត់') : (currentLang === 'en' ? 'See more' : 'មើលបន្ថែម') }}
          </span>
          <span class="mt-4 w-full py-2 rounded-xl bg-brand-600 text-white text-sm font-medium text-center hover:bg-brand-700 transition-colors">View Document</span>
        </div>
      </div>
    </div>

    <div v-else-if="!viewerOpen && viewMode === 'list' && paginatedDocuments.length" class="space-y-3">
      <div v-for="doc in paginatedDocuments" :key="doc.id" @click="viewDocument(doc)"
        class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
        <div class="w-full sm:w-40 h-32 sm:h-40 rounded-xl bg-gray-100 dark:bg-gray-700 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <img v-if="doc.image" :src="docImage(doc)" :alt="doc.doc_name" class="max-w-full max-h-full object-contain" />
          <div v-else class="text-gray-400 text-xs">No image</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white"
              :class="isExpanded(doc.id) ? '' : 'line-clamp-1'">
              {{ doc.doc_name }}
            </h3>
            <button v-if="auth.isAuthenticated" @click.stop="toggleLibrary(doc)"
              :class="['p-1.5 rounded-lg transition-colors flex-shrink-0',
                libraryIds.has(doc.id) ? 'text-brand-600 hover:text-brand-700' : 'text-gray-400 hover:text-brand-600 dark:text-gray-500 dark:hover:text-brand-400']"
              :title="libraryIds.has(doc.id) ? 'Remove from Library' : 'Add to Library'">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :fill="libraryIds.has(doc.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
          </div>
          <p class="text-gray-500 dark:text-gray-500"
            :class="isExpanded(doc.id) ? '' : 'line-clamp-1'">
            {{ doc.description }}
          </p>
          <span class="text-xs text-brand-600 dark:text-brand-400 cursor-pointer hover:underline"
            @click.stop="toggleExpand(doc.id)">
            {{ isExpanded(doc.id) ? (currentLang === 'en' ? 'See less' : 'បង្កត់') : (currentLang === 'en' ? 'See more' : 'មើលបន្ថែម') }}
          </span>
        </div>
        <span class="px-4 py-2 bg-brand-600 text-white rounded-xl whitespace-nowrap hover:bg-brand-700 transition-colors">View</span>
      </div>
    </div>

    <div v-if="!loading && !viewerOpen && !filteredDocuments.length" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
        {{ currentLang === 'en' ? 'No documents found' : 'រកមិនឃីញឯកសារ' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        {{ searchQuery.trim()
          ? (currentLang === 'en' ? 'Try adjusting your search terms or browse a different category.' : 'សាកល្បងប្តូរពាក្យស្វែងរក ឬរកដូចគ្នាក្នុងប្រភេទផ្សេង។')
          : (currentLang === 'en' ? 'No documents are available in this category yet.' : 'មិនមានឯកសារនៅក្នុងប្រភេទនេះទេ។')
        }}
      </p>
      <router-link v-if="searchQuery.trim()" to="/documents"
        class="mt-4 inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
        {{ currentLang === 'en' ? 'Clear Search' : 'លុបការស្វែងរក' }}
      </router-link>
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

        <div class="flex items-center gap-1">
          <button v-if="auth.isAuthenticated && viewingDoc" @click="toggleLibrary(viewingDoc)"
            :class="['p-2 rounded transition-colors',
              libraryIds.has(viewingDoc?.id) ? 'text-brand-400 hover:text-brand-300' : 'text-gray-400 hover:text-brand-400']"
            :title="libraryIds.has(viewingDoc?.id) ? 'Remove from Library' : 'Add to Library'">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :fill="libraryIds.has(viewingDoc?.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>
          <button @click="closeViewer" class="p-2 hover:bg-gray-800 rounded">
            ✕
          </button>
        </div>
      </div>

      <!-- Viewer Body -->
      <div class="h-[calc(100vh-200px)] w-full bg-white">
        <!-- PDF -->
        <iframe v-if="fileExt === 'pdf'" :src="fileUrl" class="w-full h-full border-0"></iframe>

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
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'
import { API_URL } from '../../config/env.js'
import { normalizeCategories } from '../../utils/api.js'
import { useAuth } from '../../stores/auth.js'
import { useToast } from '../../composables/useToast.js'


const currentLang = inject('currentLang')
const router = useRouter()
const route = useRoute()
const { success: toastSuccess, error: toastError } = useToast()
const auth = useAuth()
const libraryIds = ref(new Set())

const rawCategories = ref([])
const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const viewerOpen = ref(false)
const viewingDoc = ref(null)
const documentContent = ref('')
const viewMode = ref('grid')
const sortBy = ref('newest')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const perPageOptions = [10, 20, 30, 40, 50, 100]
const error = ref(null)
let searchTimer = null

// Library helpers
const fetchLibraryIds = async () => {
  if (!auth.isAuthenticated) return
  try {
    const response = await apiClient.get('/library')
    const items = response.data.data || []
    libraryIds.value = new Set(items.map(item => item.id || item.document_id))
  } catch (err) {
    console.error('Failed to fetch library:', err)
  }
}

const toggleLibrary = async (doc) => {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }
  const isInLibrary = libraryIds.value.has(doc.id)
  try {
    if (isInLibrary) {
      await apiClient.delete(`/library/${doc.id}`)
      libraryIds.value.delete(doc.id)
      toastSuccess(currentLang.value === 'en' ? 'Removed from library' : 'បានលុបពីបណ្ណាល័យ')
    } else {
      await apiClient.post('/library', { document_id: doc.id })
      libraryIds.value.add(doc.id)
      toastSuccess(currentLang.value === 'en' ? 'Added to library' : 'បានបន្ថែមទៅបណ្ណាល័យ')
    }
  } catch (err) {
    toastError(err.response?.data?.message || (currentLang.value === 'en' ? 'Failed to update library' : 'បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពបណ្ណាល័យ'))
  }
}

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

const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
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
      ((d.description || '')).toLowerCase().includes(q) ||
      ((d.categoryTitle || '')).toLowerCase().includes(q) ||
      ((d.doc_code || '')).toLowerCase().includes(q) ||
      ((d.keywords || '')).toLowerCase().includes(q)
    )
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'oldest':
      docs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      break
    case 'title_asc':
      docs.sort((a, b) => (a.doc_title || '').localeCompare(b.doc_title || ''))
      break
    case 'title_desc':
      docs.sort((a, b) => (b.doc_title || '').localeCompare(a.doc_title || ''))
      break
    case 'category':
      docs.sort((a, b) => (a.categoryTitle || '').localeCompare(b.categoryTitle || ''))
      break
    default: // newest
      docs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
  }

  return docs
})

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredDocuments.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredDocuments.value.length / itemsPerPage.value))
})

const fetchDocuments = async () => {
  loading.value = true
  error.value = null
  try {
    const auth = useAuth()
    const endpoint = auth.isAuthenticated ? '/my-documents' : '/documents/preview'
    const response = await apiClient.get(endpoint)
    if (response.data.status === 'success') {
      rawCategories.value = normalizeCategories(response.data.categories)
    } else {
      console.warn('Unexpected documents API response:', response.data)
      error.value = 'Unexpected response from server'
    }
  } catch (err) {
    console.error('Error fetching documents:', err)
    error.value = err.message || 'Failed to load documents'
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
      const response = await apiClient.get(`/documents/${doc.id}/content`)
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

const expandedDocs = ref(new Set())

const toggleExpand = (docId) => {
  const next = new Set(expandedDocs.value)
  if (next.has(docId)) {
    next.delete(docId)
  } else {
    next.add(docId)
  }
  expandedDocs.value = next
}

const isExpanded = (docId) => expandedDocs.value.has(docId)

const goToPage = (page) => {
  currentPage.value = Math.max(1, Math.min(page, totalPages.value))
}

const handleSearch = () => {
  currentPage.value = 1
  router.push({ query: { ...route.query, search: searchQuery.value.trim() || undefined } })
}

const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
  router.push({ query: { ...route.query, search: undefined } })
}

const onSearchInput = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    const q = searchQuery.value.trim()
    router.push({ query: { ...route.query, search: q || undefined } })
  }, 400)
}

const handleCategoryChange = () => {
  currentPage.value = 1
}

const changeItemsPerPage = () => {
  currentPage.value = 1
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && viewerOpen.value) {
    closeViewer()
  }
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
  fetchLibraryIds()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
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

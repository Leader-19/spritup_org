<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
    <DocumentsHeader :current-lang="currentLang" :loading="loading" :count="filteredDocuments.length"
      :search-query="searchQuery" :current-category="currentCategoryObj" :get-category-label="getCategoryLabel"
      @update:search-query="searchQuery = $event" @search="handleSearch" @clear-search="clearSearch"
      @clear-category="clearCategoryFilter" />

    <DocumentsControls :current-lang="currentLang" :view-mode="viewMode" :sort-by="sortBy"
      :items-per-page="itemsPerPage" :per-page-options="perPageOptions" @update:view-mode="viewMode = $event"
      @update:sort-by="sortBy = $event" @update:items-per-page="changeItemsPerPage($event)" />

    <GuestCtaBanner v-if="!auth.isAuthenticated" :current-lang="currentLang" @register="openAuth('register')"
      @login="openAuth('login')" />

    <FreePlanBanner v-else-if="isFreePlan" :current-lang="currentLang" :limit="documentsPerCategoryLimit" />

    <DocumentsSkeleton v-if="loading" />

    <DocumentsError v-else-if="error" :current-lang="currentLang" @retry="fetchDocuments" />

    <DocumentCardGrid v-else-if="!viewerOpen && viewMode === 'grid' && paginatedDocuments.length"
      :documents="paginatedDocuments" :current-lang="currentLang" :is-authenticated="auth.isAuthenticated"
      :library-ids="libraryIds" :is-expanded="isExpanded" :format-date="formatDate" :doc-image="docImage"
      @view="viewDocument" @toggle-library="toggleLibrary" @toggle-expand="toggleExpand" />

    <DocumentCardList v-else-if="!viewerOpen && viewMode === 'list' && paginatedDocuments.length"
      :documents="paginatedDocuments" :current-lang="currentLang" :is-authenticated="auth.isAuthenticated"
      :library-ids="libraryIds" :is-expanded="isExpanded" :format-date="formatDate" :doc-image="docImage"
      @view="viewDocument" @toggle-library="toggleLibrary" @toggle-expand="toggleExpand" />

    <DocumentsEmptyState v-if="!loading && !viewerOpen && !filteredDocuments.length" :current-lang="currentLang"
      :has-filters="!!(searchQuery.trim() || selectedCategory)" @reset="resetAllFilters" />

    <DocumentsPagination v-if="!viewerOpen && filteredDocuments.length > 0" :current-lang="currentLang"
      :current-page="currentPage" :total-pages="totalPages" :page-start="pageStart" :page-end="pageEnd"
      :total="filteredDocuments.length" :visible-pages="visiblePages" @go-to-page="goToPage" />

    <DocumentViewer :open="viewerOpen" :doc="viewingDoc" :content="documentContent" :file-ext="fileExt"
      :file-url="fileUrl" :is-html-content="isHtmlContent" :is-authenticated="auth.isAuthenticated"
      :library-ids="libraryIds" :current-lang="currentLang" @close="closeViewer" @toggle-library="toggleLibrary" />

    <UserAuthModal :show="showAuthModal" :current-lang="currentLang" :initial-tab="authModalTab"
      @update:show="showAuthModal = $event" @close="showAuthModal = false" @success="onAuthSuccess" />
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
import UserAuthModal from '../../components/auth/UserAuthModal.vue'
import DocumentsHeader from '../../components/documents/DocumentsHeader.vue'
import DocumentsControls from '../../components/documents/DocumentsControls.vue'
import GuestCtaBanner from '../../components/documents/GuestCtaBanner.vue'
import FreePlanBanner from '../../components/documents/FreePlanBanner.vue'
import DocumentsSkeleton from '../../components/documents/DocumentsSkeleton.vue'
import DocumentCardGrid from '../../components/documents/DocumentCardGrid.vue'
import DocumentCardList from '../../components/documents/DocumentCardList.vue'
import DocumentsEmptyState from '../../components/documents/DocumentsEmptyState.vue'
import DocumentsPagination from '../../components/documents/DocumentsPagination.vue'
import DocumentViewer from '../../components/documents/DocumentViewer.vue'
import DocumentsError from '../../components/documents/DocumentsError.vue'

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
const documentsPerCategoryLimit = ref(null)
const isFreePlan = ref(false)
const showAuthModal = ref(false)
const authModalTab = ref('register')
const pendingDocToView = ref(null)
const expandedDocs = ref(new Set())
let searchTimer = null

const openAuth = (tab = 'register') => {
  authModalTab.value = tab
  showAuthModal.value = true
}

const onAuthSuccess = async () => {
  showAuthModal.value = false
  await fetchDocuments()
  await fetchLibraryIds()
  if (pendingDocToView.value) {
    const doc = pendingDocToView.value
    pendingDocToView.value = null
    viewDocument(doc)
  }
}

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

const fileExt = computed(() => viewingDoc.value?.doc_upload?.split('.').pop()?.toLowerCase())
const isHtmlContent = computed(() => documentContent.value && documentContent.value.includes('<'))
const fileUrl = computed(() => {
  if (!viewingDoc.value?.doc_upload) return ''
  return `${API_URL}/storage/${viewingDoc.value.doc_upload}`
})

const allDocuments = computed(() => {
  const docs = []
  const collectDocuments = (categories) => {
    for (const cat of categories) {
      for (const doc of (cat.documents || [])) {
        docs.push({ ...doc, categoryId: cat.id, categoryTitle: cat.title })
      }
      collectDocuments(cat.sub_categories || cat.subcategories || cat.children || [])
    }
  }
  collectDocuments(rawCategories.value)
  return docs
})

const currentCategoryObj = computed(() => {
  if (!selectedCategory.value) return null
  const findCat = (cats) => {
    for (const c of cats) {
      if (String(c.id) === String(selectedCategory.value)) return c
      const sub = c.sub_categories || c.subcategories || c.children || []
      const found = findCat(sub)
      if (found) return found
    }
    return null
  }
  return findCat(rawCategories.value)
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
  switch (sortBy.value) {
    case 'oldest':
      docs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      break
    case 'title_asc':
      docs.sort((a, b) => (a.doc_name || a.doc_title || '').localeCompare(b.doc_name || b.doc_title || ''))
      break
    case 'title_desc':
      docs.sort((a, b) => (b.doc_name || b.doc_title || '').localeCompare(a.doc_name || a.doc_title || ''))
      break
    case 'category':
      docs.sort((a, b) => (a.categoryTitle || '').localeCompare(b.categoryTitle || ''))
      break
    default:
      docs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }
  return docs
})

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredDocuments.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredDocuments.value.length / itemsPerPage.value)))
const pageStart = computed(() => filteredDocuments.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1)
const pageEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredDocuments.value.length))

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

const fetchDocuments = async () => {
  loading.value = true
  error.value = null
  try {
    const endpoint = auth.isAuthenticated ? '/my-documents' : '/documents/preview?limit=10'
    const response = await apiClient.get(endpoint)
    if (response.data.status === 'success') {
      rawCategories.value = normalizeCategories(response.data.categories)
      documentsPerCategoryLimit.value = response.data.documents_per_category_limit || response.data.preview_limit || null
      isFreePlan.value = !!response.data.is_free_plan
    } else {
      error.value = 'Unexpected response from server'
    }
  } catch (err) {
    error.value = err.message || 'Failed to load documents'
  } finally {
    loading.value = false
  }
}

const docImage = (doc) => doc.image ? `${API_URL}/storage/${doc.image}` : ''

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
  return new Date(dateStr).toLocaleDateString(currentLang.value === 'en' ? 'en-US' : 'km-KH', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

const viewDocument = async (doc) => {
  if (!auth.isAuthenticated) {
    pendingDocToView.value = doc
    authModalTab.value = 'register'
    showAuthModal.value = true
    toastError(currentLang.value === 'en'
      ? 'Please create an account or sign in to read this document'
      : 'សូមចុះឈ្មោះ ឬចូលគណនីដើម្បីអានឯកសារនេះ')
    return
  }
  viewingDoc.value = doc
  viewerOpen.value = true
  documentContent.value = ''
  if (fileExt.value === 'docx') {
    try {
      const response = await apiClient.get(`/documents/${doc.id}/content`)
      documentContent.value = response.data.content || ''
    } catch (err) {
      if (err.response?.status === 401) showAuthModal.value = true
      documentContent.value = currentLang.value === 'en'
        ? 'Content extraction failed: ' + err.message
        : 'រកមិនអាចទាញយកមាតិកានេះ: ' + err.message
    }
  }
}

const closeViewer = () => {
  viewerOpen.value = false
  viewingDoc.value = null
  documentContent.value = ''
}

const toggleExpand = (docId) => {
  const next = new Set(expandedDocs.value)
  next.has(docId) ? next.delete(docId) : next.add(docId)
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

const clearCategoryFilter = () => {
  selectedCategory.value = ''
  currentPage.value = 1
  const query = { ...route.query }
  delete query.category
  router.push({ query })
}

const resetAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
  router.push({ path: '/documents', query: {} })
}

const onSearchInput = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    const q = searchQuery.value.trim()
    router.push({ query: { ...route.query, search: q || undefined } })
  }, 400)
}

const changeItemsPerPage = (val) => {
  itemsPerPage.value = val
  currentPage.value = 1
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && viewerOpen.value) closeViewer()
}

onMounted(() => {
  if (route.query.category) selectedCategory.value = route.query.category
  if (route.query.search) searchQuery.value = route.query.search
  fetchDocuments()
  fetchLibraryIds()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(() => route.query.category, (val) => {
  selectedCategory.value = val || ''
  currentPage.value = 1
})
watch(() => route.query.search, (val) => {
  searchQuery.value = val || ''
  currentPage.value = 1
})
watch(() => auth.isAuthenticated, () => {
  fetchDocuments()
  fetchLibraryIds()
})
</script>

<style scoped>
#download,
#print,
#secondaryDownload {
  display: none !important;
}
</style>
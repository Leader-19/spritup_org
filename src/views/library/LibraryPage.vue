<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
      <div>
        <h1 class="font-display font-bold text-3xl text-gray-900 dark:text-white">
          {{ currentLang === 'en' ? 'My Library' : 'បណ្ណាល័យរបស់ខ្ញុំ' }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ totalItems }} {{ currentLang === 'en' ? 'items' : 'ទំនិញ' }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button v-if="selectedIds.size > 0" @click="bulkDelete"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-[5px] bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {{ currentLang === 'en' ? `Delete (${selectedIds.size})` : `លុប (${selectedIds.size})` }}
        </button>
        <button v-if="selectedIds.size > 0" @click="clearSelection"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-[5px] bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          {{ currentLang === 'en' ? 'Cancel' : 'បោះបង់' }}
        </button>
        <button @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'"
          class="px-3 py-2 rounded-[5px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          {{ viewMode === 'grid' ? (currentLang === 'en' ? 'List View' : 'ទិដ្ឋភាពបញ្ជី') : (currentLang === 'en' ? 'Card View' : 'ទិដ្ឋភាពកាត') }}
        </button>
        <router-link to="/documents"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-[5px] bg-brand-600 text-white text-xs font-medium hover:bg-brand-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {{ currentLang === 'en' ? 'Browse Documents' : 'រកមើលឯកសារ' }}
        </router-link>
      </div>
    </div>

    <!-- Select All Bar -->
    <div v-if="!loading && libraryItems.length > 0" class="mb-4 flex items-center gap-3">
      <label class="flex items-center gap-2 cursor-pointer select-none">
        <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll"
          class="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700" />
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ selectedIds.size > 0
            ? (currentLang === 'en' ? `${selectedIds.size} selected` : `${selectedIds.size} បានជ្រើសរើស`)
            : (currentLang === 'en' ? 'Select all' : 'ជ្រើសរើសទាំងអស់') }}
        </span>
      </label>
    </div>

    <!-- Filters -->
    <div v-if="!loading && libraryItems.length > 0" class="mb-6 flex flex-col sm:flex-row gap-3">
      <div class="relative w-full sm:w-64">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input v-model="searchQuery" @input="onSearchInput" @keyup.enter="fetchLibrary(1)" type="text"
          :placeholder="currentLang === 'en' ? 'Search your library...' : 'ស្វែងរកបណ្ណាល័យ...'"
          class="w-full pl-9 pr-10 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 border-none outline-none focus:ring-2 focus:ring-brand-400/50 transition" />
        <button v-if="searchQuery" @click="clearSearch"
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <select v-model="selectedCategory" @change="onCategoryChange"
        class="px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 border-none outline-none focus:ring-2 focus:ring-brand-400/50 transition cursor-pointer">
        <option value="">{{ currentLang === 'en' ? 'All Categories' : 'ប្រភេទទាំងអស់' }}</option>
        <option v-for="cat in availableCategories" :key="cat.id" :value="cat.id">
          {{ cat.title }} ({{ cat.document_count }})
        </option>
      </select>

      <select v-model="sortBy" @change="onSortChange"
        class="px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 border-none outline-none focus:ring-2 focus:ring-brand-400/50 transition cursor-pointer">
        <option value="newest">{{ currentLang === 'en' ? 'Newest first' : 'ថ្មីបំផុត' }}</option>
        <option value="oldest">{{ currentLang === 'en' ? 'Oldest first' : 'ចាស់បំផុត' }}</option>
        <option value="title_asc">{{ currentLang === 'en' ? 'Title A-Z' : 'ចំណងជើង A-Z' }}</option>
        <option value="title_desc">{{ currentLang === 'en' ? 'Title Z-A' : 'ចំណងជើង Z-A' }}</option>
        <option value="category">{{ currentLang === 'en' ? 'By category' : 'តាមប្រភេទ' }}</option>
      </select>

      <button v-if="searchQuery || selectedCategory" @click="clearAllFilters"
        class="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ currentLang === 'en' ? 'Clear filters' : 'លុបតម្រង' }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="i in 6" :key="i" class="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 animate-pulse">
        <div class="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Empty State (no items at all) -->
    <div v-else-if="totalItems === 0 && !searchQuery" class="text-center py-20">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
        {{ currentLang === 'en' ? 'Your library is empty' : 'បណ្ណាល័យរបស់អ្នកទទេ' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
        {{ currentLang === 'en' ? 'Save documents to your library for quick access later.' : 'រក្សាទុកឯកសារទៅក្នុងបណ្ណាល័យសម្រាប់ចូលប្រើប្រាស់រហ័ស។' }}
      </p>
      <router-link to="/documents"
        class="inline-flex items-center gap-1.5 px-3 py-2 rounded-[5px] bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
        {{ currentLang === 'en' ? 'Browse Documents' : 'រកមើលឯកសារ' }}
      </router-link>
    </div>

    <!-- No search results -->
    <div v-else-if="libraryItems.length === 0 && searchQuery" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
        {{ currentLang === 'en' ? 'No results found' : 'រកមិនឃើញលទ្ធផល' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
        {{ currentLang === 'en' ? 'Try adjusting your search terms.' : 'សាកល្បងប្តូរពាក្យស្វែងរក។' }}
      </p>
      <button @click="clearSearch"
        class="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
        {{ currentLang === 'en' ? 'Clear Search' : 'លុបការស្វែងរក' }}
      </button>
    </div>

    <!-- Library Grid -->
    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="item in libraryItems" :key="item.id"
        :class="['p-5 rounded-2xl bg-white dark:bg-gray-800/80 border shadow-sm hover:shadow-md transition-all group',
          selectedIds.has(item.id) ? 'border-brand-400 dark:border-brand-500 ring-1 ring-brand-400 dark:ring-brand-500' : 'border-gray-100 dark:border-gray-700/50']">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <input type="checkbox" :checked="selectedIds.has(item.id)" @change="toggleSelect(item.id)"
              class="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700" />
            <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <button v-if="selectedIds.size === 0" @click="removeFromLibrary(item.id)"
            class="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        <h3 class="font-display font-semibold text-gray-900 dark:text-white mb-1 truncate">{{ item.doc_title }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">{{ item.doc_name }}</p>
        <span v-if="item.category" class="inline-block px-2 py-0.5 text-xs font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/20 rounded-full mb-3">
          {{ item.category.title }}
        </span>
        <p v-if="item.description" class="text-sm text-gray-400 dark:text-gray-500 line-clamp-2 mb-3">{{ item.description }}</p>
        <router-link :to="`/documents/${item.id}`"
          class="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium">
          {{ currentLang === 'en' ? 'Read' : 'អាន' }}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Library List -->
    <div v-else-if="viewMode === 'list'" class="space-y-3">
      <div v-for="item in libraryItems" :key="item.id"
        :class="['flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border shadow-sm hover:shadow-md transition-all group',
          selectedIds.has(item.id) ? 'border-brand-400 dark:border-brand-500 ring-1 ring-brand-400 dark:ring-brand-500' : 'border-gray-200 dark:border-gray-700']">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <input type="checkbox" :checked="selectedIds.has(item.id)" @change="toggleSelect(item.id)"
            class="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700 flex-shrink-0" />
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500 text-white flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-display font-semibold text-gray-900 dark:text-white truncate">{{ item.doc_title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ item.doc_name }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span v-if="item.category" class="inline-block px-2 py-0.5 text-xs font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/20 rounded-full">
                {{ item.category.title }}
              </span>
              <span v-if="item.description" class="text-xs text-gray-400 dark:text-gray-500 truncate">{{ item.description }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <router-link :to="`/documents/${item.id}`"
            class="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium">
            {{ currentLang === 'en' ? 'Read' : 'អាន' }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
          <button v-if="selectedIds.size === 0" @click="removeFromLibrary(item.id)"
            class="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && totalPages > 1" class="flex items-center justify-between mt-8">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ currentLang === 'en' ? 'Page' : 'ទំព័រ' }} {{ currentPage }} / {{ totalPages }} ({{ totalItems }} {{ currentLang === 'en' ? 'total' : 'សរុប' }})
      </p>
      <div class="flex items-center gap-2">
        <button @click="goToPage(1)" :disabled="currentPage === 1"
          :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700']">
          {{ currentLang === 'en' ? 'First' : 'ដំបូង' }}
        </button>
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
          :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700']">
          {{ currentLang === 'en' ? 'Previous' : 'មុន' }}
        </button>

        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="px-2 py-1.5 text-sm text-gray-400 dark:text-gray-600">...</span>
          <button v-else @click="goToPage(page)"
            :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-w-[36px]',
              page === currentPage ? 'bg-brand-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700']">
            {{ page }}
          </button>
        </template>

        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
          :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700']">
          {{ currentLang === 'en' ? 'Next' : 'បន្ទាប់' }}
        </button>
        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages"
          :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700']">
          {{ currentLang === 'en' ? 'Last' : 'ចុងក្រោយ' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiClient from '../../utils/apiClient.js'
import { useToast } from '../../composables/useToast.js'
import { useLibrary } from '../../composables/useLibrary.js'

const route = useRoute()
const router = useRouter()

const currentLang = inject('currentLang')
const { success: toastSuccess, error: toastError } = useToast()
const { libraryIds, fetchLibraryIds, suppressBadgeToast } = useLibrary()

const loading = ref(true)
const libraryItems = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')
const viewMode = ref('grid')
const selectedIds = ref(new Set())
const isAllSelected = computed(() => {
  if (libraryItems.value.length === 0) return false
  return libraryItems.value.every(item => selectedIds.value.has(item.id))
})
const availableCategories = ref([])
const categoriesLoaded = ref(false)
const currentPage = ref(1)
const totalItems = ref(0)
const totalPages = ref(1)
const perPage = 12
let searchTimer = null

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)
  return pages
})

async function fetchLibrary(page = 1) {
  loading.value = true
  try {
    const params = { page, per_page: perPage, sort: sortBy.value }
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim()
    }
    if (selectedCategory.value) {
      params.category_id = selectedCategory.value
    }
    const response = await apiClient.get('/library', { params })
    libraryItems.value = response.data.data || []
    totalItems.value = response.data.total || 0
    currentPage.value = response.data.current_page || 1
    totalPages.value = response.data.last_page || 1

    // Cache categories — only fetch on first load or after add/remove
    if (!categoriesLoaded.value && response.data.categories) {
      availableCategories.value = response.data.categories
      categoriesLoaded.value = true
    }

    // Update shared library IDs
    const allIds = new Set(libraryIds.value)
    libraryItems.value.forEach(item => allIds.add(item.id))
    libraryIds.value = allIds
  } catch (err) {
    console.error('Failed to fetch library:', err)
  } finally {
    loading.value = false
  }
}

async function removeFromLibrary(documentId) {
  const msg = currentLang?.value === 'en' ? 'Remove this document?' : 'លុបឯកសារនេះ?'
  if (!confirm(msg)) return
  try {
    suppressBadgeToast.value = true
    await apiClient.delete(`/library/${documentId}`)
    libraryItems.value = libraryItems.value.filter(i => i.id !== documentId)
    libraryIds.value.delete(documentId)
    categoriesLoaded.value = false  // Invalidate cache so counts refresh
    totalItems.value = Math.max(0, totalItems.value - 1)
    totalPages.value = Math.max(1, Math.ceil(totalItems.value / perPage))

    // If current page is now empty and not page 1, go back one page
    if (libraryItems.value.length === 0 && currentPage.value > 1) {
      goToPage(currentPage.value - 1)
    }
  } catch (err) {
    console.error('Failed to remove:', err)
  }
}

function syncUrl() {
  const query = {}
  if (searchQuery.value) query.search = searchQuery.value
  if (selectedCategory.value) query.category = selectedCategory.value
  if (sortBy.value !== 'newest') query.sort = sortBy.value
  if (currentPage.value > 1) query.page = currentPage.value
  router.replace({ query })
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchLibrary(page)
  syncUrl()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onSearchInput() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1
    fetchLibrary(1)
    syncUrl()
  }, 400)
}

function clearSearch() {
  searchQuery.value = ''
  currentPage.value = 1
  fetchLibrary(1)
  syncUrl()
}

function clearAllFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
  selectedIds.value = new Set()
  fetchLibrary(1)
  syncUrl()
}

function toggleSelect(id) {
  const next = new Set(selectedIds.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  selectedIds.value = next
}

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedIds.value = new Set()
  } else {
    selectedIds.value = new Set(libraryItems.value.map(item => item.id))
  }
}

function clearSelection() {
  selectedIds.value = new Set()
}

async function bulkDelete() {
  const count = selectedIds.value.size
  const msg = currentLang?.value === 'en'
    ? `Remove ${count} document${count !== 1 ? 's' : ''} from your library?`
    : `លុបឯកសារ ${count} ពីបណ្ណាល័យរបស់អ្នក?`
  if (!confirm(msg)) return

  try {
    suppressBadgeToast.value = true
    await apiClient.delete('/library', { data: { document_ids: [...selectedIds.value] } })
    libraryItems.value = libraryItems.value.filter(i => !selectedIds.value.has(i.id))
    selectedIds.value.forEach(id => libraryIds.value.delete(id))
    selectedIds.value = new Set()
    totalItems.value = Math.max(0, totalItems.value - count)
    categoriesLoaded.value = false
    totalPages.value = Math.max(1, Math.ceil(totalItems.value / perPage))

    if (libraryItems.value.length === 0 && currentPage.value > 1) {
      goToPage(currentPage.value - 1)
    }
  } catch (err) {
    console.error('Failed to bulk delete:', err)
  }
}

function onCategoryChange() {
  currentPage.value = 1
  fetchLibrary(1)
  syncUrl()
}

function onSortChange() {
  currentPage.value = 1
  fetchLibrary(1)
  syncUrl()
}

const handleKeydown = (e) => {
  // Don't intercept when typing in inputs
  const tag = e.target.tagName.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return

  // Home/End for first/last page (no conflict with scrolling)
  if (e.key === 'Home') {
    e.preventDefault()
    goToPage(1)
  } else if (e.key === 'End') {
    e.preventDefault()
    goToPage(totalPages.value)
  }
}

onMounted(() => {
  // Restore filter state from URL
  if (route.query.search) searchQuery.value = route.query.search
  if (route.query.category) selectedCategory.value = route.query.category
  if (route.query.sort) sortBy.value = route.query.sort
  const page = parseInt(route.query.page) || 1

  fetchLibraryIds()
  fetchLibrary(page)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

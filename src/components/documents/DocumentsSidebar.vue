<template>
  <div class="flex flex-col gap-1">
    <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
      {{ currentLang === 'en' ? 'Categories' : 'អន្តរវិស័យ' }}
    </h3>

    <button v-if="showAllDocuments"
      @click="$emit('select-category', null)"
      :class="['flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors w-full text-left',
        selectedCategory === null
          ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60']">
      <span>{{ currentLang === 'en' ? 'All documents' : 'ឯកសារ​ទាំងអស់' }}</span>
    </button>

    <template v-if="allCategories.length">
      <button v-for="item in allCategories" :key="item.category.id"
        :style="{ paddingLeft: `${12 + item.depth * 16}px` }"
        @click="$emit('select-category', item.category.id)"
        :class="['flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors w-full text-left',
          selectedCategory === item.category.id
            ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60']">
        <span class="truncate">{{ categoryTitle(item.category) }}</span>
        <span v-if="documentCount(item.category) > 0" class="ml-auto text-xs text-gray-400 dark:text-gray-500">
          {{ documentCount(item.category) }}
        </span>
      </button>
    </template>

    <p v-if="loading" class="px-3 py-2 text-sm text-gray-400 dark:text-gray-500">
      {{ currentLang === 'en' ? 'Loading categories...' : 'កំពុងទាញប្រភេទ...' }}
    </p>
    <p v-else-if="!allCategories.length" class="px-3 py-2 text-sm text-gray-400 dark:text-gray-500">
      {{ currentLang === 'en' ? 'No categories available' : 'មិនមានប្រភេទ' }}
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { API_BASE } from '../../config/env.js'
import { normalizeCategories } from '../../utils/api.js'

const props = defineProps({
  currentLang: String,
  categories: {
    type: Array,
    default: () => [],
  },
  rootCategoryTitle: {
    type: String,
    default: '',
  },
})

defineEmits(['select-category'])

const route = useRoute()
const apiCategories = ref([])
const loading = ref(false)

const selectedCategory = computed(() => {
  return route.query.category ? Number(route.query.category) : null
})

const allCategories = computed(() => {
  const flattened = []
  const categories = props.categories?.length ? props.categories : apiCategories.value

  const findCategory = (items) => {
    for (const category of items || []) {
      if (!category || typeof category !== 'object') continue
      if (categoryTitle(category) === props.rootCategoryTitle) return category
      const match = findCategory(category.sub_categories || category.subcategories || category.children || category.child_categories)
      if (match) return match
    }
    return null
  }

  // When a root category is set, only its children belong in this sidebar.
  const rootCategory = props.rootCategoryTitle ? findCategory(categories) : null
  const visibleCategories = props.rootCategoryTitle
    ? rootCategory?.sub_categories || rootCategory?.subcategories || rootCategory?.children || rootCategory?.child_categories || []
    : categories

  // Only the first level (sub categories) is shown in the sidebar. The sub
  // categories they contain are exposed via the sub-navbar instead.
  const addCategories = (categories, depth = 0) => {
    for (const category of categories || []) {
      if (!category || typeof category !== 'object') continue
      flattened.push({ category, depth })
    }
  }

  addCategories(visibleCategories)
  return flattened
})

const showAllDocuments = computed(() => !props.rootCategoryTitle)

const categoryTitle = (category) => category.title || category.name || category.category_name || ''

const documentCount = (category) => {
  if (Number.isFinite(Number(category.documents_count))) return Number(category.documents_count)
  return Array.isArray(category.documents) ? category.documents.length : 0
}

const fetchCategories = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE}/documents`)
    const payload = response.data || {}
    const categories = payload.categories || payload.data?.categories || payload.data
    apiCategories.value = normalizeCategories(categories)
  } catch (error) {
    console.error('Error fetching sidebar categories:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchCategories)

</script>

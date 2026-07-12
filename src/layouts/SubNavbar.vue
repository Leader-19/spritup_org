<template>
  <transition name="slide-down">
    <div v-if="isVisible" :class="['subnavbar-glass fixed top-[104px] lg:top-16 left-0 right-0 z-[60] border-b border-gray-200 dark:border-gray-700 transition-[left] duration-300', navbarLeftClass]">
      <div class="flex items-center gap-1 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-hide">
        <button @click="selectCategory(containingNode.id)"
          :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 whitespace-nowrap',
            selectedCategory === containingNode.id
              ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100']">
          {{ currentLang === 'en' ? 'All' : 'ទាំងអស់' }}
        </button>
        <template v-for="cat in subcategories" :key="cat.id">
          <button @click="selectCategory(cat.id)"
            :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 whitespace-nowrap',
              selectedCategory === cat.id
                ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100']">
            {{ cat.title }}
          </button>
        </template>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_BASE } from '../config/env.js'
import { normalizeCategories } from '../utils/api.js'

const props = defineProps({
  visible: Boolean,
  categoryId: [Number, String],
  sidebarOpen: Boolean,
  collapsed: Boolean,
})

const emit = defineEmits(['category-selected', 'visibility-change'])

const currentLang = inject('currentLang')
const router = useRouter()
const route = useRoute()
const categories = ref([])
const selectedCategory = ref(null)

// A category's children live under any of these keys depending on the API.
const childCategories = (category) => {
  if (!category) return []
  return normalizeCategories(
    category.sub_categories || category.subcategories || category.children || category.child_categories || []
  )
}

const findCategory = (items, id) => {
  const target = Number(id)
  for (const item of normalizeCategories(items)) {
    if (Number(item.id) === target) return item
    const match = findCategory(childCategories(item), target)
    if (match) return match
  }
  return null
}

// The category the user clicked.
const selectedNode = computed(() => findCategory(categories.value, props.categoryId))

// The sub-navbar shows the sub categories contained by the selected category.
// When a leaf (no children) is clicked inside the bar, fall back to its
// parent's children so the navbar stays open instead of disappearing.
const containingNode = computed(() => {
  const node = selectedNode.value
  if (!node) return null
  if (childCategories(node).length) return node
  if (node.parent_id != null) {
    const parent = findCategory(categories.value, node.parent_id)
    if (parent) return parent
  }
  return node
})

const subcategories = computed(() => childCategories(containingNode.value))

// Show the sub-navbar when a sub category that contains sub categories is in
// view. Top-level categories with no children (e.g. a leaf ministry) hide it.
const isVisible = computed(() => {
  return props.visible && Boolean(containingNode.value && subcategories.value.length)
})

// On mobile the left sidebar is an overlay, so the bar spans the full width.
// On desktop it starts at the right edge of the left sidebar.
const navbarLeftClass = computed(() => {
  if (!props.sidebarOpen) return 'lg:left-0'
  return props.collapsed ? 'lg:left-16' : 'lg:left-72'
})

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  router.push(`/documents?category=${categoryId}`)
  emit('category-selected', categoryId)
}

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE}/documents`)
    const payload = response.data || {}
    const categoryData = payload.categories || payload.data?.categories || payload.data
    categories.value = normalizeCategories(categoryData)
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

watch(() => route.query.category, (newVal) => {
  selectedCategory.value = newVal ? Number(newVal) : null
}, { immediate: true })

watch(isVisible, (visible) => {
  emit('visibility-change', visible)
}, { immediate: true })

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.subnavbar-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
}
.dark .subnavbar-glass {
  background: rgba(15, 23, 42, 0.85);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

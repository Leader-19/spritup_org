<template>
  <transition name="slide-down">
    <div v-if="isVisible" class="subnavbar-glass fixed top-28 lg:top-16 left-0 right-0 z-30 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-1 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-hide">
        <button @click="selectCategory(navigationCategory.id)"
          :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 whitespace-nowrap',
            selectedCategory === navigationCategory.id
              ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100']">
          {{ currentLang === 'en' ? 'All Ministries' : 'ទាំងអស់' }}
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

const props = defineProps({
  visible: Boolean,
  categoryId: [Number, String],
})

const emit = defineEmits(['category-selected', 'visibility-change'])

const currentLang = inject('currentLang')
const router = useRouter()
const route = useRoute()
const categories = ref([])
const selectedCategory = ref(null)

const selectedCategoryNode = computed(() => {
  return findCategory(categories.value, Number(props.categoryId))
})

const subcategories = computed(() => {
  return childCategories(navigationCategory.value)
})

const interMinisterialCategory = computed(() => {
  return categories.value.find(category => category.title === 'អន្តរវិស័យ')
})

// Keep the submenu visible both for a ministry and for one of that ministry's children.
const navigationCategory = computed(() => {
  const interMinisterialId = interMinisterialCategory.value?.id
  let category = selectedCategoryNode.value

  while (category && category.parent_id !== interMinisterialId) {
    category = findCategory(categories.value, category.parent_id)
  }

  return category || null
})

const isVisible = computed(() => {
  return props.visible && Boolean(navigationCategory.value && subcategories.value.length)
})

const childCategories = (category) => {
  if (!category) return []
  return category.sub_categories || category.subcategories || category.children || category.child_categories || []
}

const findCategory = (items, id) => {
  for (const item of items || []) {
    if (item.id === id) return item
    const match = findCategory(childCategories(item), id)
    if (match) return match
  }
  return null
}

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
    categories.value = Array.isArray(categoryData) ? categoryData : []
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

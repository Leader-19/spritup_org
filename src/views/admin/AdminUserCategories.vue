<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 mb-8">
        <router-link :to="`/admin/users/${userId}`" class="text-blue-600 hover:text-blue-700 text-sm font-medium">← Back to User</router-link>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>

      <div v-else class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Category Assignment</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Assign categories to <strong>{{ user?.name }}</strong>. Users will only see categories assigned to them.</p>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead class="border-b text-xs uppercase text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3">Category</th>
                  <th class="px-6 py-3">Permissions</th>
                  <th class="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="cat in assignedCategories" :key="cat.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ cat.title }}</td>
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="perm in cat.permission.split(',')" :key="perm" class="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {{ perm }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button @click="removeCategory(cat.id)" class="text-red-500 hover:text-red-700 text-xs font-medium">Remove</button>
                  </td>
                </tr>
                <tr v-if="!assignedCategories.length">
                  <td colspan="3" class="px-6 py-8 text-center text-sm text-gray-400">No categories assigned yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Assign New Categories</h3>

          <div class="mb-4">
            <div class="relative">
              <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input v-model="categorySearch" type="text" placeholder="Search categories..."
                class="w-full pl-9 pr-9 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition" />
              <button v-if="categorySearch" @click="categorySearch = ''" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead class="border-b text-xs uppercase text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3">Category</th>
                  <th v-for="perm in availablePermissions" :key="perm" class="px-3 py-3 text-center">
                    {{ perm }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="cat in filteredCategories" :key="cat.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ cat.title }}</td>
                  <td v-for="perm in availablePermissions" :key="perm" class="px-3 py-4 text-center">
                    <input
                      type="checkbox"
                      :checked="isNewChecked(cat.id, perm)"
                      @change="toggleNewPermission(cat.id, perm)"
                      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </td>
                </tr>
                <tr v-if="!filteredCategories.length">
                  <td :colspan="availablePermissions.length + 1" class="px-6 py-12 text-center text-sm text-gray-400">
                    {{ categorySearch ? 'No matching categories found.' : 'No categories available.' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between mt-4">
            <button @click="clearNewSelection" v-if="Object.keys(newSelection).length > 0" class="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Selection
            </button>
            <div v-else></div>
            <button @click="saveNewAssignments" :disabled="saving || Object.keys(newSelection).length === 0" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2">
              <span v-if="saving" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Save Assignments
              <span v-if="Object.keys(newSelection).length > 0" class="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {{ Object.keys(newSelection).length }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'

const route = useRoute()
const userId = route.params.id
const user = ref(null)
const loading = ref(true)
const saving = ref(false)
const assignedCategories = ref([])
const availableCategories = ref([])
const availablePermissions = ['view', 'create', 'edit', 'delete', 'manage']
const categorySearch = ref('')
const newSelection = ref({})

const filteredCategories = computed(() => {
  if (!categorySearch.value.trim()) return availableCategories.value
  const query = categorySearch.value.toLowerCase()
  return availableCategories.value.filter(c => c.title.toLowerCase().includes(query))
})

function isNewChecked(categoryId, permission) {
  return !!newSelection.value[categoryId]?.includes(permission)
}

function toggleNewPermission(categoryId, permission) {
  if (!newSelection.value[categoryId]) {
    newSelection.value[categoryId] = []
  }
  const perms = newSelection.value[categoryId]
  const index = perms.indexOf(permission)
  if (index > -1) {
    perms.splice(index, 1)
    if (perms.length === 0) {
      delete newSelection.value[categoryId]
    }
  } else {
    perms.push(permission)
  }
}

function clearNewSelection() {
  newSelection.value = {}
}

async function saveNewAssignments() {
  const assignments = Object.entries(newSelection.value).map(([categoryId, perms]) => ({
    category_id: Number(categoryId),
    permissions: perms,
  }))

  if (assignments.length === 0) return

  saving.value = true
  try {
    await apiClient.post(`/admin/users/${userId}/categories`, {
      assignments,
    })
    newSelection.value = {}
    fetchData()
  } catch (error) {
    console.error('Failed to save assignments:', error)
    alert(error.response?.data?.message || 'Failed to save assignments.')
  } finally {
    saving.value = false
  }
}

async function removeCategory(categoryId) {
  try {
    await apiClient.delete(`/admin/users/${userId}/categories/${categoryId}`)
    fetchData()
  } catch (error) {
    console.error('Failed to remove category:', error)
  }
}

async function fetchData() {
  loading.value = true
  try {
    const [userRes, categoriesRes] = await Promise.all([
      apiClient.get(`/admin/users/${userId}`),
      apiClient.get('/admin/categories'),
    ])
    user.value = userRes.data.user
    assignedCategories.value = userRes.data.user.categories || []
    availableCategories.value = categoriesRes.data.categories || []
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div class="max-w-6xl mx-auto">
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
            <div class="space-y-4">
              <div v-for="(assignment, index) in newAssignments" :key="index" class="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <select v-model="assignment.category_id" class="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a category</option>
                  <option v-for="cat in availableCategories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
                </select>
                <div class="flex flex-wrap gap-2">
                  <label v-for="perm in availablePermissions" :key="perm" class="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" :value="perm" v-model="assignment.permissions" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span class="text-xs text-gray-600 dark:text-gray-300">{{ perm }}</span>
                  </label>
                </div>
                <button @click="removeAssignment(index)" class="text-red-500 hover:text-red-700 p-2">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between mt-4">
              <button @click="addAssignment" class="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                Add Category
              </button>
              <button @click="saveAssignments" :disabled="saving" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
                <span v-if="saving" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Save Assignments
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
const newAssignments = ref([])

const fetchData = async () => {
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

const addAssignment = () => {
  newAssignments.value.push({
    category_id: '',
    permissions: ['view'],
  })
}

const removeAssignment = (index) => {
  newAssignments.value.splice(index, 1)
}

const saveAssignments = async () => {
  const validAssignments = newAssignments.value.filter(a => a.category_id && a.permissions.length > 0)
  if (validAssignments.length === 0) return

  saving.value = true
  try {
    await apiClient.post(`/admin/users/${userId}/categories`, {
      assignments: validAssignments,
    })
    newAssignments.value = []
    fetchData()
  } catch (error) {
    console.error('Failed to save assignments:', error)
    alert(error.response?.data?.message || 'Failed to save assignments.')
  } finally {
    saving.value = false
  }
}

const removeCategory = async (categoryId) => {
  try {
    await apiClient.delete(`/admin/users/${userId}/categories/${categoryId}`)
    fetchData()
  } catch (error) {
    console.error('Failed to remove category:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

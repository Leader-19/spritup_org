<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ pageTitle }}</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ pageDescription }}</p>
          </div>
          <button v-if="canCreateUsers" @click="openCreateModal" class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Create User
          </button>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        <div v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <input v-model="search" @input="debounceSearch" type="text" placeholder="Search users..." class="w-full sm:w-64 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead class="border-b text-xs uppercase text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th class="px-6 py-3.5">User</th>
                                <th class="px-6 py-3.5">Email</th>
                                <th class="px-6 py-3.5">Roles</th>
                                <th class="px-6 py-3.5">Plan</th>
                                <th class="px-6 py-3.5">Source</th>
                                <th class="px-6 py-3.5 text-right">Actions</th>
                              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div v-if="user.avatar_url" class="h-10 w-10 rounded-full overflow-hidden">
                        <img :src="user.avatar_url" class="h-10 w-10 rounded-full object-cover" />
                      </div>
                      <div v-else class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {{ user.name.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <div class="font-semibold text-gray-900 dark:text-white">{{ user.name }}</div>
                        <div class="text-xs text-gray-400">ID: {{ user.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-xs">{{ user.email }}</td>
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="role in user.roles" :key="role" class="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {{ role }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-xs">
                    <span v-if="user.subscription?.plan" class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {{ user.subscription.plan.name }}
                    </span>
                    <span v-else class="text-gray-400 italic">No plan</span>
                  </td>
                  <td class="px-6 py-4 text-xs">
                    <span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300 capitalize">
                      {{ user.registration_source || 'admin' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <router-link :to="`/admin/users/${user.id}`" class="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50" title="View Details">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </router-link>
                      <router-link :to="`/admin/users/${user.id}/categories`" class="rounded-lg p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50" title="Manage Categories">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                      </router-link>
                      <button @click="confirmDelete(user)" class="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50" title="Delete User">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!users.length">
                  <td colspan="6" class="px-6 py-8 text-center text-sm text-gray-400">No users found.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="pagination.last_page > 1" class="flex items-center justify-between gap-4 border-t border-gray-200 px-4 py-3 text-sm dark:border-gray-700">
            <span class="text-gray-500 dark:text-gray-400">Page {{ pagination.current_page }} of {{ pagination.last_page }} · {{ pagination.total }} users</span>
            <div class="flex gap-2">
              <button @click="changePage(pagination.current_page - 1)" :disabled="pagination.current_page === 1" class="rounded-lg border border-gray-300 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600">Previous</button>
              <button @click="changePage(pagination.current_page + 1)" :disabled="pagination.current_page === pagination.last_page" class="rounded-lg border border-gray-300 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600">Next</button>
            </div>
          </div>
        </div>

        <!-- Create User Modal -->
        <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Create New User</h3>
            <form @submit.prevent="createUser">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input v-model="form.name" required class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input v-model="form.email" type="email" required class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                  <input v-model="form.password" type="password" required class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                  <input v-model="form.password_confirmation" type="password" required class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roles</label>
                  <select v-model="form.roles" multiple class="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option v-for="role in availableRoles" :key="role" :value="role">{{ role }}</option>
                  </select>
                </div>
              </div>
              <div class="flex items-center justify-end gap-3 mt-6">
                <button type="button" @click="showCreateModal = false" class="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <button type="submit" :disabled="creating" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
                  <span v-if="creating" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Delete Confirmation -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete User</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to delete <strong>{{ deletingUser?.name }}</strong>? This action cannot be undone.</p>
            <div class="flex items-center justify-end gap-3">
              <button @click="showDeleteModal = false" class="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
              <button @click="deleteUser" :disabled="deleting" class="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50">
                <span v-if="deleting" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../../utils/apiClient.js'

const router = useRouter()
const route = useRoute()
const registrationSource = computed(() => route.meta.registrationSource || '')
const canCreateUsers = computed(() => registrationSource.value === 'admin')
const pageTitle = computed(() => route.meta.pageTitle || 'User Management')
const pageDescription = computed(() => registrationSource.value === 'frontend'
  ? 'Users who registered through the public frontend.'
  : 'Users created directly by administrators. Manage access, categories, and subscription plans.')
const users = ref([])
const loading = ref(true)
const search = ref('')
const showCreateModal = ref(false)
const showDeleteModal = ref(false)
const deletingUser = ref(null)
const creating = ref(false)
const deleting = ref(false)
const availableRoles = ref([])
const pagination = ref({ current_page: 1, last_page: 1, total: 0 })

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  roles: ['Normal'],
})

let searchTimer = null

const debounceSearch = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    fetchUsers(1)
  }, 300)
}

const fetchUsers = async (page = pagination.value.current_page) => {
  loading.value = true
  try {
    const params = {}
    if (registrationSource.value) {
      params.registration_source = registrationSource.value
    }
    if (search.value.trim()) {
      params.search = search.value.trim()
    }
    params.page = page
    const response = await apiClient.get('/admin/users', { params })
    users.value = response.data.users
    pagination.value = response.data.pagination
  } catch (error) {
    console.error('Failed to load users:', error)
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    fetchUsers(page)
  }
}

const openCreateModal = async () => {
  try {
    const response = await apiClient.get('/admin/plans')
    availableRoles.value = ['Normal', 'Admin']
  } catch (error) {
    availableRoles.value = ['Normal', 'Admin']
  }
  form.value = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    roles: ['Normal'],
  }
  showCreateModal.value = true
}

const createUser = async () => {
  creating.value = true
  try {
    await apiClient.post('/admin/users', form.value)
    showCreateModal.value = false
    fetchUsers()
  } catch (error) {
    console.error('Failed to create user:', error)
    alert(error.response?.data?.message || 'Failed to create user.')
  } finally {
    creating.value = false
  }
}

const confirmDelete = (user) => {
  deletingUser.value = user
  showDeleteModal.value = true
}

const deleteUser = async () => {
  if (!deletingUser.value) return
  deleting.value = true
  try {
    await apiClient.delete(`/admin/users/${deletingUser.value.id}`)
    showDeleteModal.value = false
    deletingUser.value = null
    fetchUsers()
  } catch (error) {
    console.error('Failed to delete user:', error)
    alert(error.response?.data?.message || 'Failed to delete user.')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

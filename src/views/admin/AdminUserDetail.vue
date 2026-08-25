<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-2 mb-8">
          <router-link to="/admin/users" class="text-blue-600 hover:text-blue-700 text-sm font-medium">← Back to Users</router-link>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        <div v-else-if="user" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <div class="flex items-center gap-4 mb-6">
              <div v-if="user.avatar_url" class="h-16 w-16 rounded-full overflow-hidden">
                <img :src="user.avatar_url" class="h-16 w-16 rounded-full object-cover" />
              </div>
              <div v-else class="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                {{ user.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.name }}</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span v-for="role in user.roles" :key="role" class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {{ role }}
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Registration Source</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white capitalize">{{ user.registration_source || 'admin' }}</p>
              </div>
              <div class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Category Limit</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.subscription?.plan?.max_categories || 'Unlimited' }}</p>
              </div>
              <div class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Document Limit</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.subscription?.plan?.max_documents || 'Unlimited' }}</p>
              </div>
              <div class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Current Plan</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.subscription?.plan?.name || 'No plan' }}</p>
              </div>
              <div class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Plan Status</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white capitalize">{{ user.subscription?.status || 'N/A' }}</p>
              </div>
              <div class="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Assigned Categories</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.categories?.length || 0 }}</p>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
              <div class="flex flex-wrap gap-3">
                <router-link :to="`/admin/users/${user.id}/categories`" class="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition-colors">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                  Manage Categories
                </router-link>
                <button @click="openPlanModal" class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                  Assign Plan
                </button>
              </div>
            </div>
          </div>

          <!-- Assigned Categories -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Assigned Categories</h3>
            <div v-if="user.categories?.length" class="space-y-2">
              <div v-for="cat in user.categories" :key="cat.id" class="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ cat.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Permission: {{ cat.permission }}</p>
                </div>
                <button @click="removeCategory(cat.id)" class="text-red-500 hover:text-red-700 text-xs font-medium">Remove</button>
              </div>
            </div>
            <p v-else class="text-sm text-gray-400 text-center py-4">No categories assigned yet.</p>
          </div>
        </div>
      </div>

      <!-- Assign Plan Modal -->
      <div v-if="showPlanModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Assign Subscription Plan</h3>
          <div v-if="plans.length === 0" class="text-sm text-gray-500 text-center py-4">No plans available.</div>
          <div v-else class="space-y-3 max-h-96 overflow-y-auto">
            <div v-for="plan in plans" :key="plan.id" @click="selectPlan(plan)" class="cursor-pointer rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-500 transition-colors" :class="{'border-blue-500 bg-blue-50 dark:bg-blue-950/20': selectedPlan?.id === plan.id}">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ plan.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ plan.formatted_price }} / {{ plan.duration_days ? plan.duration_days + ' days' : 'lifetime' }}</p>
                </div>
                <div class="text-right text-xs text-gray-500 dark:text-gray-400">
                  <p>Categories: {{ plan.max_categories || 'Unlimited' }}</p>
                  <p>Documents: {{ plan.max_documents || 'Unlimited' }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 mt-6">
            <button type="button" @click="showPlanModal = false" class="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Cancel</button>
            <button @click="assignPlan" :disabled="!selectedPlan || assigning" class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50">
              <span v-if="assigning" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Assign Plan
            </button>
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
const user = ref(null)
const loading = ref(true)
const showPlanModal = ref(false)
const plans = ref([])
const selectedPlan = ref(null)
const assigning = ref(false)

const fetchUser = async () => {
  loading.value = true
  try {
    const response = await apiClient.get(`/admin/users/${route.params.id}`)
    user.value = response.data.user
  } catch (error) {
    console.error('Failed to load user:', error)
  } finally {
    loading.value = false
  }
}

const openPlanModal = async () => {
  try {
    const response = await apiClient.get('/admin/plans')
    plans.value = response.data.plans
    selectedPlan.value = null
    showPlanModal.value = true
  } catch (error) {
    console.error('Failed to load plans:', error)
  }
}

const selectPlan = (plan) => {
  selectedPlan.value = plan
}

const assignPlan = async () => {
  if (!selectedPlan.value || !user.value) return
  assigning.value = true
  try {
    await apiClient.post(`/admin/users/${user.value.id}/plans`, {
      subscription_plan_id: selectedPlan.value.id,
      status: 'active',
    })
    showPlanModal.value = false
    fetchUser()
  } catch (error) {
    console.error('Failed to assign plan:', error)
    alert(error.response?.data?.message || 'Failed to assign plan.')
  } finally {
    assigning.value = false
  }
}

const removeCategory = async (categoryId) => {
  if (!confirm('Remove this category assignment?')) return
  try {
    await apiClient.delete(`/admin/users/${user.value.id}/categories/${categoryId}`)
    fetchUser()
  } catch (error) {
    console.error('Failed to remove category:', error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>

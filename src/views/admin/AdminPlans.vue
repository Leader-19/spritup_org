<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-8xl mx-auto">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">Subscription Plans</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Create, edit, and manage subscription plans with category access.</p>
        </div>
        <button @click="showCreateForm = true"
          class="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Plan
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>

      <!-- Plans Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="plan in plans" :key="plan.id"
          class="relative flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:border-blue-500 transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {{ plan.currency }}
              </span>
              <div class="flex items-center gap-2">
                <span :class="['inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', plan.is_active ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800']">
                  {{ plan.is_active ? 'Active' : 'Inactive' }}
                </span>
                <button @click="editPlan(plan)" class="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" title="Edit">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="deletePlan(plan)" class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <h2 class="mt-3 text-lg font-bold text-gray-900 dark:text-white">{{ plan.name }}</h2>
            <p class="mt-1 text-xs text-gray-500 line-clamp-2">{{ plan.description || 'No description provided.' }}</p>

            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{{ plan.formatted_price }}</span>
              <span class="text-xs text-gray-500">/ {{ plan.duration_days ? `${plan.duration_days} days` : 'lifetime' }}</span>
            </div>

            <ul class="mt-4 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <svg class="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Up to {{ plan.max_categories || 'Unlimited' }} categories</span>
              </li>
              <li class="flex items-center gap-2">
                <svg class="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Up to {{ plan.max_documents || 'Unlimited' }} documents</span>
              </li>
              <li v-if="plan.max_storage_mb" class="flex items-center gap-2">
                <svg class="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>{{ plan.max_storage_mb }} MB storage</span>
              </li>
            </ul>

            <!-- Assigned Categories -->
            <div v-if="plan.categories && plan.categories.length" class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Assigned Categories</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="cat in plan.categories" :key="cat.id"
                  class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-xs text-blue-700 dark:text-blue-300">
                  {{ cat.title }}
                </span>
              </div>
            </div>
            <div v-else class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p class="text-xs text-gray-400 italic">No categories assigned</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!plans.length && !loading" class="text-center py-20">
        <p class="text-gray-500 dark:text-gray-400">No subscription plans available. Create one to get started.</p>
      </div>
    </div>

    <!-- Create/Edit Plan Modal -->
    <div v-if="showCreateForm || editingPlan" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="closeForm">
      <div class="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ editingPlan ? 'Edit Plan' : 'Create New Plan' }}
          </h2>
          <button @click="closeForm" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="savePlan" class="space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan Name *</label>
            <input v-model="form.name" type="text" required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Pro Plan" />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea v-model="form.description" rows="2"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the plan"></textarea>
          </div>

          <!-- Price + Currency + Duration -->
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price *</label>
              <input v-model.number="form.price" type="number" step="0.01" min="0" required
                class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency *</label>
              <select v-model="form.currency" required
                class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                <option value="USD">USD ($)</option>
                <option value="KHR">KHR (៛)</option>
                <option value="THB">THB (฿)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (days)</label>
              <input v-model.number="form.duration_days" type="number" min="1"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Leave empty for lifetime" />
            </div>
          </div>

          <!-- Limits -->
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Categories</label>
              <input v-model.number="form.max_categories" type="number" min="1"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Unlimited" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Documents</label>
              <input v-model.number="form.max_documents" type="number" min="1"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Unlimited" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Storage (MB)</label>
              <input v-model.number="form.max_storage_mb" type="number" min="1"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="N/A" />
            </div>
          </div>

          <!-- Category Assignment -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assign Categories</label>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Select which categories users on this plan can access.</p>

            <div class="relative mb-3">
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

            <div v-if="loadingCategories" class="text-sm text-gray-500 py-2">Loading categories...</div>
            <div v-else class="max-h-48 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 p-3 space-y-1">
              <label v-for="cat in filteredCategories" :key="cat.id"
                class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                <input type="checkbox" :value="cat.id" v-model="form.category_ids"
                  class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ cat.title }}</span>
                <span v-if="cat.parent_id" class="text-xs text-gray-400">— subcategory</span>
              </label>
              <p v-if="!filteredCategories.length" class="text-sm text-gray-400 italic py-2">No categories match your search.</p>
            </div>
            <div v-if="form.category_ids.length > 0" class="mt-2 text-xs text-gray-500">
              {{ form.category_ids.length }} {{ form.category_ids.length === 1 ? 'category' : 'categories' }} selected
            </div>
          </div>

          <!-- Active Toggle -->
          <div class="flex items-center gap-3">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="form.is_active" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Active Plan</span>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button type="button" @click="closeForm"
              class="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
            <button type="submit" :disabled="saving"
              class="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2">
              <div v-if="saving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {{ editingPlan ? 'Update Plan' : 'Create Plan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'
import { useToast } from '../../composables/useToast.js'

const { success: toastSuccess, error: toastError } = useToast()

const plans = ref([])
const allCategories = ref([])
const loading = ref(true)
const loadingCategories = ref(false)
const showCreateForm = ref(false)
const editingPlan = ref(null)
const saving = ref(false)
const categorySearch = ref('')

const defaultForm = {
  name: '',
  description: '',
  price: 0,
  currency: 'USD',
  duration_days: null,
  max_categories: null,
  max_documents: null,
  max_text_contents: null,
  max_storage_mb: null,
  is_active: true,
  category_ids: [],
}

const form = reactive({ ...defaultForm })

const filteredCategories = computed(() => {
  if (!categorySearch.value.trim()) return allCategories.value
  const query = categorySearch.value.toLowerCase()
  return allCategories.value.filter(c => c.title.toLowerCase().includes(query))
})

async function fetchPlans() {
  loading.value = true
  try {
    const res = await apiClient.get('/admin/all-plans')
    plans.value = res.data.plans
  } catch (err) {
    console.error('Failed to load plans:', err)
  } finally {
    loading.value = false
  }
}

async function fetchCategories() {
  loadingCategories.value = true
  try {
    const res = await apiClient.get('/admin/all-categories')
    allCategories.value = res.data.categories
  } catch (err) {
    console.error('Failed to load categories:', err)
  } finally {
    loadingCategories.value = false
  }
}

function editPlan(plan) {
  editingPlan.value = plan
  Object.assign(form, {
    name: plan.name,
    description: plan.description || '',
    price: Number(plan.price),
    currency: plan.currency,
    duration_days: plan.duration_days,
    max_categories: plan.max_categories,
    max_documents: plan.max_documents,
    max_text_contents: plan.max_text_contents,
    max_storage_mb: plan.max_storage_mb,
    is_active: plan.is_active,
    category_ids: plan.categories ? plan.categories.map(c => c.id) : [],
  })
  categorySearch.value = ''
}

function closeForm() {
  showCreateForm.value = false
  editingPlan.value = null
  Object.assign(form, defaultForm)
  categorySearch.value = ''
}

async function savePlan() {
  saving.value = true
  try {
    const payload = { ...form }
    // Convert empty strings to null for optional number fields
    if (!payload.duration_days) payload.duration_days = null
    if (!payload.max_categories) payload.max_categories = null
    if (!payload.max_documents) payload.max_documents = null
    if (!payload.max_text_contents) payload.max_text_contents = null
    if (!payload.max_storage_mb) payload.max_storage_mb = null

    if (editingPlan.value) {
      await apiClient.put(`/admin/plans/${editingPlan.value.id}`, payload)
      toastSuccess('Plan updated successfully.')
    } else {
      await apiClient.post('/admin/plans', payload)
      toastSuccess('Plan created successfully.')
    }
    closeForm()
    await fetchPlans()
  } catch (err) {
    toastError(err.response?.data?.message || 'Failed to save plan.')
  } finally {
    saving.value = false
  }
}

async function deletePlan(plan) {
  if (!confirm(`Delete plan "${plan.name}"? This cannot be undone.`)) return
  try {
    await apiClient.delete(`/admin/plans/${plan.id}`)
    toastSuccess('Plan deleted successfully.')
    await fetchPlans()
  } catch (err) {
    toastError(err.response?.data?.message || 'Failed to delete plan.')
  }
}

onMounted(() => {
  fetchPlans()
  fetchCategories()
})
</script>

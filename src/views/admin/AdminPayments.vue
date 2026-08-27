<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">Payment Management</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Review and approve pending subscription payments.</p>
        </div>
        <div class="flex gap-2">
          <button @click="activeTab = 'pending'"
            :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors', activeTab === 'pending' ? 'bg-amber-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700']">
            Pending
            <span v-if="pendingCount > 0" class="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs">{{ pendingCount }}</span>
          </button>
          <button @click="activeTab = 'all'"
            :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors', activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700']">
            All Subscriptions
          </button>
        </div>
      </div>

      <!-- Pending Payments -->
      <div v-if="activeTab === 'pending'">
        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        <div v-else-if="pendingPayments.length === 0" class="text-center py-20">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-gray-500 dark:text-gray-400">No pending payments to review.</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="sub in pendingPayments" :key="sub.id"
            class="rounded-2xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span class="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                    Pending Payment
                  </span>
                  <span class="text-xs text-gray-400">#{{ sub.id }}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ sub.user?.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ sub.user?.email }}</p>
                <div class="mt-3 flex items-center gap-4 text-sm">
                  <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <svg class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span class="font-semibold">{{ sub.plan?.name }}</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-semibold">{{ sub.plan?.currency === 'KHR' ? '៛' : sub.plan?.currency === 'THB' ? '฿' : '$' }}{{ sub.plan?.currency === 'KHR' ? Number(sub.plan?.price).toLocaleString() : Number(sub.plan?.price).toFixed(2) }}</span>
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ new Date(sub.created_at).toLocaleDateString() }}
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button @click="approvePayment(sub)"
                  :disabled="processingId === sub.id"
                  class="px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2">
                  <svg v-if="processingId !== sub.id" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Approve
                </button>
                <button @click="rejectPayment(sub)"
                  :disabled="processingId === sub.id"
                  class="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2">
                  <svg v-if="processingId !== sub.id" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Subscriptions -->
      <div v-if="activeTab === 'all'">
        <div v-if="loadingAll" class="flex items-center justify-center py-20">
          <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        <div v-else class="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">User</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Plan</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Date</th>
                <th class="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="sub in allSubscriptions" :key="sub.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td class="px-4 py-3">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ sub.user?.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ sub.user?.email }}</p>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{{ sub.plan?.name }}</td>
                <td class="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  {{ sub.plan?.currency === 'KHR' ? '៛' : sub.plan?.currency === 'THB' ? '฿' : '$' }}{{ sub.plan?.currency === 'KHR' ? Number(sub.plan?.price).toLocaleString() : Number(sub.plan?.price).toFixed(2) }}
                </td>
                <td class="px-4 py-3">
                  <span :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    sub.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                    sub.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                    'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400']">
                    {{ sub.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {{ new Date(sub.created_at).toLocaleDateString() }}
                </td>
                <td class="px-4 py-3 text-right">
                  <div v-if="sub.status === 'pending'" class="flex items-center justify-end gap-1">
                    <button @click="approvePayment(sub)"
                      :disabled="processingId === sub.id"
                      class="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                      title="Approve">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button @click="rejectPayment(sub)"
                      :disabled="processingId === sub.id"
                      class="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Reject">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <span v-else class="text-xs text-gray-400">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '../../utils/apiClient.js'
import { useToast } from '../../composables/useToast.js'

const { success: toastSuccess, error: toastError } = useToast()

const activeTab = ref('pending')
const pendingPayments = ref([])
const allSubscriptions = ref([])
const loading = ref(true)
const loadingAll = ref(false)
const processingId = ref(null)

const pendingCount = computed(() => pendingPayments.value.length)

async function fetchPending() {
  loading.value = true
  try {
    const res = await apiClient.get('/admin/subscriptions/pending')
    pendingPayments.value = res.data.subscriptions
  } catch (err) {
    console.error('Failed to load pending payments:', err)
  } finally {
    loading.value = false
  }
}

async function fetchAll() {
  loadingAll.value = true
  try {
    const res = await apiClient.get('/admin/subscriptions')
    allSubscriptions.value = res.data.subscriptions
  } catch (err) {
    console.error('Failed to load subscriptions:', err)
  } finally {
    loadingAll.value = false
  }
}

async function approvePayment(sub) {
  if (!confirm(`Approve payment for ${sub.user?.name} (${sub.plan?.name})?`)) return
  processingId.value = sub.id
  try {
    await apiClient.post(`/admin/subscriptions/${sub.id}/approve`)
    toastSuccess('Payment approved and subscription activated.')
    pendingPayments.value = pendingPayments.value.filter(p => p.id !== sub.id)
    // Remove from all subscriptions list if present
    const idx = allSubscriptions.value.findIndex(s => s.id === sub.id)
    if (idx !== -1) {
      allSubscriptions.value[idx].status = 'active'
    }
  } catch (err) {
    toastError(err.response?.data?.message || 'Failed to approve payment.')
  } finally {
    processingId.value = null
  }
}

async function rejectPayment(sub) {
  if (!confirm(`Reject payment for ${sub.user?.name} (${sub.plan?.name})?`)) return
  processingId.value = sub.id
  try {
    await apiClient.post(`/admin/subscriptions/${sub.id}/reject`)
    toastSuccess('Payment rejected.')
    pendingPayments.value = pendingPayments.value.filter(p => p.id !== sub.id)
    const idx = allSubscriptions.value.findIndex(s => s.id === sub.id)
    if (idx !== -1) {
      allSubscriptions.value[idx].status = 'cancelled'
    }
  } catch (err) {
    toastError(err.response?.data?.message || 'Failed to reject payment.')
  } finally {
    processingId.value = null
  }
}

onMounted(() => {
  fetchPending()
  fetchAll()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div v-if="currentPlan" class="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-emerald-900 dark:text-emerald-100">Current Plan: {{ currentPlan.name }}</h2>
              <p class="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                Categories: {{ currentPlan.max_categories || 'Unlimited' }} | Documents: {{ currentPlan.max_documents || 'Unlimited' }} | Storage: {{ currentPlan.max_storage_mb || 'N/A' }} MB
              </p>
            </div>
            <span class="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              Active
            </span>
          </div>
        </div>

        <div v-if="purchaseMessage" class="mb-8 rounded-2xl border p-4 text-sm" :class="pendingPlan ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-200'">
          {{ purchaseMessage }}
        </div>

        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        <div v-else-if="plans.length === 0" class="text-center py-20">
          <p class="text-gray-500 dark:text-gray-400">No subscription plans available at the moment.</p>
        </div>

        <div v-else class="grid gap-8 lg:grid-cols-3">
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="relative flex flex-col rounded-3xl border-2 bg-white p-8 shadow-sm transition-all hover:shadow-lg"
            :class="[
              plan.is_recommended
                ? 'border-blue-500 ring-2 ring-blue-500/20'
                : 'border-gray-200 dark:border-gray-700'
            ]"
          >
            <div v-if="plan.is_recommended" class="absolute -top-4 left-1/2 -translate-x-1/2">
              <span class="inline-flex items-center rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                Recommended
              </span>
            </div>

            <div class="mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ plan.name }}</h3>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ plan.description }}</p>
            </div>

            <div class="mb-6">
              <span class="text-4xl font-extrabold text-gray-900 dark:text-white">
                {{ plan.formatted_price }}
              </span>
              <span v-if="plan.duration_days" class="text-sm text-gray-500 dark:text-gray-400">
                / {{ plan.duration_days }} days
              </span>
            </div>

            <div class="mb-8 space-y-3">
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Up to {{ plan.max_categories || 'Unlimited' }} categories</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Up to {{ plan.max_documents || 'Unlimited' }} documents</span>
              </div>
              <div v-if="plan.max_storage_mb" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ plan.max_storage_mb }} MB storage</span>
              </div>
              <div v-if="plan.features && plan.features.length" class="pt-3 border-t border-gray-100 dark:border-gray-700">
                <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Features</p>
                <ul class="space-y-2">
                  <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <svg class="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>

            <button
              @click="selectPlan(plan)"
              :disabled="loading || plan.current"
              class="mt-auto w-full rounded-xl py-3 px-4 text-center text-sm font-semibold transition-colors"
              :class="[
                plan.current
                  ? 'bg-green-50 text-green-700 border-2 border-green-200 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              ]"
            >
              {{ plan.current ? 'Current Plan' : Number(plan.price) > 0 ? 'Choose Paid Plan' : 'Activate Free Plan' }}
            </button>
          </div>
        </div>

        <div v-if="selectedPaidPlan" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="selectedPaidPlan = null">
          <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Sample Payment</h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">This is a static demonstration only. No money is processed.</p>
              </div>
              <button @click="selectedPaidPlan = null" class="text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">×</button>
            </div>

            <div class="mt-5 rounded-xl bg-blue-50 p-4 text-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
              <div class="flex justify-between text-sm"><span>Plan</span><strong>{{ selectedPaidPlan.name }}</strong></div>
              <div class="mt-2 flex justify-between text-sm"><span>Amount</span><strong>{{ selectedPaidPlan.formatted_price }}</strong></div>
            </div>

            <div class="mt-5 grid gap-3 sm:grid-cols-3">
              <button v-for="method in paymentMethods" :key="method.name" @click="selectedPaymentMethod = method.name" :class="['rounded-xl border p-3 text-left text-sm transition-colors', selectedPaymentMethod === method.name ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : 'border-gray-200 dark:border-gray-700']">
                <span class="block font-semibold text-gray-900 dark:text-white">{{ method.name }}</span>
                <span class="mt-1 block text-xs text-gray-500 dark:text-gray-400">{{ method.detail }}</span>
              </button>
            </div>

            <div class="mt-5 rounded-xl border border-dashed border-gray-300 p-4 text-center dark:border-gray-600">
              <img src="/qr-code.jpg" alt="Sample payment QR code" class="mx-auto h-28 w-28 rounded-lg object-cover" />
              <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Sample account: SPRITUP Center · 012 345 678</p>
            </div>

            <div class="mt-6 flex justify-end gap-3">
              <button @click="selectedPaidPlan = null" class="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</button>
              <button @click="confirmSamplePayment" :disabled="submittingPayment" class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
                {{ submittingPayment ? 'Submitting...' : 'I Have Paid (Sample)' }}
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../utils/apiClient.js'
import { useAuth } from '../stores/auth.js'

const router = useRouter()
const auth = useAuth()
const plans = ref([])
const currentPlan = ref(null)
const pendingPlan = ref(null)
const purchaseMessage = ref('')
const selectedPaidPlan = ref(null)
const selectedPaymentMethod = ref('ABA Pay')
const submittingPayment = ref(false)
const loading = ref(true)
const paymentMethods = [
  { name: 'ABA Pay', detail: 'Sample QR payment' },
  { name: 'Bank Transfer', detail: 'Sample account details' },
  { name: 'Cash', detail: 'Pay at our office' },
]

onMounted(async () => {
  try {
    const plansRes = await apiClient.get('/subscription-plans')
    plans.value = plansRes.data.plans.map(plan => ({
      ...plan,
      is_recommended: plan.slug === 'pro' || plan.slug === 'premium',
      current: false,
    }))

    if (auth.isAuthenticated) {
      const [profileRes, subscriptionsRes] = await Promise.all([
        apiClient.get('/profile'),
        apiClient.get('/subscriptions'),
      ])
      const user = profileRes.data.user
      if (user?.subscription?.plan) {
        currentPlan.value = user.subscription.plan
      }
      pendingPlan.value = subscriptionsRes.data.subscriptions?.find(subscription => subscription.status === 'pending')?.plan || null
      if (pendingPlan.value) {
        purchaseMessage.value = `${pendingPlan.value.name} is awaiting payment confirmation.`
      }
      plans.value = plans.value.map(p => ({
        ...p,
        current: p.id === user?.subscription?.plan?.id,
      }))
    }
  } catch (error) {
    console.error('Failed to load plans:', error)
  } finally {
    loading.value = false
  }
})

async function selectPlan(plan) {
  if (plan.current) return

  if (!auth.isAuthenticated) {
    router.push({ name: 'login-page', query: { redirect: '/subscription-plans' } })
    return
  }

  if (Number(plan.price) > 0) {
    selectedPaidPlan.value = plan
    return
  }

  await submitPlanSelection(plan)
}

async function confirmSamplePayment() {
  if (!selectedPaidPlan.value) return
  submittingPayment.value = true
  try {
    await submitPlanSelection(selectedPaidPlan.value)
    selectedPaidPlan.value = null
  } finally {
    submittingPayment.value = false
  }
}

async function submitPlanSelection(plan) {
  try {
    const response = await apiClient.post('/subscriptions', {
      subscription_plan_id: plan.id,
    })
    if (response.status === 202) {
      pendingPlan.value = plan
      purchaseMessage.value = response.data.message
      return
    }

    currentPlan.value = plan
    plans.value = plans.value.map(item => ({ ...item, current: item.id === plan.id }))
    purchaseMessage.value = response.data.message || 'Your plan is now active.'
    await auth.fetchUser()
  } catch (error) {
    console.error('Failed to subscribe:', error)
    alert(error.response?.data?.message || 'Failed to subscribe. Please try again.')
  }
}
</script>

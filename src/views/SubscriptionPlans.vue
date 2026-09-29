<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
          Choose your plan
        </h1>
      </div>

      <!-- Billing Cycle Toggle -->
      <div class="mb-10 flex justify-center">
        <div class="inline-flex items-center rounded-[5px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
          <button @click="billingCycle = 'monthly'" class="rounded-[5px] px-4 py-1.5 text-sm font-medium transition-all"
            :class="billingCycle === 'monthly'
              ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'">
            Pay monthly
          </button>
          <button @click="billingCycle = 'yearly'"
            class="flex items-center gap-1.5 rounded-[5px] px-4 py-1.5 text-sm font-medium transition-all" :class="billingCycle === 'yearly'
              ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'">
            Pay yearly
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </button>
        </div>
      </div>

      <!-- Current plan -->
      <CurrentPlanBanner v-if="currentPlan" :plan="currentPlan" />

      <!-- Message -->
      <PurchaseMessage v-if="purchaseMessage" :message="purchaseMessage" :pending-plan="pendingPlan" />

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>

      <!-- Empty -->
      <div v-else-if="plans.length === 0" class="text-center py-20">
        <p class="text-gray-500 dark:text-gray-400">
          No subscription plans available at the moment.
        </p>
      </div>

      <!-- Plans grid -->
      <div v-else class="grid gap-6 lg:grid-cols-3 items-stretch">
        <PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" :loading="loading" :billing-cycle="billingCycle"
          @select="selectPlan" />
      </div>

      <!-- Payment modal -->
      <PaymentModal v-if="selectedPaidPlan" :plan="selectedPaidPlan" :submitting="submittingPayment"
        @close="selectedPaidPlan = null" @submit="handleReceiptSubmit" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../utils/apiClient.js'
import { useAuth } from '../stores/auth.js'

import CurrentPlanBanner from '../components/subscription/CurrentPlanBanner.vue'
import PurchaseMessage from '../components/subscription/PurchaseMessage.vue'
import PlanCard from '../components/subscription/PlanCard.vue'
import PaymentModal from '../components/subscription/PaymentModal.vue'

const router = useRouter()
const auth = useAuth()

const plans = ref([])
const currentPlan = ref(null)
const pendingPlan = ref(null)
const purchaseMessage = ref('')
const selectedPaidPlan = ref(null)
const submittingPayment = ref(false)
const loading = ref(true)
const billingCycle = ref('monthly') // 'monthly' | 'yearly'

onMounted(async () => {
  try {
    const plansRes = await apiClient.get('/subscription-plans')
    plans.value = plansRes.data.plans.map(plan => ({
      ...plan,
      is_recommended: plan.slug === 'pro' || plan.slug === 'premium',
      current: false,
    }))

    if (auth.isAuthenticated) {
      const subscriptionsRes = await apiClient.get('/subscriptions')

      const subscriptions = subscriptionsRes.data.subscriptions || []
      const activeSubs = subscriptions.filter(subscription =>
        subscription.status === 'active' &&
        (!subscription.ends_at || new Date(subscription.ends_at) > new Date())
      )
      const activePlanIds = activeSubs.filter(s => s?.plan).map(s => s.plan.id)
      currentPlan.value = activeSubs[0]?.plan || null

      const pendingSub = subscriptionsRes.data.subscriptions?.find(
        s => s.status === 'pending'
      )
      pendingPlan.value = pendingSub?.plan || null

      if (pendingPlan.value) {
        purchaseMessage.value = `${pendingPlan.value.name} is awaiting payment confirmation.`
      }

      plans.value = plans.value.map(p => ({
        ...p,
        current: activePlanIds.includes(p.id),
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

async function handleReceiptSubmit({ plan, receipt, reference, billingCycle }) {
  submittingPayment.value = true
  try {
    const form = new FormData()
    form.append('plan_id', String(plan.id))
    form.append('receipt', receipt)
    form.append('billing_cycle', billingCycle) // send to backend
    if (reference) form.append('reference', reference)

    const response = await apiClient.post('/payments/receipt', form)

    pendingPlan.value = plan
    purchaseMessage.value =
      response.data.message ||
      'Receipt submitted for approval. You will be notified after review.'
    selectedPaidPlan.value = null
  } catch (error) {
    alert(
      error.response?.data?.message ||
      error.response?.data?.errors?.receipt?.[0] ||
      'Unable to submit the receipt. Please try again.'
    )
  } finally {
    submittingPayment.value = false
  }
}

async function submitPlanSelection(plan) {
  try {
    const response = await apiClient.post('/subscriptions', {
      subscription_plan_id: plan.id,
      billing_cycle: billingCycle.value, // send to backend
    })

    if (response.status === 202) {
      pendingPlan.value = plan
      purchaseMessage.value = response.data.message
      return
    }

    currentPlan.value = plan
    plans.value = plans.value.map(item => ({
      ...item,
      current: item.id === plan.id,
    }))
    purchaseMessage.value = response.data.message || 'Your plan is now active.'
    await auth.fetchUser()
  } catch (error) {
    console.error('Failed to subscribe:', error)
    alert(error.response?.data?.message || 'Failed to subscribe. Please try again.')
  }
}
</script>

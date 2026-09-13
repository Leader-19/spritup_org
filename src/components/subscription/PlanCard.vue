<template>
  <div
    class="relative flex flex-col rounded-3xl border-2 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800"
    :class="plan.is_recommended
      ? 'border-blue-500 ring-2 ring-blue-500/20'
      : 'border-gray-200 dark:border-gray-700'"
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

    <!-- Price based on billing cycle -->
    <div class="mb-6">
      <span class="text-4xl font-extrabold text-gray-900 dark:text-white">
        {{ displayPrice }}
      </span>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ displayPeriod }}
      </span>

      <!-- Optional: show original monthly price when yearly is selected -->
      <p
        v-if="billingCycle === 'yearly' && plan.formatted_price"
        class="mt-1 text-xs text-gray-400 line-through"
      >
        {{ plan.formatted_price }}/month
      </p>
    </div>

    <div class="mb-8 space-y-3">
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <CheckIcon class="h-5 w-5 text-green-500" />
        <span>Up to {{ plan.max_categories || 'Unlimited' }} categories</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <CheckIcon class="h-5 w-5 text-green-500" />
        <span>Up to {{ plan.max_documents || 'Unlimited' }} documents</span>
      </div>
      <div v-if="plan.max_storage_mb" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <CheckIcon class="h-5 w-5 text-green-500" />
        <span>{{ plan.max_storage_mb }} MB storage</span>
      </div>

      <div v-if="plan.features?.length" class="pt-3 border-t border-gray-100 dark:border-gray-700">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Features
        </p>
        <ul class="space-y-2">
          <li
            v-for="feature in plan.features"
            :key="feature"
            class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <CheckIcon class="h-5 w-5 text-blue-500 flex-shrink-0" />
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>

    <button
      :disabled="loading || plan.current"
      class="mt-auto w-full rounded-xl py-3 px-4 text-center text-sm font-semibold transition-colors"
      :class="plan.current
        ? 'bg-green-50 text-green-700 border-2 border-green-200 cursor-default'
        : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'"
      @click="$emit('select', plan)"
    >
      {{ plan.current ? 'Current Plan' : Number(plan.price) > 0 ? 'Choose Paid Plan' : 'Activate Free Plan' }}
    </button>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'

const props = defineProps({
  plan: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  billingCycle: {
    type: String,
    default: 'monthly' // 'monthly' | 'yearly'
  }
})

defineEmits(['select'])

const displayPrice = computed(() => {
  if (props.billingCycle === 'yearly') {
    return props.plan.formatted_yearly_price || props.plan.formatted_price
  }
  return props.plan.formatted_price
})

const displayPeriod = computed(() => {
  return props.billingCycle === 'yearly' ? '/ year' : '/ month'
})

const CheckIcon = {
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M5 13l4 4L19 7',
    }),
  ]),
}
</script>

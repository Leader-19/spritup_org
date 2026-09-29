<template>
  <div class="h-full flex flex-col rounded-[5px] border overflow-hidden bg-white dark:bg-gray-800"
    :class="plan.is_recommended ? 'border-brand-500 ring-1 ring-brand-500' : 'border-gray-200 dark:border-gray-700'">

    <div v-if="plan.is_recommended" class="p-6 pb-8 bg-gradient-to-br from-brand-600 to-indigo-600 text-white">
      <h3 class="text-base font-semibold">{{ plan.name }}</h3>
      <p class="mt-2 text-sm text-white/80 leading-relaxed">{{ plan.description }}</p>
    </div>
    <div v-else class="p-6">
      <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ plan.name }}</h3>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ plan.description }}</p>
    </div>

    <div class="p-6" :class="plan.is_recommended ? '-mt-4' : 'pt-0'">
      <!-- Price based on billing cycle -->
      <div class="flex items-baseline gap-1">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ displayPrice }}</span>
        <span class="text-[10px] text-gray-400 dark:text-gray-500">USD {{ displayPeriod }}</span>
      </div>
      <p v-if="billingCycle === 'yearly' && plan.formatted_price" class="mt-1 text-xs text-gray-400 line-through">
        {{ plan.formatted_price }}/month
      </p>

      <button
        :disabled="loading || plan.current"
        class="mt-6 w-full rounded-[5px] py-2.5 text-sm font-medium transition-colors"
        :class="planButtonClass"
        @click="$emit('select', plan)"
      >
        {{ plan.current ? 'Current Plan' : Number(plan.price) > 0 ? `Get ${plan.name}` : 'Activate Free Plan' }}
      </button>
    </div>

    <div class="flex-1 border-t border-gray-100 dark:border-gray-700 p-6 pt-4 space-y-2.5">
      <div class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Check class="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <span>Up to {{ plan.max_categories || 'Unlimited' }} categories</span>
      </div>
      <div class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Check class="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <span>Up to {{ plan.max_documents || 'Unlimited' }} documents</span>
      </div>
      <div v-if="plan.max_storage_mb" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Check class="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <span>{{ plan.max_storage_mb }} MB storage</span>
      </div>
      <div v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
        <Check class="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <span>{{ feature }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

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
  return props.billingCycle === 'yearly' ? '/year' : '/month'
})

const planButtonClass = computed(() => {
  if (props.plan.current) {
    return 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-default'
  }
  if (props.plan.is_recommended) {
    return 'bg-brand-600 hover:bg-brand-700 text-white'
  }
  return 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-white text-white dark:text-gray-900'
})
</script>

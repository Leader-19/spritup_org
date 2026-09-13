<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        @click.self="$emit('close')">
        <div class="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900">

            <!-- Header -->
            <div class="relative border-b border-gray-100 px-6 py-5 dark:border-gray-800">
                <div class="flex items-start justify-between">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                            Complete Payment
                        </h2>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Follow the steps below to activate your plan
                        </p>
                    </div>
                    <button @click="$emit('close')"
                        class="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Progress Steps -->
                <div class="mt-6 flex items-center justify-between">
                    <div v-for="(label, index) in steps" :key="index" class="flex flex-1 items-center">
                        <div class="flex flex-col items-center">
                            <div class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all"
                                :class="stepClass(index + 1)">
                                <svg v-if="step > index + 1" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                <span v-else>{{ index + 1 }}</span>
                            </div>
                            <span class="mt-1.5 text-[11px] font-medium"
                                :class="step >= index + 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'">
                                {{ label }}
                            </span>
                        </div>

                        <div v-if="index < steps.length - 1" class="mx-2 h-0.5 flex-1 rounded-full"
                            :class="step > index + 1 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'" />
                    </div>
                </div>
            </div>

            <!-- Body -->
            <div class="px-6 py-6">

                <!-- Plan Summary Card -->
                <div
                    class="mb-5 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-blue-900/40 dark:from-blue-950/40 dark:to-indigo-950/30">
                    <div class="flex items-center justify-between px-5 py-4">
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-blue-600/80 dark:text-blue-400">
                                Selected Plan
                            </p>
                            <p class="mt-0.5 text-lg font-bold text-gray-900 dark:text-white">
                                {{ plan.name }}
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                            <p class="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                                {{ displayAmount }}
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ billingCycle === 'yearly' ? 'per year' : 'per month' }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Billing Cycle Selector (only on step 1) -->
                <div v-if="step === 1" class="mb-6">
                    <p class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Choose billing period
                    </p>

                    <div class="grid grid-cols-2 gap-3">
                        <!-- Monthly -->
                        <button type="button" @click="billingCycle = 'monthly'"
                            class="relative rounded-xl border-2 p-4 text-left transition-all" :class="billingCycle === 'monthly'
                                ? 'border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30'
                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'">
                            <div class="flex items-center justify-between">
                                <span class="font-semibold text-gray-900 dark:text-white">Monthly</span>
                                <div class="flex h-5 w-5 items-center justify-center rounded-full border-2" :class="billingCycle === 'monthly'
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300 dark:border-gray-600'">
                                    <div v-if="billingCycle === 'monthly'" class="h-2 w-2 rounded-full bg-white" />
                                </div>
                            </div>
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {{ plan.formatted_price }} / month
                            </p>
                        </button>

                        <!-- Yearly -->
                        <button type="button" @click="billingCycle = 'yearly'"
                            class="relative rounded-xl border-2 p-4 text-left transition-all" :class="billingCycle === 'yearly'
                                ? 'border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30'
                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'">
                            <div class="absolute -top-2.5 right-3">
                                <span class="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                    Save 20%
                                </span>
                            </div>

                            <div class="flex items-center justify-between">
                                <span class="font-semibold text-gray-900 dark:text-white">Yearly</span>
                                <div class="flex h-5 w-5 items-center justify-center rounded-full border-2" :class="billingCycle === 'yearly'
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300 dark:border-gray-600'">
                                    <div v-if="billingCycle === 'yearly'" class="h-2 w-2 rounded-full bg-white" />
                                </div>
                            </div>
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {{ plan.formatted_yearly_price || plan.formatted_price }} / year
                            </p>
                        </button>
                    </div>
                </div>

                <!-- ========== STEP 1: Scan & Pay ========== -->
                <div v-if="step === 1" class="space-y-5">
                    <div
                        class="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800/50">
                        <img src="/qr-code.jpg" alt="Payment QR Code"
                            class="mx-auto h-52 w-52 rounded-xl object-contain shadow-sm" />
                        <p class="mt-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Scan this QR code with your banking app
                        </p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Please pay exactly
                            <span class="font-semibold text-gray-800 dark:text-gray-200">{{ displayAmount }}</span>
                        </p>
                    </div>

                    <div
                        class="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                        <div class="flex gap-2">
                            <svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>After payment, take a screenshot of the receipt and continue to the next step.</span>
                        </div>
                    </div>
                </div>

                <!-- ========== STEP 2: Upload Receipt ========== -->
                <div v-if="step === 2" class="space-y-5">
                    <div>
                        <label class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Upload payment screenshot
                        </label>

                        <label
                            class="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 transition hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:border-blue-500 dark:hover:bg-blue-950/20"
                            :class="{ 'border-blue-500 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/20': file }">
                            <input type="file" accept="image/jpeg,image/png,image/webp" class="hidden"
                                @change="onFileSelect" />

                            <template v-if="!preview">
                                <div class="mb-3 rounded-full bg-blue-100 p-3 dark:bg-blue-900/40">
                                    <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                </div>
                                <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Click to upload or drag & drop
                                </p>
                                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    JPG, PNG or WEBP (max 5MB)
                                </p>
                            </template>

                            <template v-else>
                                <img :src="preview" class="mb-3 max-h-40 rounded-lg shadow-sm" alt="Receipt preview" />
                                <p class="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    {{ file?.name }}
                                </p>
                                <p class="mt-1 text-xs text-gray-500">Click to change image</p>
                            </template>
                        </label>
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Payment reference <span class="font-normal text-gray-400">(optional)</span>
                        </label>
                        <input v-model="localReference" type="text" maxlength="100"
                            placeholder="e.g. Transaction ID or last 4 digits"
                            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                    </div>
                </div>

                <!-- ========== STEP 3: Review ========== -->
                <div v-if="step === 3" class="space-y-4">
                    <div
                        class="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50">
                        <h3
                            class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Review your submission
                        </h3>

                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Plan</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ plan.name }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Billing</span>
                                <span class="font-medium text-gray-900 dark:text-white capitalize">{{ billingCycle
                                    }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Amount</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ displayAmount }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Receipt</span>
                                <span class="max-w-[180px] truncate font-medium text-gray-900 dark:text-white">
                                    {{ file?.name }}
                                </span>
                            </div>
                            <div v-if="localReference" class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Reference</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ localReference }}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
                        <div class="flex gap-2">
                            <svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Your receipt will be reviewed shortly. You’ll be notified once approved.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Actions -->
            <div
                class="flex items-center justify-between gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-800">
                <button v-if="step > 1" @click="step--"
                    class="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                    ← Back
                </button>
                <button v-else @click="$emit('close')"
                    class="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                    Cancel
                </button>

                <button v-if="step === 1" @click="step = 2"
                    class="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                    Next
                </button>

                <button v-else-if="step === 2" @click="step = 3" :disabled="!file"
                    class="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Review
                </button>

                <button v-else @click="submit" :disabled="submitting"
                    class="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50">
                    <span v-if="submitting" class="flex items-center gap-2">
                        <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                    </span>
                    <span v-else>Submit for Approval</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    plan: {
        type: Object,
        required: true
    },
    submitting: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'submit'])

const steps = ['Scan & Pay', 'Upload', 'Review']
const step = ref(1)
const file = ref(null)
const preview = ref('')
const localReference = ref('')
const billingCycle = ref('monthly')

const displayAmount = computed(() => {
    if (billingCycle.value === 'yearly') {
        return props.plan.formatted_yearly_price || props.plan.formatted_price
    }
    return props.plan.formatted_price
})

watch(() => props.plan, () => {
    step.value = 1
    file.value = null
    preview.value = ''
    localReference.value = ''
    billingCycle.value = 'monthly'
})

function stepClass(n) {
    if (step.value > n) return 'bg-blue-600 text-white'
    if (step.value === n) return 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/50'
    return 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
}

function onFileSelect(event) {
    const selected = event.target.files?.[0]
    if (!selected) return

    if (
        !['image/jpeg', 'image/png', 'image/webp'].includes(selected.type) ||
        selected.size > 5 * 1024 * 1024
    ) {
        alert('Please choose a JPG, PNG, or WEBP image smaller than 5 MB.')
        event.target.value = ''
        return
    }

    file.value = selected
    preview.value = URL.createObjectURL(selected)
}

function submit() {
    emit('submit', {
        plan: props.plan,
        receipt: file.value,
        reference: localReference.value,
        billingCycle: billingCycle.value
    })
}
</script>
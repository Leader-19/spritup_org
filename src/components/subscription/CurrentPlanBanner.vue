<template>
    <div
        class="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h2 class="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                    Current Plan: {{ plan.name }}
                </h2>
                <p class="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                    Categories: {{ plan.max_categories || 'Unlimited' }} |
                    Documents: {{ plan.max_documents || 'Unlimited' }} |
                    Storage: {{ plan.max_storage_mb || 'N/A' }} MB
                </p>
            </div>
            <span
                class="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Active
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    plan: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <div class="mb-8 rounded-2xl border p-4 text-sm"
        :class="pendingPlan
            ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-200'
            : 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-200'">
        <p>{{ message }}</p>

        <div v-if="pendingPlan" class="mt-3">
            <a href="https://t.me/Leader_DEV1" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-xl bg-[#229ED9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a8cb8] transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.26-5.61 3.7-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 3.97-1.73 6.62-2.87 7.94-3.44 3.77-1.59 4.56-1.87 5.07-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .37z" />
                </svg>
                Contact on Telegram to confirm payment
            </a>
        </div>
    </div>
</template>

<script setup>
defineProps({
    message: {
        type: String,
        required: true
    },
    pendingPlan: {
        type: Object,
        default: null
    }
})
</script>
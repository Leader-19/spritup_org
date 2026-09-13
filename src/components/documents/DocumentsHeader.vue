<template>
    <div class="mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-3 flex-wrap">
                <div>
                    <div class="flex items-center gap-2.5">
                        <h1
                            class="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
                            {{ currentLang === 'en' ? 'Documents' : 'ឯកសារ' }}
                        </h1>
                        <span v-if="!loading"
                            class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400 border border-brand-200 dark:border-brand-800/80">
                            {{ count }} {{ currentLang === 'en' ? 'docs' : 'ឯកសារ' }}
                        </span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {{ currentLang === 'en'
                            ? 'Browse official legal and regulatory documents'
                            : 'ស្វែងរក និងអានឯកសារច្បាប់ និងបទដ្ឋានគតិយុត្ត' }}
                    </p>
                </div>

                <div v-if="currentCategory"
                    class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-xs font-medium text-brand-700 dark:text-brand-300 shadow-sm">
                    <span>{{ currentLang === 'en' ? getCategoryLabel(currentCategory.title) : currentCategory.title
                        }}</span>
                    <button @click="$emit('clear-category')"
                        class="p-0.5 hover:bg-brand-200 dark:hover:bg-brand-800 rounded-full transition-colors"
                        :title="currentLang === 'en' ? 'Clear category' : 'លុបការជ្រើសរើស'">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="w-full md:w-80 lg:w-96 relative">
                <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input :value="searchQuery" @input="$emit('update:searchQuery', $event.target.value)"
                    @keyup.enter="$emit('search')" type="text"
                    :placeholder="currentLang === 'en' ? 'Search documents...' : 'ស្វែងរកឯកសារ...'"
                    class="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/80 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 shadow-sm transition-all" />
                <button v-if="searchQuery" @click="$emit('clear-search')"
                    class="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    currentLang: { type: String, required: true },
    loading: Boolean,
    count: { type: Number, default: 0 },
    searchQuery: { type: String, default: '' },
    currentCategory: { type: Object, default: null },
    getCategoryLabel: { type: Function, required: true }
})
defineEmits(['update:searchQuery', 'search', 'clear-search', 'clear-category'])
</script>
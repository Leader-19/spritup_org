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
                            class="px-2.5 py-0.5 rounded-[5px] text-xs font-semibold bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400 border border-brand-200 dark:border-brand-800/80">
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
                    class="flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-xs font-medium text-brand-700 dark:text-brand-300 shadow-sm">
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

            <div class="w-full md:w-80 lg:w-96 relative flex items-center">
                <Search class="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input :value="searchQuery" @input="$emit('update:searchQuery', $event.target.value)"
                    @keyup.enter="$emit('search')" type="search"
                    :placeholder="currentLang === 'en' ? 'Search documents...' : 'ស្វែងរកឯកសារ...'"
                    class="w-full appearance-none rounded-[5px] bg-gray-100 dark:bg-gray-800/80 py-1.5 pl-8 pr-8 text-sm text-gray-900 dark:text-gray-200 outline-none focus-visible:outline-none transition-colors placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600" />
                <button v-if="searchQuery" @click="$emit('clear-search')"
                    class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-[5px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next'

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
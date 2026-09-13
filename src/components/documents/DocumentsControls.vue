<template>
    <div
        class="mt-4 p-2 sm:p-2.5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
        <div
            class="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800">
            <button @click="$emit('update:viewMode', 'grid')" :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200']">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
                <span>{{ currentLang === 'en' ? 'Grid' : 'ទិដ្ឋភាពកាត' }}</span>
            </button>

            <button @click="$emit('update:viewMode', 'list')" :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                viewMode === 'list'
                    ? 'bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200']">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>{{ currentLang === 'en' ? 'List' : 'ទិដ្ឋភាពបញ្ជី' }}</span>
            </button>
        </div>

        <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div class="relative flex items-center">
                <div class="absolute left-3 pointer-events-none text-gray-400">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                </div>
                <select :value="sortBy" @change="$emit('update:sortBy', $event.target.value)"
                    class="appearance-none pl-8 pr-8 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/80 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer transition">
                    <option value="newest">{{ currentLang === 'en' ? 'Newest first' : 'ថ្មីបំផុត' }}</option>
                    <option value="oldest">{{ currentLang === 'en' ? 'Oldest first' : 'ចាស់បំផុត' }}</option>
                    <option value="title_asc">{{ currentLang === 'en' ? 'Title A-Z' : 'ចំណងជើង A-Z' }}</option>
                    <option value="title_desc">{{ currentLang === 'en' ? 'Title Z-A' : 'ចំណងជើង Z-A' }}</option>
                    <option value="category">{{ currentLang === 'en' ? 'By category' : 'តាមប្រភេទ' }}</option>
                </select>
                <div class="absolute right-2.5 pointer-events-none text-gray-400">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div class="relative flex items-center">
                <div class="absolute left-3 pointer-events-none text-gray-400">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <select :value="itemsPerPage" @change="$emit('update:itemsPerPage', Number($event.target.value))"
                    class="appearance-none pl-8 pr-8 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/80 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer transition">
                    <option v-for="opt in perPageOptions" :key="opt" :value="opt">
                        {{ currentLang === 'en' ? `${opt} per page` : `${opt} ក្នុងមួយទំព័រ` }}
                    </option>
                </select>
                <div class="absolute right-2.5 pointer-events-none text-gray-400">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    currentLang: { type: String, required: true },
    viewMode: { type: String, default: 'grid' },
    sortBy: { type: String, default: 'newest' },
    itemsPerPage: { type: Number, default: 10 },
    perPageOptions: { type: Array, default: () => [10, 20, 30, 40, 50, 100] }
})
defineEmits(['update:viewMode', 'update:sortBy', 'update:itemsPerPage'])
</script>
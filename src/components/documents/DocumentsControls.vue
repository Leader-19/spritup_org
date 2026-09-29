<template>
    <div
        class="relative z-30 mt-4 p-2 sm:p-2.5 rounded-[5px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
        <div
            class="flex items-center p-1 rounded-[5px] bg-gray-100 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800">
            <button @click="$emit('update:viewMode', 'grid')" :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-all',
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

            <button @click="$emit('update:viewMode', 'list')" :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-all',
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
            <div ref="sortRef" class="relative">
                <button @click="sortOpen = !sortOpen; perPageOpen = false" type="button"
                    class="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-[5px] bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/80 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 outline-none focus-visible:outline-none transition">
                    <svg class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    <span class="whitespace-nowrap">{{ currentSortLabel }}</span>
                    <ChevronDown :size="12" :stroke-width="2.5" class="text-gray-400 transition-transform" :class="sortOpen ? 'rotate-180' : ''" />
                </button>

                <div :class="['absolute right-0 top-full mt-1.5 min-w-[160px] rounded-[5px] border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg py-1 z-20 transition-all duration-150 ease-out',
                    sortOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1']">
                    <button v-for="opt in sortOptions" :key="opt.value" @click="selectSort(opt.value)"
                        :class="['block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60',
                            sortBy === opt.value ? 'font-semibold text-brand-600 dark:text-brand-400' : 'text-gray-600 dark:text-gray-300']">
                        {{ currentLang === 'en' ? opt.label : opt.labelKh }}
                    </button>
                </div>
            </div>

            <div ref="perPageRef" class="relative">
                <button @click="perPageOpen = !perPageOpen; sortOpen = false" type="button"
                    class="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-[5px] bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/80 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 outline-none focus-visible:outline-none transition">
                    <svg class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span class="whitespace-nowrap">{{ currentPerPageLabel }}</span>
                    <ChevronDown :size="12" :stroke-width="2.5" class="text-gray-400 transition-transform" :class="perPageOpen ? 'rotate-180' : ''" />
                </button>

                <div :class="['absolute right-0 top-full mt-1.5 min-w-[140px] rounded-[5px] border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg py-1 z-20 transition-all duration-150 ease-out',
                    perPageOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1']">
                    <button v-for="opt in perPageOptions" :key="opt" @click="selectPerPage(opt)"
                        :class="['block w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60',
                            itemsPerPage === opt ? 'font-semibold text-brand-600 dark:text-brand-400' : 'text-gray-600 dark:text-gray-300']">
                        {{ currentLang === 'en' ? `${opt} per page` : `${opt} ក្នុងមួយទំព័រ` }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
    currentLang: { type: String, required: true },
    viewMode: { type: String, default: 'grid' },
    sortBy: { type: String, default: 'newest' },
    itemsPerPage: { type: Number, default: 10 },
    perPageOptions: { type: Array, default: () => [10, 20, 30, 40, 50, 100] }
})
const emit = defineEmits(['update:viewMode', 'update:sortBy', 'update:itemsPerPage'])

const sortOptions = [
    { value: 'newest', label: 'Newest first', labelKh: 'ថ្មីបំផុត' },
    { value: 'oldest', label: 'Oldest first', labelKh: 'ចាស់បំផុត' },
    { value: 'title_asc', label: 'Title A-Z', labelKh: 'ចំណងជើង A-Z' },
    { value: 'title_desc', label: 'Title Z-A', labelKh: 'ចំណងជើង Z-A' },
    { value: 'category', label: 'By category', labelKh: 'តាមប្រភេទ' },
]

const sortOpen = ref(false)
const perPageOpen = ref(false)
const sortRef = ref(null)
const perPageRef = ref(null)

const currentSortLabel = computed(() => {
    const opt = sortOptions.find((o) => o.value === props.sortBy) ?? sortOptions[0]
    return props.currentLang === 'en' ? opt.label : opt.labelKh
})

const currentPerPageLabel = computed(() => {
    return props.currentLang === 'en' ? `${props.itemsPerPage} per page` : `${props.itemsPerPage} ក្នុងមួយទំព័រ`
})

const selectSort = (value) => {
    emit('update:sortBy', value)
    sortOpen.value = false
}

const selectPerPage = (value) => {
    emit('update:itemsPerPage', Number(value))
    perPageOpen.value = false
}

const handleClickOutside = (event) => {
    if (sortRef.value && !sortRef.value.contains(event.target)) sortOpen.value = false
    if (perPageRef.value && !perPageRef.value.contains(event.target)) perPageOpen.value = false
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

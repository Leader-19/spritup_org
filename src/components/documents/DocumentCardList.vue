<template>
    <div class="space-y-3.5">
        <div v-for="doc in documents" :key="doc.id" @click="$emit('view', doc)"
            class="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800/95 border border-gray-200/80 dark:border-gray-700/80 shadow-sm hover:shadow-lg hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-200 cursor-pointer">
            <div
                class="w-full sm:w-44 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex-shrink-0 overflow-hidden relative border border-gray-200/50 dark:border-gray-700/50">
                <img v-if="doc.image" :src="docImage(doc)" :alt="doc.doc_name"
                    class="block w-full h-auto" />
                <div v-else class="flex flex-col items-center justify-center text-gray-400 gap-1.5 p-3 text-center">
                    <svg class="w-7 h-7 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="text-[10px] uppercase font-semibold text-gray-500">
                        {{ doc.categoryTitle || (currentLang === 'en' ? 'Document' : 'ឯកសារ') }}
                    </span>
                </div>
                <span v-if="doc.doc_upload"
                    class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white uppercase">
                    {{ doc.doc_upload.split('.').pop() }}
                </span>
            </div>

            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span v-if="doc.categoryTitle"
                        class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
                        {{ doc.categoryTitle }}
                    </span>
                    <span v-if="doc.doc_code" class="text-xs font-mono text-gray-500 dark:text-gray-400">{{ doc.doc_code
                        }}</span>
                    <span v-if="doc.created_at" class="text-xs text-gray-400">• {{ formatDate(doc.created_at) }}</span>
                </div>

                <h3
                    class="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-1">
                    {{ doc.doc_name }}
                </h3>

                <p v-if="doc.description" class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed"
                    :class="isExpanded(doc.id) ? '' : 'line-clamp-2'">
                    {{ doc.description }}
                </p>

                <button v-if="doc.description && doc.description.length > 100"
                    @click.stop="$emit('toggle-expand', doc.id)"
                    class="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline mt-1">
                    {{ isExpanded(doc.id) ? (currentLang === 'en' ? 'See less' : 'បង្រួញ') : (currentLang === 'en' ?
                        'See more' : 'មើលបន្ថែម') }}
                </button>
            </div>

            <div class="flex sm:flex-col items-center gap-2 self-end sm:self-center flex-shrink-0">
                <button v-if="isAuthenticated" @click.stop="$emit('toggle-library', doc)"
                    :class="['p-2 rounded-xl border transition-colors',
                        libraryIds.has(doc.id)
                            ? 'bg-brand-50 border-brand-300 text-brand-600 dark:bg-brand-950/50 dark:border-brand-800 dark:text-brand-400'
                            : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:text-brand-600 dark:text-gray-500 dark:hover:text-brand-400']">
                    <svg class="w-4 h-4" :fill="libraryIds.has(doc.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>

                <span v-if="isAuthenticated"
                    class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap">
                    <span>{{ currentLang === 'en' ? 'Read' : 'អាន' }}</span>
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </span>
                <span v-else
                    class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>{{ currentLang === 'en' ? 'Register to Read' : 'ចុះឈ្មោះដើម្បីអាន' }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    documents: { type: Array, required: true },
    currentLang: { type: String, required: true },
    isAuthenticated: Boolean,
    libraryIds: { type: Set, required: true },
    isExpanded: { type: Function, required: true },
    formatDate: { type: Function, required: true },
    docImage: { type: Function, required: true }
})
defineEmits(['view', 'toggle-library', 'toggle-expand'])
</script>

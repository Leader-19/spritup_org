<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div
      v-for="doc in documents"
      :key="doc.id"
      @click="$emit('view', doc)"
      class="group rounded-2xl bg-white dark:bg-gray-800/95 border border-gray-200/80 dark:border-gray-700/80 shadow-sm hover:shadow-xl hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1"
    >
      <div class="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex-shrink-0">
        <img
          v-if="doc.image"
          :src="docImage(doc)"
          :alt="doc.doc_name"
          class="block w-full h-auto"
        />
        <div v-else class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 gap-2 p-4 text-center">
          <div class="w-12 h-12 rounded-2xl bg-gray-200 dark:bg-gray-700/80 flex items-center justify-center">
            <svg class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span class="text-[11px] font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
            {{ doc.categoryTitle || (currentLang === 'en' ? 'Legal Document' : 'ឯកសារច្បាប់') }}
          </span>
        </div>

        <span
          v-if="doc.categoryTitle"
          class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-white/40 dark:border-gray-700/50 text-[11px] font-semibold text-brand-600 dark:text-brand-400 shadow-sm line-clamp-1 max-w-[170px]"
        >
          {{ doc.categoryTitle }}
        </span>

        <button
          v-if="isAuthenticated"
          @click.stop="$emit('toggle-library', doc)"
          :class="['absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm',
            libraryIds.has(doc.id)
              ? 'bg-brand-600 text-white shadow-brand-500/30'
              : 'bg-white/90 dark:bg-gray-900/90 text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400']"
        >
          <svg class="w-4 h-4" :fill="libraryIds.has(doc.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>

        <span
          v-if="doc.doc_upload"
          class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md backdrop-blur-md bg-gray-900/80 text-[10px] font-bold uppercase tracking-wider text-white"
        >
          {{ doc.doc_upload.split('.').pop() }}
        </span>
      </div>

      <div class="p-4 flex-1 flex flex-col min-h-0">
        <div class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-1.5">
          <span v-if="doc.doc_code" class="font-mono font-medium text-brand-600/80 dark:text-brand-400/80">{{ doc.doc_code }}</span>
          <span v-if="doc.created_at">{{ formatDate(doc.created_at) }}</span>
        </div>

        <h3 class="font-bold text-base text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-2 leading-snug">
          {{ doc.doc_name }}
        </h3>

        <p
          v-if="doc.description"
          class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-2"
          :class="isExpanded(doc.id) ? '' : 'line-clamp-2'"
        >
          {{ doc.description }}
        </p>

        <button
          v-if="doc.description && doc.description.length > 80"
          @click.stop="$emit('toggle-expand', doc.id)"
          class="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline mb-3 self-start"
        >
          {{ isExpanded(doc.id) ? (currentLang === 'en' ? 'See less' : 'បង្រួញ') : (currentLang === 'en' ? 'See more' : 'មើលបន្ថែម') }}
        </button>

        <div class="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between gap-2">
          <span
            v-if="isAuthenticated"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform"
          >
            <span>{{ currentLang === 'en' ? 'Read Document' : 'អានឯកសារ' }}</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>{{ currentLang === 'en' ? 'Register to Read' : 'ចុះឈ្មោះដើម្បីអាន' }}</span>
          </span>
        </div>
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

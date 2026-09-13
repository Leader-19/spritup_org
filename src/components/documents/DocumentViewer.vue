<template>
  <transition name="fade">
    <div v-if="open"
      class="relative w-full h-[calc(100vh-140px)] mt-4 bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
      <div class="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 text-white">
        <div class="flex items-center gap-2.5 min-w-0">
          <span v-if="fileExt"
            class="px-2 py-0.5 rounded bg-brand-500 text-[10px] font-bold uppercase tracking-wider text-white flex-shrink-0">
            {{ fileExt }}
          </span>
          <h3 class="font-semibold text-sm sm:text-base truncate">
            {{ doc?.doc_name }}
          </h3>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button v-if="isAuthenticated && doc" @click="$emit('toggle-library', doc)"
            :class="['p-2 rounded-xl transition-colors',
              libraryIds.has(doc?.id) ? 'text-brand-400 hover:text-brand-300 bg-brand-950/50' : 'text-gray-400 hover:text-white bg-gray-800/80']">
            <svg class="w-4 h-4" :fill="libraryIds.has(doc?.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button @click="$emit('close')"
            class="p-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-xl transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="h-[calc(100vh-200px)] w-full bg-white dark:bg-gray-950">
        <iframe v-if="fileExt === 'pdf'" :src="fileUrl" class="w-full h-full border-0"></iframe>

        <div v-else-if="['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExt)"
          class="w-full h-full flex items-center justify-center p-4 bg-gray-900">
          <img :src="fileUrl" class="max-h-full max-w-full object-contain rounded-lg shadow-md" />
        </div>

        <iframe v-else-if="isHtmlContent" :srcdoc="content" class="w-full h-full border-0"></iframe>

        <pre v-else-if="content" class="p-6 text-sm h-full overflow-auto text-gray-800 dark:text-gray-200">
{{ content }}
        </pre>

        <div v-else class="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
          <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{{ currentLang === 'en' ? 'No preview available' : 'មិនមានការមើលជាមុនសម្រាប់ឯកសារនេះទេ' }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  open: Boolean,
  doc: { type: Object, default: null },
  content: { type: String, default: '' },
  fileExt: { type: String, default: '' },
  fileUrl: { type: String, default: '' },
  isHtmlContent: Boolean,
  isAuthenticated: Boolean,
  libraryIds: { type: Set, required: true },
  currentLang: { type: String, required: true }
})
defineEmits(['close', 'toggle-library'])
</script>
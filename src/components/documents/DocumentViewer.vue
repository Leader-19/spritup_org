<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-[100] flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>

      <!-- Viewer Container -->
      <div class="relative w-full h-full max-w-[100vw] max-h-[100vh] flex flex-col bg-white dark:bg-gray-900">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 bg-gray-900 text-white flex-shrink-0">
          <h3 class="font-semibold truncate text-sm sm:text-base">
            {{ document?.doc_name || 'Document' }}
          </h3>
          <div class="flex items-center gap-2">
            <a v-if="fileUrl" :href="fileUrl" target="_blank" download
              class="p-2 hover:bg-gray-800 rounded transition-colors" title="Download">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <button @click="$emit('close')" class="p-2 hover:bg-gray-800 rounded transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Viewer Body -->
        <div class="flex-1 overflow-hidden">
          <!-- PDF -->
          <iframe v-if="fileExt === 'pdf'" :src="fileUrl" class="w-full h-full border-0"></iframe>

          <!-- Image -->
          <div v-else-if="isImage" class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
            <img :src="fileUrl" class="max-h-full max-w-full object-contain rounded-lg shadow-lg" />
          </div>

          <!-- DOCX HTML -->
          <iframe v-else-if="isHtmlContent" :srcdoc="documentContent" class="w-full h-full border-0"></iframe>

          <!-- Text -->
          <pre v-else-if="documentContent" class="p-6 text-sm h-full overflow-auto bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
{{ documentContent }}
          </pre>

          <!-- Loading -->
          <div v-else-if="loading" class="flex items-center justify-center h-full">
            <div class="text-center">
              <div class="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Loading document...</p>
            </div>
          </div>

          <!-- Fallback -->
          <div v-else class="flex items-center justify-center h-full text-gray-500">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No preview available</p>
              <a v-if="fileUrl" :href="fileUrl" target="_blank" download
                class="mt-4 inline-block px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm">
                Download File
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import apiClient from '../../utils/apiClient.js'
import { API_URL } from '../../config/env.js'

const props = defineProps({
  visible: Boolean,
  document: Object,
})

const emit = defineEmits(['close'])

const documentContent = ref('')
const loading = ref(false)

const fileExt = computed(() => {
  return props.document?.doc_upload?.split('.').pop()?.toLowerCase()
})

const isImage = computed(() => {
  return ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExt.value)
})

const isHtmlContent = computed(() => {
  return documentContent.value && documentContent.value.includes('<')
})

const fileUrl = computed(() => {
  if (!props.document?.doc_upload) return ''
  return `${API_URL}/storage/${props.document.doc_upload}`
})

watch(() => props.visible, async (val) => {
  if (val && props.document) {
    documentContent.value = ''
    loading.value = false

    if (fileExt.value === 'docx') {
      loading.value = true
      try {
        const response = await apiClient.get(`/documents/${props.document.id}/content`)
        documentContent.value = response.data.content || ''
      } catch (error) {
        console.error('Error fetching document content:', error)
        documentContent.value = 'Failed to load document content'
      } finally {
        loading.value = false
      }
    }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

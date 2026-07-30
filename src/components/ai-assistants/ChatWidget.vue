<template>
  <div class="flex flex-col h-full">
    <!-- Chat Header -->
    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v3M15 17h2a2 2 0 002-2V9"/>
          </svg>
        </div>
        <div>
          <p class="font-display font-semibold text-sm text-gray-800 dark:text-gray-200">
            {{ currentLang === 'en' ? 'Doc AI' : 'AI ឯកសារ' }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ currentLang === 'en' ? 'Ask about documents' : 'សួរអំពីឯកសារ' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
      <div v-for="msg in messages" :key="msg.id" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
        <div :class="['max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed',
          msg.role === 'user'
            ? 'bg-brand-600 text-white rounded-br-sm'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm']">
          {{ msg.content }}
        </div>
      </div>

      <div v-if="aiTyping" class="flex justify-start">
        <div class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl rounded-bl-sm px-3 py-2">
          <div class="flex gap-1">
            <div class="dot w-1.5 h-1.5 rounded-full bg-brand-400"></div>
            <div class="dot w-1.5 h-1.5 rounded-full bg-brand-400"></div>
            <div class="dot w-1.5 h-1.5 rounded-full bg-brand-400"></div>
          </div>
        </div>
      </div>
    </div>

<!-- Input -->
      <div class="p-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2">
          <input ref="fileInput" type="file" accept="image/*" class="hidden"
            @change="handleImageUpload" />
          <button @click="triggerFileInput"
            class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            :title="currentLang === 'en' ? 'Upload image' : 'អាប់ឡូដរូបភាព'">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <input v-model="chatInput" @keyup.enter="sendMessage"
            :placeholder="currentLang === 'en' ? 'Ask...' : 'សួរ...'"
            class="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-400/40 transition" />
          <button @click="sendMessage" :disabled="!chatInput.trim() || aiTyping"
            class="w-8 h-8 rounded-lg bg-brand-600 disabled:opacity-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { API_BASE } from '../../config/env.js'

defineProps({
  currentLang: { type: String, default: 'en' }
})

const chatInput = ref('')
const aiTyping = ref(false)
const fileInput = ref(null)
const messages = ref([
  { id: 1, role: 'assistant', content: 'Hi! How can I help you find documents?' },
])

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    messages.value.push({
      id: messages.value.length + 1,
      role: 'assistant',
      content: currentLang === 'en'
        ? 'Sorry, I can only process image files. Please upload a valid image (PNG, JPG, etc.).'
        : 'សូមអបអរ ខ្ញុំអាចដំណើរការឯកសាររូបភាពបានតែបន្លែប៉ុណ្ណ។ សូមអាប់ឡូដរូបភាពដែលត្រឹមត្រូវ (PNG, JPG ជាដើម)...',
    })
    event.target.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = async (e) => {
    const imageData = e.target?.result
    messages.value.push({ id: messages.value.length + 1, role: 'user', content: '[Image]' })
    aiTyping.value = true

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMsg = errorData.error || errorData.message || response.statusText
        throw new Error(errorMsg)
      }

      const data = await response.json()
      aiTyping.value = false
      messages.value.push({ id: messages.value.length + 1, role: 'assistant', content: data.reply || data.message || 'I received your image.' })
    } catch (error) {
      aiTyping.value = false
      const errorMessage = error.message || ''
      const isImageError = errorMessage.toLowerCase().includes('image') || errorMessage.toLowerCase().includes('png') || errorMessage.toLowerCase().includes('cannot read')

      if (isImageError) {
        messages.value.push({
          id: messages.value.length + 1,
          role: 'assistant',
          content: currentLang === 'en'
            ? "I'm sorry, but I cannot process images. Please try asking a text-based question about your documents instead."
            : "សូមអបអរ ខ្ញុំមិនអាចដំណើរការរូបភាពបាន។ សូមសួរបន្ថែមអំពីឯកសាររបស់លោកអ្នកដោយប្រើអត្ថបទជាបន្តបន្ទ។",
        })
      } else {
        messages.value.push({
          id: messages.value.length + 1,
          role: 'assistant',
          content: currentLang === 'en'
            ? 'Something went wrong. Please try again.'
            : 'មានបញ្ហាមួយកើតឡើង។ សូមព្យាយាមម្តងទៀត។',
        })
      }
    }
  }
  reader.onerror = () => {
    aiTyping.value = false
    messages.value.push({
      id: messages.value.length + 1,
      role: 'assistant',
      content: currentLang === 'en'
        ? 'Failed to read the image. Please try again.'
        : 'មិនអាចអានរូបភាព។ សូមព្យាយាមម្តងទៀត។',
    })
  }
  reader.readAsDataURL(file)
  event.target.value = ''
}

const sendMessage = () => {
  if (!chatInput.value.trim() || aiTyping.value) return

  const userMessage = chatInput.value
  messages.value.push({ id: messages.value.length + 1, role: 'user', content: userMessage })
  chatInput.value = ''
  aiTyping.value = true

  setTimeout(() => {
    messages.value.push({ id: messages.value.length + 1, role: 'assistant', content: 'I can help you search legal documents. What type are you looking for?' })
    aiTyping.value = false
  }, 1000)
}
</script>
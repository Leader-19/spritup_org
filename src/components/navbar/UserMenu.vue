<template>
  <div class="relative">
    <button @click="open = !open" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors">
      <div class="relative flex-shrink-0">
        <img :src="auth.user?.avatar_url || '/placeholder-user.jpg'" alt="Profile"
          @error="e => { e.target.onerror = null; e.target.src = '/placeholder-user.jpg' }"
          class="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" />
        <span v-if="libraryCount > 0"
          :class="['absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-brand-600 text-white text-[10px] font-bold leading-none ring-2 ring-white dark:ring-gray-900 transition-transform', badgePulse ? 'badge-pulse' : '']">
          {{ libraryCount > 99 ? '99+' : libraryCount }}
        </span>
      </div>
      <span class="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{{ auth.user?.name }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div :class="['absolute right-0 top-full mt-2 w-52 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 bg-white dark:bg-gray-900',
      open ? 'lang-visible' : 'lang-hidden']">
      <router-link to="/settings/profile" @click="open = false" class="block px-4 py-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ auth.user?.name }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ auth.user?.email }}</p>
        <span v-if="auth.isAdmin" class="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">Admin</span>
        <span v-else class="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">Normal</span>
      </router-link>

      <div class="border-t border-gray-100 dark:border-gray-800 px-4 py-2.5">
        <label for="navbar-avatar-upload"
          class="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 rounded-lg cursor-pointer transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          <span>{{ currentLang === 'en' ? 'Upload Photo' : 'ផ្ទុករូបថត' }}</span>
        </label>
        <input id="navbar-avatar-upload" type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
      </div>

      <router-link to="/library" @click="open = false" class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        {{ currentLang === 'en' ? 'My Library' : 'បណ្ណាល័យរបស់ខ្ញុំ' }}
      </router-link>
      <router-link to="/reading-history" @click="open = false" class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {{ currentLang === 'en' ? 'Reading History' : 'ប្រវត្តិនៃការអាន' }}
      </router-link>
      <router-link to="/settings/profile" @click="open = false" class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        {{ currentLang === 'en' ? 'Settings' : 'ការកំណត់' }}
      </router-link>
      <router-link v-if="!auth.isAdmin" to="/subscription-plans" @click="open = false" class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
        {{ currentLang === 'en' ? 'Subscription Plans' : 'គម្រោង' }}
      </router-link>
      <a v-else :href="adminWebUrl" @click="open = false" class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
        {{ currentLang === 'en' ? 'Manage Plans' : 'គ្រប់គ្រងគម្រោង' }}
      </a>
      <button @click="logout" class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        {{ currentLang === 'en' ? 'Sign out' : 'ចាកចេញ' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAuth } from '../../stores/auth.js'
import { useToast } from '../../composables/useToast.js'
import { useLibrary } from '../../composables/useLibrary.js'
import { ADMIN_WEB_URL } from '../../config/env.js'

const props = defineProps({
  currentLang: {
    type: String,
    default: 'en',
  },
})

const emit = defineEmits(['logout'])

const auth = useAuth()
const adminWebUrl = ADMIN_WEB_URL
const { success: toastSuccess, error: toastError } = useToast()
const { libraryCount, fetchLibraryIds, suppressBadgeToast } = useLibrary()

const open = ref(false)
const avatarUploading = ref(false)
const previousCount = ref(null)
const badgePulse = ref(false)
let isInitialLoad = true

const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const lang = props.currentLang || 'en'

  if (!file.type.startsWith('image/')) {
    toastError(lang === 'en' ? 'Please select an image file.' : 'សូមជ្រើសរើីឯកសាររូបភាព។')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    toastError(lang === 'en' ? 'Image must be under 2MB.' : 'រូបភាពត្រូវតែតិចជាង 2MB។')
    return
  }

  avatarUploading.value = true
  try {
    await auth.uploadAvatar(file)
    open.value = false
    toastSuccess(lang === 'en' ? 'Profile photo updated.' : 'បានធ្វើបច្ចុប្បន្នភាពរូបថតដោយជោគជ័យ។')
  } catch (err) {
    toastError(err.response?.data?.message || (lang === 'en' ? 'Failed to upload photo.' : 'បរាជ័យក្នុងការផ្ទុករូបថត។'))
  } finally {
    avatarUploading.value = false
    event.target.value = ''
  }
}

const logout = () => {
  open.value = false
  emit('logout')
}

const triggerBadgePulse = () => {
  badgePulse.value = false
  requestAnimationFrame(() => {
    badgePulse.value = true
    setTimeout(() => { badgePulse.value = false }, 600)
  })
}

watch(libraryCount, (newCount, oldCount) => {
  if (isInitialLoad) {
    isInitialLoad = false
    previousCount.value = newCount
    return
  }

  // Always pulse the badge when count changes
  if (newCount !== (oldCount ?? 0)) {
    triggerBadgePulse()
  }

  previousCount.value = newCount

  if (suppressBadgeToast.value) {
    suppressBadgeToast.value = false
    return
  }

  const lang = props.currentLang || 'en'
  if (newCount > (oldCount ?? 0)) {
    toastSuccess(lang === 'en' ? `Library updated — ${newCount} document${newCount !== 1 ? 's' : ''} saved` : `បណ្ណាល័យបានធ្វើបច្ចុប្បន្នភាព — ${newCount} ឯកសារ`)
  } else if (newCount < (oldCount ?? 0)) {
    toastSuccess(lang === 'en' ? `Library updated — ${newCount} document${newCount !== 1 ? 's' : ''} saved` : `បណ្ណាល័យបានធ្វើបច្ចុប្បន្នភាព — ${newCount} ឯកសារ`)
  }
})

onMounted(() => {
  fetchLibraryIds()
})
</script>

<style scoped>
@keyframes badge-pulse-anim {
  0% { transform: scale(1); }
  30% { transform: scale(1.4); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.badge-pulse {
  animation: badge-pulse-anim 0.5s ease-out;
}
</style>

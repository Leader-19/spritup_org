<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        {{ currentLang === 'en' ? 'Profile Settings' : 'ការកំណត់ប្រវត្តិរូប' }}
      </h1>

      <div class="bg-white dark:bg-gray-800 rounded-[5px] p-6 shadow">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ currentLang === 'en' ? 'Profile Photo' : 'រូបថតផ្ទាល់ខ្លួន' }}
        </h2>
        <div class="flex items-center gap-6">
          <div class="relative">
            <img
              :src="previewAvatar || auth.user?.avatar_url || '/placeholder-user.jpg'"
              alt="Avatar"
              class="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
            <label for="avatar-upload" class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center cursor-pointer hover:bg-brand-700 transition-colors shadow">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </label>
            <input id="avatar-upload" type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ currentLang === 'en' ? 'Upload a new profile photo.' : 'អាប់ឡូតរូបថតថ្មី។' }}
            </p>
            <p class="text-xs text-gray-400 mt-1">
              {{ currentLang === 'en' ? 'JPG, PNG up to 2MB' : 'JPG, PNG អាប់ឡូតៈ 2MB' }}
            </p>
          </div>
        </div>
        <div v-if="avatarError" class="mt-3 text-sm text-red-600 dark:text-red-400">{{ avatarError }}</div>
        <div v-if="avatarSuccess" class="mt-3 text-sm text-green-600 dark:text-green-400">{{ avatarSuccess }}</div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-[5px] p-6 shadow">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ currentLang === 'en' ? 'Personal Information' : 'ព័ត៌មានផ្ទាល់ខ្លួន' }}
        </h2>
        <form @submit.prevent="handleProfileUpdate" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Full name' : 'ឈ្មោះពេញ' }}</label>
            <input v-model="name" type="text" required class="w-full px-4 py-2.5 rounded-[5px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus-visible:outline-none transition" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Email' : 'អ៊ីមែល' }}</label>
            <input v-model="email" type="email" required class="w-full px-4 py-2.5 rounded-[5px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus-visible:outline-none transition" />
          </div>
          <div v-if="profileError" class="p-3 rounded-[5px] bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">{{ profileError }}</div>
          <div v-if="profileSuccess" class="p-3 rounded-[5px] bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-sm text-green-600 dark:text-green-400">{{ profileSuccess }}</div>
          <button type="submit" :disabled="profileLoading" class="px-6 py-2.5 rounded-[5px] bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {{ profileLoading ? (currentLang === 'en' ? 'Saving...' : 'កំពុងរក្សាទុក...') : (currentLang === 'en' ? 'Save Changes' : 'រក្សាទុកការផ្លាស់ប្តូរ') }}
          </button>
        </form>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-[5px] p-6 shadow">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ currentLang === 'en' ? 'Change Password' : 'ប្តូរពាក្យសម្ងាត់' }}
        </h2>
        <form @submit.prevent="handlePasswordUpdate" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Current password' : 'ពាក្យសម្ងាត់បច្ចុប្បន្ន' }}</label>
            <input v-model="currentPassword" type="password" required class="w-full px-4 py-2.5 rounded-[5px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus-visible:outline-none transition" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'New password' : 'ពាក្យសម្ងាត់ថ្មី' }}</label>
            <input v-model="newPassword" type="password" required minlength="8" class="w-full px-4 py-2.5 rounded-[5px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus-visible:outline-none transition" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ currentLang === 'en' ? 'Confirm new password' : 'បញ្ជាក់ពាក្យសម្ងាត់ថ្មី' }}</label>
            <input v-model="newPasswordConfirmation" type="password" required class="w-full px-4 py-2.5 rounded-[5px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus-visible:outline-none transition" />
          </div>
          <div v-if="passwordError" class="p-3 rounded-[5px] bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">{{ passwordError }}</div>
          <div v-if="passwordSuccess" class="p-3 rounded-[5px] bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-sm text-green-600 dark:text-green-400">{{ passwordSuccess }}</div>
          <button type="submit" :disabled="passwordLoading" class="px-6 py-2.5 rounded-[5px] bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {{ passwordLoading ? (currentLang === 'en' ? 'Updating...' : 'កំពុងធ្វើបច្ចុប្បន្នភាព...') : (currentLang === 'en' ? 'Update Password' : 'ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import apiClient from '../../utils/apiClient.js'
import { useAuth } from '../../stores/auth.js'

const currentLang = inject('currentLang')
const auth = useAuth()

const name = ref(auth.user?.name || '')
const email = ref(auth.user?.email || '')
const previewAvatar = ref(auth.user?.avatar_url || null)
const avatarFile = ref(null)

const profileLoading = ref(false)
const profileError = ref('')
const profileSuccess = ref('')

const currentPassword = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')
const passwordLoading = ref(false)
const passwordError = ref('')
const passwordSuccess = ref('')

const avatarError = ref('')
const avatarSuccess = ref('')

watch(() => auth.user, (user) => {
  if (user) {
    name.value = user.name || ''
    email.value = user.email || ''
    previewAvatar.value = user.avatar_url || null
  }
})

const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    avatarError.value = currentLang.value === 'en' ? 'Please select an image file.' : 'សូមជ្រើសរើសឯកសាររូបភាព។'
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    avatarError.value = currentLang.value === 'en' ? 'Image must be under 2MB.' : 'រូបភាពត្រូវតែតិចជាង 2MB។'
    return
  }

  avatarFile.value = file
  avatarError.value = ''
  avatarSuccess.value = ''
  previewAvatar.value = URL.createObjectURL(file)

  try {
    const data = await auth.uploadAvatar(file)
    if (data.user) {
      auth.setAuth({ token: auth.token, user: data.user })
    }
    avatarSuccess.value = currentLang.value === 'en' ? 'Avatar updated successfully.' : 'បានធ្វើបច្ចុប្បន្នភាពរូបថតដោយជោគជ័យ។'
    avatarError.value = ''
  } catch (err) {
    avatarError.value = err.response?.data?.message || (currentLang.value === 'en' ? 'Failed to upload avatar.' : 'បរាជ័យក្នុងការអាប៊ូតរូបថត។')
    avatarSuccess.value = ''
  }
}

const handleProfileUpdate = async () => {
  profileLoading.value = true
  profileError.value = ''
  profileSuccess.value = ''
  try {
    const response = await apiClient.put('/profile', {
      name: name.value,
      email: email.value,
    })
    const data = response.data
    if (data.user) {
      auth.setAuth({ token: auth.token, user: data.user })
    }
    profileSuccess.value = currentLang.value === 'en' ? 'Profile updated successfully.' : 'បានធ្វើបច្ចុប្បន្នភាពព័ត៌មានផ្ទាល់ខ្លួនដោយជោគជ័យ។'
  } catch (err) {
    profileError.value = err.response?.data?.message || (currentLang.value === 'en' ? 'Failed to update profile.' : 'បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពព័ត៌មានផ្ទាល់ខ្លួន។')
    if (err.response?.data?.errors) {
      const firstError = Object.values(err.response.data.errors)[0]
      profileError.value = Array.isArray(firstError) ? firstError[0] : firstError
    }
  } finally {
    profileLoading.value = false
  }
}

const handlePasswordUpdate = async () => {
  if (newPassword.value !== newPasswordConfirmation.value) {
    passwordError.value = currentLang.value === 'en' ? 'Passwords do not match.' : 'ពាក្យសម្ងាត់មិនដំណូចទេ។'
    return
  }

  passwordLoading.value = true
  passwordError.value = ''
  passwordSuccess.value = ''
  try {
    await apiClient.put('/profile/password', {
      current_password: currentPassword.value,
      password: newPassword.value,
      password_confirmation: newPasswordConfirmation.value,
    })
    passwordSuccess.value = currentLang.value === 'en' ? 'Password updated successfully.' : 'បានធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់ដោយជោគជ័យ។'
    currentPassword.value = ''
    newPassword.value = ''
    newPasswordConfirmation.value = ''
  } catch (err) {
    passwordError.value = err.response?.data?.message || (currentLang.value === 'en' ? 'Failed to update password.' : 'បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់។')
    if (err.response?.data?.errors) {
      const firstError = Object.values(err.response.data.errors)[0]
      passwordError.value = Array.isArray(firstError) ? firstError[0] : firstError
    }
  } finally {
    passwordLoading.value = false
  }
}
</script>

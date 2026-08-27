import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../utils/apiClient.js'
import { useAuth } from '../stores/auth.js'
import { useToast } from './useToast.js'

// Module-level singleton state — shared across all components
const libraryIds = ref(new Set())
const loadingLibrary = ref(false)
const suppressBadgeToast = ref(false)

export function useLibrary() {
  const router = useRouter()
  const auth = useAuth()
  const { success: toastSuccess, error: toastError } = useToast()

  const libraryCount = computed(() => libraryIds.value.size)

  const fetchLibraryIds = async () => {
    if (!auth.isAuthenticated) {
      libraryIds.value = new Set()
      return
    }
    loadingLibrary.value = true
    try {
      const response = await apiClient.get('/library')
      const items = response.data.data || []
      libraryIds.value = new Set(items.map(item => item.id || item.document_id))
    } catch (err) {
      console.error('Failed to fetch library:', err)
    } finally {
      loadingLibrary.value = false
    }
  }

  const toggleLibrary = async (doc, lang = 'en') => {
    if (!auth.isAuthenticated) {
      router.push('/login')
      return
    }
    const isInLibrary = libraryIds.value.has(doc.id)
    try {
      if (isInLibrary) {
        await apiClient.delete(`/library/${doc.id}`)
        libraryIds.value.delete(doc.id)
        toastSuccess(lang === 'en' ? 'Removed from library' : 'បានលុបពីបណ្ណាល័យ')
      } else {
        await apiClient.post('/library', { document_id: doc.id })
        libraryIds.value.add(doc.id)
        toastSuccess(lang === 'en' ? 'Added to library' : 'បានបន្ថែមទៅបណ្ណាល័យ')
      }
    } catch (err) {
      toastError(err.response?.data?.message || (lang === 'en' ? 'Failed to update library' : 'បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពបណ្ណាល័យ'))
    }
  }

  return {
    libraryIds,
    libraryCount,
    loadingLibrary,
    fetchLibraryIds,
    toggleLibrary,
    suppressBadgeToast,
  }
}

import { reactive } from 'vue'
import apiClient from '../utils/apiClient.js'

const STORAGE_KEY = 'auth_user'
const TOKEN_KEY = 'auth_token'
const TOKEN_EXPIRY_KEY = 'auth_token_expiry'

const state = reactive({
  user: null,
  token: localStorage.getItem(TOKEN_KEY) || null,
  tokenExpiry: localStorage.getItem(TOKEN_EXPIRY_KEY) || null,
})

const isTokenExpired = () => {
  if (!state.tokenExpiry) return true
  return Date.now() > parseInt(state.tokenExpiry)
}

const loadUser = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      state.user = JSON.parse(raw)
    } catch {
      state.user = null
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}

const fetchUser = async () => {
  try {
    const response = await apiClient.get('/profile')
    const data = response.data
    if (data.user) {
      setAuth(data)
    }
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}

const fetchUserCategories = async () => {
  try {
    const response = await apiClient.get('/my-categories')
    const data = response.data
    if (data.categories && state.user) {
      const categoryIds = data.categories.map(c => c.id)
      state.user.assigned_category_ids = categoryIds
      state.user.assigned_categories = data.categories
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user))
    }
  } catch (error) {
    console.error('Failed to fetch user categories:', error)
  }
}

const setAuth = (data) => {
  if (data.token !== undefined) {
    state.token = data.token
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000)
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
      state.tokenExpiry = expiryTime.toString()
    } else {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(TOKEN_EXPIRY_KEY)
      state.tokenExpiry = null
    }
  }
  if (data.user !== undefined) {
    state.user = data.user
    if (data.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user))
      if (data.user.subscription?.plan) {
        state.user.category_limit = data.user.subscription.plan.max_categories
        state.user.document_limit = data.user.subscription.plan.max_documents
      }
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}

const updateUser = (user) => {
  state.user = { ...state.user, ...user }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user))
}

const uploadAvatar = async (file) => {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await apiClient.post('/profile/avatar', formData)
  const data = response.data
  if (data.user) {
    state.user = data.user
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user))
  }
  return data
}

const refreshToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh')
    if (response.data.token) {
      setAuth(response.data)
      return true
    }
  } catch (error) {
    console.error('Token refresh failed:', error)
  }
  clearAuth()
  return false
}

const clearAuth = () => {
  state.token = null
  state.user = null
  state.tokenExpiry = null
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(TOKEN_EXPIRY_KEY)
}

const logout = async () => {
  try {
    await apiClient.post('/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    clearAuth()
  }
}

const auth = Object.assign(state, {
  setAuth,
  updateUser,
  uploadAvatar,
  refreshToken,
  logout,
  fetchUser,
  fetchUserCategories,
  clearAuth,
})

Object.defineProperties(auth, {
  isAuthenticated: {
    enumerable: true,
    get: () => Boolean(state.token) && !isTokenExpired(),
  },
  isAdmin: {
    enumerable: true,
    get: () => state.user?.roles?.some((role) =>
      (typeof role === 'string' ? role : role.name) === 'Admin'
    ) ?? false,
  },
  categoryLimit: {
    enumerable: true,
    get: () => state.user?.category_limit ?? null,
  },
  documentLimit: {
    enumerable: true,
    get: () => state.user?.document_limit ?? null,
  },
  assignedCategoryIds: {
    enumerable: true,
    get: () => state.user?.assigned_category_ids ?? [],
  },
})

loadUser()

if (auth.isAuthenticated && isTokenExpired()) {
  clearAuth()
}

export function useAuth() {
  return auth
}

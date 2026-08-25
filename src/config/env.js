const isProduction = import.meta.env.PROD

export const API_BASE = isProduction
  ? 'https://admin.spritup.site/api'
  : '/api'

// In development, use Vite proxy (same origin)
// In production, use the backend URL directly
export const API_URL = isProduction
  ? 'https://admin.spritup.site'
  : ''

export const APP_NAME = 'SPRITUP'
export const APP_URL = isProduction
  ? 'https://spritup.site'
  : 'http://localhost:3000'
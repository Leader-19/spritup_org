import { createApp } from 'vue'
import App from './App.vue'
import './globals.css'
import router from './routes'
import { useAuth } from './stores/auth.js'
import { useToast } from './composables/useToast'
import { registerSW } from 'virtual:pwa-register'

const { add, success } = useToast()

const updateSW = registerSW({
  onNeedRefresh() {
    add('New version available! Tap to update.', 'info', 10000, () => {
      updateSW(true)
    })
  },
  onOfflineReady() {
    success('App ready for offline use!', 4000)
  },
  onRegistrationError(error) {
    console.error('PWA registration error:', error)
  }
})

const app = createApp(App)

app.use(router)

const auth = useAuth()

window.addEventListener('auth:logout', () => {
  auth.clearAuth()
})

app.mount('#app')

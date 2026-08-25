<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import { useAuth } from './stores/auth.js'

const route = useRoute()
const auth = useAuth()

const authRoutes = ['/login', '/register']
const showLayout = computed(() => !authRoutes.includes(route.path))

const handleLogout = () => {
  auth.clearAuth()
}

onMounted(() => {
  window.addEventListener('auth:logout', handleLogout)
})

onUnmounted(() => {
  window.removeEventListener('auth:logout', handleLogout)
})
</script>

<template>
  <DefaultLayout v-if="showLayout" />
  <router-view v-else />
</template>
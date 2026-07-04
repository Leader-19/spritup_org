<template>
    <Navbar :is-dark="isDark" :current-lang="currentLang" :active-submenu="activeSubmenu"
        @toggle-sidebar-left="sidebarLeftOpen = !sidebarLeftOpen" @toggle-dark="toggleDark"
        @menu-click="setActiveSubmenu" @set-lang="setLang" />

    <SidebarLeft :sidebar-left-open="sidebarLeftOpen" :current-lang="currentLang" :active-submenu="activeSubmenu"
        @toggle="sidebarLeftOpen = !sidebarLeftOpen" @close="sidebarLeftOpen = true" @menu-click="setActiveSubmenu" />

    <Sidebar :sidebar-open="sidebarOpen" :is-mobile="isMobile" :current-lang="currentLang" @close="sidebarOpen = false"
        @toggle="sidebarOpen = !sidebarOpen" />

    <main :class="['transition-all duration-300 min-h-screen bg-gray-50 dark:bg-gray-950',
        sidebarLeftOpen ? 'lg:pl-64' : 'lg:pl-0',
        sidebarOpen ? 'lg:pr-72' : 'lg:pr-0']">
        <div class="pt-20 pb-12 px-4 lg:px-8 min-h-[calc(100vh-64px)]">
            <router-view />
        </div>

    </main>
    <Footer :current-lang="currentLang" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import SidebarLeft from './SidebarLeft.vue'
import Footer from './Footer.vue'

const sidebarLeftOpen = ref(true)
const sidebarOpen = ref(false)
const isDark = ref(false)
const currentLang = ref('kh')
const isMobile = ref(false)
const activePage = ref('home-page')
const activeSubmenu = ref('home')
const route = useRoute()

provide('currentLang', currentLang)

const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024
}

const toggleDark = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

const setLang = (lang) => {
    currentLang.value = lang
}

const setActiveSubmenu = (menu) => {
     activeSubmenu.value = menu
     if (menu === 'ai-chat') {
         sidebarOpen.value = true
         sidebarLeftOpen.value = false
     } else if (menu === 'home' || menu === 'documents' || menu === 'settings' || menu === 'help') {
         sidebarLeftOpen.value = !!menu
         sidebarOpen.value = false
     } else {
         sidebarLeftOpen.value = false
         sidebarOpen.value = false
     }
 }

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    activePage.value = route.name
    if (route.name === 'home-page') {
        activeSubmenu.value = 'home'
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})

watch(() => route.name, (newName) => {
    if (newName === 'home-page') {
        activeSubmenu.value = 'home'
    }
})
</script>
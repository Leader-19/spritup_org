<template>
    <Navbar :is-dark="isDark" :current-lang="currentLang" :active-submenu="activeSubmenu"
        @toggle-sidebar-left="sidebarLeftOpen = !sidebarLeftOpen" @toggle-dark="toggleDark"
        @menu-click="setActiveSubmenu" @set-lang="setLang" />

    <SidebarLeft :sidebar-left-open="sidebarLeftOpen" :current-lang="currentLang" :active-submenu="activeSubmenu"
        :collapsed="sidebarCollapsed" @toggle="sidebarLeftOpen = !sidebarLeftOpen" @close="sidebarLeftOpen = true" 
        @menu-click="setActiveSubmenu" @toggle-collapsed="sidebarCollapsed = !sidebarCollapsed" />

    <Sidebar :sidebar-open="sidebarOpen" :is-mobile="isMobile" :current-lang="currentLang" @close="sidebarOpen = false"
        @toggle="sidebarOpen = !sidebarOpen" />

    <main :class="['transition-all duration-300 min-h-screen bg-gray-50 dark:bg-gray-950',
        sidebarLeftOpen ? (sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64') : 'lg:pl-0',
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
import { useSeo } from '../composables/useSeo'
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
const sidebarCollapsed = ref(false)
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
    if (route.name === 'home-page' || route.name === 'home-about-page') {
      activeSubmenu.value = 'home'
    } else if (route.name === 'settings-page' || route.name?.startsWith('settings-')) {
      activeSubmenu.value = 'settings'
    } else if (route.name === 'help-page' || route.name?.startsWith('help-')) {
      activeSubmenu.value = 'help'
    }
  })

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})

const seo = useSeo()

const seoMap = {
  'home-page': {
    title: 'SPRITUP center - Home',
    description: 'Explore documents, laws, decrees, and more with SPRITUP center.',
    keywords: 'documents, laws, decrees, constitution, dashboard, sharing',
    ogImage: '/placeholder-logo.png',
  },
  'documents-page': {
    title: 'Documents - SPRITUP center',
    description: 'Browse and manage your documents efficiently.',
    keywords: 'documents, management, files',
  },
  'home-about-page': {
    title: 'About SPRITUP center',
    description: 'Learn about our objective, mission, vision, contact, and how you can support us through donations.',
    keywords: 'about, objective, mission, vision, contact, donate',
    ogImage: '/placeholder-logo.png',
  },
  'dashboard-page': {
    title: 'Dashboard - SPRITUP center',
    description: 'View your dashboard metrics and insights.',
    keywords: 'dashboard, metrics, insights',
    noindex: true,
  },
  'donate-page': {
    title: 'Donate - SPRITUP center',
    description: 'Support us to keep SPRITUP center running.',
    keywords: 'donate, support, contribution',
    ogImage: '/placeholder-logo.png',
  },
  'contact-page': {
    title: 'Contact Us - SPRITUP center',
    description: 'Get in touch with our team.',
    keywords: 'contact, support, email, phone',
    ogImage: '/placeholder-logo.png',
  },
  'all-documents-page': {
    title: 'All Documents - SPRITUP center',
    description: 'Browse all available documents.',
    keywords: 'all documents, browse, list',
  },
  'law-documents-page': {
    title: 'Law Documents - SPRITUP center',
    description: 'Explore law documents and regulations.',
    keywords: 'law documents, regulations, legal',
  },
  'krom-documents-page': {
    title: 'Krom Documents - SPRITUP center',
    description: 'Browse Krom documents.',
    keywords: 'krom documents',
  },
  'brakeas-documents-page': {
    title: 'Brakeas Documents - SPRITUP center',
    description: 'Browse Brakeas documents.',
    keywords: 'brakeas documents',
  },
  'constitution-documents-page': {
    title: 'Constitution Documents - SPRITUP center',
    description: 'Explore Constitution documents.',
    keywords: 'constitution documents, legal',
  },
  'deyka-documents-page': {
    title: 'Deyka Documents - SPRITUP center',
    description: 'Browse Deyka documents.',
    keywords: 'deyka documents',
  },
  'niyeambratebatte-documents-page': {
    title: 'Niyeambratebatte Documents - SPRITUP center',
    description: 'Browse Niyeambratebatte documents.',
    keywords: 'niyeambratebatte documents',
  },
  'preahreachokram-documents-page': {
    title: 'Preahreachokram Documents - SPRITUP center',
    description: 'Browse Preahreachokram documents.',
    keywords: 'preahreachokram documents',
  },
  'royaldecree-documents-page': {
    title: 'Royal Decree Documents - SPRITUP center',
    description: 'Browse Royal Decree documents.',
    keywords: 'royal decree documents',
  },
  'sub-decree-documents-page': {
    title: 'Sub Decree Documents - SPRITUP center',
    description: 'Browse Sub Decree documents.',
    keywords: 'sub decree documents',
  },
  'treatyconventionpact-documents-page': {
    title: 'Treaty, Convention, Pact Documents - SPRITUP center',
    description: 'Browse treaty, convention, and pact documents.',
    keywords: 'treaty, convention, pact documents',
  },
  'settings-page': {
    title: 'Settings - SPRITUP center',
    description: 'Manage your settings.',
    keywords: 'settings',
    noindex: true,
  },
  'settings-profile': {
    title: 'Profile Settings - SPRITUP center',
    description: 'Manage your profile settings.',
    keywords: 'profile, settings',
    noindex: true,
  },
  'settings-preferences': {
    title: 'Preferences - SPRITUP center',
    description: 'Manage your preferences.',
    keywords: 'preferences, settings',
    noindex: true,
  },
  'settings-privacy': {
    title: 'Privacy Settings - SPRITUP center',
    description: 'Manage your privacy settings.',
    keywords: 'privacy, settings',
    noindex: true,
  },
  'help-page': {
    title: 'Help - SPRITUP center',
    description: 'Get help and support.',
    keywords: 'help, support, faq',
  },
  'help-faq': {
    title: 'FAQ - SPRITUP center',
    description: 'Frequently asked questions.',
    keywords: 'faq, help, questions',
  },
  'help-support': {
    title: 'Support - SPRITUP center',
    description: 'Get support from our team.',
    keywords: 'support, help, contact',
    ogImage: '/placeholder-logo.png',
  },
  'help-documentation': {
    title: 'Documentation - SPRITUP center',
    description: 'Read our documentation and guides.',
    keywords: 'documentation, guides, help',
  },
}

const applySeo = (name) => {
  const data = seoMap[name]
  if (!data) {
    seo.setTitle('SPRITUP center')
    seo.setMeta('description', 'Share, manage, and explore documents efficiently.')
    seo.setProperty('og:title', 'SPRITUP center')
    seo.setProperty('og:description', 'Share, manage, and explore documents efficiently.')
    seo.setLink('canonical', 'https://spritup-org-jcyg.vercel.app/')
    seo.setMeta('robots', 'index, follow')
    seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'SPRITUP center',
      description: 'Share, manage, and explore documents efficiently.',
      url: 'https://spritup-org-jcyg.vercel.app/',
    })
    return
  }

  seo.setTitle(data.title)
  seo.setMeta('description', data.description)
  seo.setMeta('keywords', data.keywords)
  seo.setProperty('og:title', data.title)
  seo.setProperty('og:description', data.description)
  seo.setMeta('robots', data.noindex ? 'noindex, nofollow' : 'index, follow')

  const canonical = typeof data.canonical === 'string' ? data.canonical : `https://spritup-org-jcyg.vercel.app${route.path}`
  seo.setLink('canonical', canonical)

  const image = data.ogImage || 'https://spritup-org-jcyg.vercel.app/icon-dark-32x32.png'
  seo.setProperty('og:image', image)
  seo.setProperty('og:url', canonical)

  seo.setJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: data.title,
    description: data.description,
    url: canonical,
  })
}

watch(
  () => route.name,
  (newName) => {
    if (newName) {
      applySeo(newName)
    }
    if (newName === 'home-page' || newName === 'home-about-page') {
      activeSubmenu.value = 'home'
    } else if (newName === 'settings-page' || newName?.startsWith('settings-')) {
      activeSubmenu.value = 'settings'
    } else if (newName === 'help-page' || newName?.startsWith('help-')) {
      activeSubmenu.value = 'help'
    }
  }
)
</script>
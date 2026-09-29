<template>
  <div class="hero-bg min-h-[calc(100vh-4rem)]">
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
      <HomePageHeroSection :current-lang="currentLang" />
    </section>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import HomePageHeroSection from '../../components/home/HomePageHeroSection.vue';

const currentLang = inject('currentLang')
</script>

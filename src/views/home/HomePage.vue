<template>
  <div class="hero-bg min-h-[calc(100vh-4rem)]">
    <section class="px-4 md:px-6 lg:px-10 pt-12 md:pt-16 pb-8 md:pb-12 max-w-8xl mx-auto">
      <HomePageHeroSection :current-lang="currentLang" />
    </section>

    <HomePageCardComponents :current-lang="currentLang" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import HomePageCardComponents from '../../components/home/HomePageCardComponents.vue';
import HomePageHeroSection from '../../components/home/HomePageHeroSection.vue';

const currentLang = inject('currentLang')
</script>

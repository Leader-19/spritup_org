<template>
  <div>
    <Objective :section="section" :current-lang="currentLang" />
    <Mission :section="section" :current-lang="currentLang" />
    <Vision :section="section" :current-lang="currentLang" />

    <!-- Contact -->
    <ContactPage v-if="section === 'contact'" />

    <!-- Donate -->
    <DonatePage v-if="section === 'donate'" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import ContactPage from '../../views/contact/ContactPage.vue'
import DonatePage from '../../views/donates/DonatePage.vue'
import Objective from './Objective.vue'
import Mission from './Mission.vue'
import Vision from './Vision.vue'

const props = defineProps({
  section: { type: String, default: 'objective' },
  currentLang: { type: String, default: 'en' },
})

const currentLang = inject('currentLang') || props.currentLang
</script>

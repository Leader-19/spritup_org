<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-8 px-4 lg:px-8">
    <div class="max-w-8xl mx-auto">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 min-h-[60vh]">
        <HomeSectionContent :section="activeSection" :current-lang="currentLang" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import HomeSectionContent from '../../components/home/HomeSectionContent.vue'

const currentLang = inject('currentLang')
const route = useRoute()
const activeSection = ref(route.query.section || 'objective')

watch(() => route.query.section, (val) => {
  if (val) activeSection.value = val
})
</script>

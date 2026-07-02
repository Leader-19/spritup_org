<template>
  <div class="bg-gray-50 dark:bg-gray-900 p-6">

    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">

      <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        📚 ប្រភេទច្បាប់
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

        <div
          v-for="(item, index) in categories"
          :key="index"
          @click="goToRoute(item)"
          class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 
                 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition"
        >
          {{ item }}
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const categories = [
  "ឯកសារ ទាំងអស់",
  "រដ្ឋធម្មនុញ្ញ",
  "សន្ធិសញ្ញា អនុសញ្ញា កតិកាសញ្ញា",
  "ក្រម",
  "ច្បាប់",
  "ព្រះរាជក្រម",
  "ព្រះរាជក្រឹត្យ",
  "អនុក្រឹត្យ",
  "ប្រកាស",
  "ដីកា",
  "និយាមប្រតិបត្តិ",
]

const categoryRoutes = {
  "ឯកសារ ទាំងអស់": "/all-documents",
  "រដ្ឋធម្មនុញ្ញ": "/constitution-documents",
  "សន្ធិសញ្ញា អនុសញ្ញា កតិកាសញ្ញា": "/treatyconventionpact-documents",
  "ក្រម": "/krom-documents",
  "ច្បាប់": "/law-documents",
  "ព្រះរាជក្រម": "/preahreachokram-documents",
  "ព្រះរាជក្រឹត្យ": "/royaldecree-documents",
  "អនុក្រឹត្យ": "/sub-decree-documents",
  "ប្រកាស": "/brakeas-documents",
  "ដីកា": "/deyka-documents",
  "និយាមប្រតិបត្តិ": "/niyeambratebatte-documents",
}

const goToRoute = (item) => {
  const path = categoryRoutes[item]
  if (path) {
    router.push(path)
  } else {
    console.warn("No route found for:", item)
  }
}
</script>
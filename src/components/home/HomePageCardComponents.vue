<template>
    <div class="mt-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <router-link to="/documents"
                class="group rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-200">
                <div class="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-4 group-hover:bg-brand-200 dark:group-hover:bg-brand-900/60 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </div>
                <h3 class="font-display font-semibold text-gray-900 dark:text-white mb-2">
                    {{ currentLang === 'en' ? 'Browse Documents' : 'រកឯកសារ' }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ currentLang === 'en' ? 'Search laws, decrees, and legal documents by category.' : 'ស្វែងរកច្បាប់ អនុក្រឹត្យ និងឯកសារច្បាប់តាមប្រភេទ។' }}
                </p>
            </router-link>

            <router-link to="/documents"
                class="group rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-200">
                <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/60 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                    </svg>
                </div>
                <h3 class="font-display font-semibold text-gray-900 dark:text-white mb-2">
                    {{ currentLang === 'en' ? 'Quick Search' : 'ស្វែងរកល�ប' }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ currentLang === 'en' ? 'Find specific legal documents instantly with powerful search.' : 'រកឯកសារច្បាប់ជាការជាក់លាក់ដោយប្រើការស្វែងរក។' }}
                </p>
            </router-link>

            <router-link to="/home"
                class="group rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-200">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/60 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                </div>
                <h3 class="font-display font-semibold text-gray-900 dark:text-white mb-2">
                    {{ currentLang === 'en' ? 'About Us' : 'អំពីយើង' }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ currentLang === 'en' ? 'Learn about our mission and how we support legal education.' : 'ស្វែងរកអំពីកិច្ចបណ្តុះបណ្តាល និងថ្នាក់ដែលយើងជ�យគាំទ្រការអប់រំច្បាប់។' }}
                </p>
            </router-link>
        </div>

        <div class="mt-6 text-center">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                <b>គាំទ្រការអប់រំ៖</b>
                ផ្តល់សម្ភារៈសិក្សា និងវគ្គបណ្តុះបណ្តាលឥតគិតថ្លៃដល់យុវជន។
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                <b>ពង្រីកគម្រោងសហគមន៍៖</b> ចុះជួយផ្ទាល់ដល់តំបន់ដែលខ្វះខាត និងត្រូវការជំនួយបន្ទាន់។
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                <b>ទ្រទ្រង់ប្រតិបត្តិការ៖</b> ជួយគាំទ្រដល់ដំណើរការប្រចាំថ្ងៃរបស់មជ្ឈមណ្ឌល
                ដើម្បីឱ្យក្រុមការងារអាចបំពេញបេសកកម្មបានពេញលេញ។
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                មជ្ឈមណ្ឌល SPRITUP សូមសន្យាថា រាល់ថវិកាដែលទទួលបានពីលោកអ្នក នឹងត្រូវបានគ្រប់គ្រងដោយតម្លាភាព
                និងប្រើប្រាស់ចំគោលដៅបំផុត។ របាយការណ៍សកម្មភាព និងហិរញ្ញវត្ថុ
                នឹងត្រូវបានផ្សព្វផ្សាយជូនអ្នកគាំទ្រទាំងអស់ជាប្រចាំ។ សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះទឹកចិត្តសប្បុរសធម៌របស់អ្នក!
            </p>
            <p>
                ប្រសិនបើស្ថាប័ន ក្រុមហ៊ុន ឬលោកអ្នកមានបំណងចង់ក្លាយជា "ដៃគូឧបត្ថម្ភប្រចាំឆ្នាំ" ឬមានសំណួរផ្សេងៗ
                សូមបំពេញព័ត៌មានខាងក្រោម ឬទាក់ទងមកយើងខ្ញុំផ្ទាល់៖ <br>
                ទូរស័ព្ទ៖ + 855 69 505 726 <br>
                អ៊ីមែល៖ spritup.center@gmail.com
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    currentLang: { type: String, default: 'en' }
})
</script>

<template>
    <section class="px-4 md:px-6 lg:px-10 py-8 md:py-12 max-w-8xl mx-auto">
        <div class="max-w-4xl mx-auto">
            <div class="p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 glass border border-gray-100 dark:border-gray-700/50">
                <h2 class="font-display font-semibold text-2xl text-gray-900 dark:text-white mb-6">
                    {{ currentLang === 'en' ? 'About This Website' : 'អំពីវេទិកានេះ' }}
                </h2>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {{ currentLang === 'en' ? 'The SPRITUP Organization Legal Resources Hub was created to provide free and open access to Cambodian legal documents for everyone. Our mission is to make legal information more accessible to citizens, students, researchers, and legal professionals.' : 'កីយផ្សំឯកសារច្បាប់ក្រុមអង្គនៈស្ពឺតូផងណា បានបង្កើតដើម្បីផ្តល់សម្រាប់ឯកសារច្បាប់កម្ពុជាដល់គ្រប់គ្នា។ បណ្តុះបញ្ជូនរបស់យើងគឺដើម្បីធានាឯកសារច្បាប់ឲ្យអាចចូលរួតចិត្តបានជាមួយពលរដ្ឋ និស្សគ្រាចរណា ការស្រាវជ្រាវ និងអ្នកវិភាគ។' }}
                </p>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {{ currentLang === 'en' ? 'We believe that transparency in legal systems is essential for democracy and justice. By providing comprehensive and up-to-date legal resources, we aim to support education, research, and informed decision-making in Cambodia.' : 'យើងជាអ្នកគណិតច្បាប់ដែលស្រឡាញ់ភាពឆ្មារឆ្មបីន្តិការណាដែលមានភាពស្មោះត្រង់ យើងផ្តល់ជូនដោយឯកសារច្បាប់សំមង្ងាត់និងទាន់សរសេរដើម្បីគាំទ្រការអប់រំ ការស្រាវជ្រាវ និងការសម្រួលស្នើសុខត្រជាការសម្រួលក្នុងកម្ពុជា។' }}
                </p>
                <div class="grid md:grid-cols-3 gap-6 mt-8">
                    <div class="text-center p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20">
                        <h3 class="font-display font-bold text-2xl text-brand-600 mb-2">{{ currentLang === 'en' ? 'Free Access' : 'ចូលរួតសន្ធស្ត' }}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'No subscription required' : 'មិនតូចជាតិបន្ថែម' }}</p>
                    </div>
                    <div class="text-center p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20">
                        <h3 class="font-display font-bold text-2xl text-brand-600 mb-2">{{ currentLang === 'en' ? 'Always Updated' : 'បានធ្វើឲ្យទាន់ទាន់' }}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Latest legal documents' : 'ឯកសារច្បាប់ថ្មីៗ' }}</p>
                    </div>
                    <div class="text-center p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20">
                        <h3 class="font-display font-bold text-2xl text-brand-600 mb-2">{{ currentLang === 'en' ? 'For Everyone' : 'សម្រាប់គ្រប់គ្នា' }}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentLang === 'en' ? 'Citizens and professionals' : 'ពលរដ្ឋ និងវិភាគ' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
  currentLang: { type: String, default: 'en' }
})
</script>

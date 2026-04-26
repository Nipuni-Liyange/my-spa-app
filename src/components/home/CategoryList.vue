<script setup lang="ts">
defineProps<{
  selectedCategory: string
  categoryImages: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'select-category', category: string): void
}>()

const categories = ['Clothes', 'Footwear', 'Others']
</script>

<template>
  <section class="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
    <div class="mb-6 text-center">
      <p class="text-xs uppercase tracking-[0.35em] text-[#b06f61] sm:text-sm">
        Shop By Category
      </p>
      <h2 class="mt-2 text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white">
        Curated for Your Style
      </h2>
    </div>

    <div class="grid grid-cols-3 gap-3 sm:gap-8">
      <button
        v-for="category in categories"
        :key="category"
        @click="emit('select-category', category)"
        class="flex flex-col items-center"
      >
        <div
          class="flex items-center justify-center overflow-hidden rounded-full border-[3px] bg-white shadow-md transition duration-300"
          :class="
            selectedCategory === category
              ? 'border-[#9b5d52] bg-[#eadfcb]'
              : 'border-stone-200 dark:border-stone-700 dark:bg-[#2d2824]'
          "
        >
          <div class="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32">
            <img
              v-if="categoryImages[category]"
              :src="categoryImages[category]"
              :alt="category"
              class="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        <p
          class="mt-3 text-center font-medium transition"
          :class="
            selectedCategory === category
              ? 'text-[#9b5d52]'
              : 'text-stone-800 dark:text-stone-200'
          "
        >
          <span class="text-sm sm:text-lg">{{ category }}</span>
        </p>
      </button>
    </div>
  </section>
</template>

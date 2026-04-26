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
  <section class="mx-auto mt-12 max-w-7xl px-6">
    <div class="mb-6 text-center">
      <p class="text-sm uppercase tracking-[0.3em] text-[#9b5d52]">
        Shop by Category
      </p>
      <h3 class="mt-2 text-3xl font-semibold text-stone-800 dark:text-white">
        Curated for Your Style
      </h3>
    </div>

    <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
      <button
        v-for="category in categories"
        :key="category"
        @click="emit('select-category', category)"
        class="group flex flex-col items-center"
      >
        <div
          class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-[3px] p-1 shadow-md transition duration-300 group-hover:scale-105"
          :class="
            selectedCategory === category
              ? 'border-[#9b5d52] bg-[#eadfcb]'
              : 'border-stone-200 bg-white dark:border-stone-700 dark:bg-[#2d2824]'
          "
        >
          <img
            v-if="categoryImages[category]"
            :src="categoryImages[category]"
            :alt="category"
            class="h-full w-full rounded-full object-cover"
          />
        </div>

        <p
          class="mt-4 text-base font-medium transition"
          :class="
            selectedCategory === category
              ? 'text-[#9b5d52]'
              : 'text-stone-700 dark:text-stone-200'
          "
        >
          {{ category }}
        </p>
      </button>
    </div>
  </section>
</template>

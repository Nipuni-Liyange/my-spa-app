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
  <section class="mx-auto mt-10 max-w-7xl px-6">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <button
        v-for="category in categories"
        :key="category"
        @click="emit('select-category', category)"
        class="flex flex-col items-center"
      >
        <div
          class="h-24 w-24 overflow-hidden rounded-full border transition"
          :class="
            selectedCategory === category
              ? 'border-[#9b5d52] bg-[#e6dcc8]'
              : 'border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-[#2d2824]'
          "
        >
          <img
            v-if="categoryImages[category]"
            :src="categoryImages[category]"
            :alt="category"
            class="h-full w-full object-cover"
          />
        </div>
        <p class="mt-3 text-sm text-stone-700 dark:text-stone-200">{{ category }}</p>
      </button>
    </div>
  </section>
</template>

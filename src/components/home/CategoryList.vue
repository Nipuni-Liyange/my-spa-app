<script setup lang="ts">
const props = defineProps<{
  selectedCategory: string
}>()

const emit = defineEmits<{
  (e: 'select-category', category: string): void
}>()

const categories = ['Women', 'Men', 'Kids', 'Footwear', 'Jewellery', 'Others']
</script>

<template>
  <section class="mx-auto mt-10 max-w-7xl px-6">
    <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
      <button
        v-for="category in categories"
        :key="category"
        @click="emit('select-category', category)"
        class="flex flex-col items-center"
      >
        <div
          class="h-20 w-20 rounded-full border transition"
          :class="
            selectedCategory === category
              ? 'border-[#9b5d52] bg-[#e6dcc8]'
              : 'border-stone-200 bg-stone-100'
          "
        ></div>
        <p class="mt-3 text-sm text-stone-700">{{ category }}</p>
      </button>
    </div>
  </section>
</template>

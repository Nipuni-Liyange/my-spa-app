<script setup lang="ts">
import type { Product } from '../../types/product'

defineProps<{
  product: Product
  isNew?: boolean
}>()

const emit = defineEmits<{
  (e: 'open-product', product: Product): void
}>()
</script>

<template>
  <div
    class="group cursor-pointer overflow-hidden rounded-2xl bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[#241f1b]"
    @click="emit('open-product', product)"
  >
    <div class="relative overflow-hidden rounded-xl bg-stone-100 dark:bg-[#2d2824]">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div
        v-if="isNew"
        class="absolute left-3 top-3 rounded-full bg-[#f5efde]/95 px-3 py-1 text-xs font-semibold text-[#9b5d52] shadow"
      >
        New
      </div>
    </div>

    <div class="px-1 pb-2 pt-4">
      <p class="text-xs uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
        {{ product.category }}
      </p>

      <h3 class="mt-2 line-clamp-2 min-h-[48px] text-base font-semibold text-stone-800 dark:text-white">
        {{ product.title }}
      </h3>

      <div class="mt-4 flex items-center justify-between">
        <p class="text-lg font-bold text-[#9b5d52]">
          ${{ product.price.toFixed(2) }}
        </p>

        <span
          class="rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-600 transition group-hover:border-[#b79a72] group-hover:text-[#9b5d52] dark:border-stone-700 dark:text-stone-300"
        >
          View Details
        </span>
      </div>
    </div>
  </div>
</template>

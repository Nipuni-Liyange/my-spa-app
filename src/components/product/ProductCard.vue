<script setup lang="ts">
import type { Product } from '../../types/product'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'open-product', product: Product): void
}>()
</script>

<template>
  <div
    class="cursor-pointer rounded-xl bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg"
    @click="emit('open-product', product)"
  >
    <div class="overflow-hidden rounded-lg bg-stone-100">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-60 w-full object-cover"
      />
    </div>

    <h3 class="mt-3 line-clamp-2 text-sm font-medium text-stone-800">
      {{ product.title }}
    </h3>

    <p class="mt-1 text-xs text-stone-500">{{ product.category }}</p>

    <p class="mt-2 text-sm font-semibold text-[#9b5d52]">
      ${{ product.price.toFixed(2) }}
    </p>
  </div>
</template>

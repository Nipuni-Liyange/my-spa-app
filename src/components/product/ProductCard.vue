<script setup lang="ts">
import type { Product } from '../../types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="rounded-lg border p-4 shadow-sm">
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="h-48 w-full rounded-md object-cover"
    />
    <h3 class="mt-3 text-lg font-semibold">{{ product.title }}</h3>
    <p class="mt-1 text-sm text-gray-600">{{ product.category }}</p>
    <p class="mt-2 font-bold">${{ product.price }}</p>
  </div>
</template>
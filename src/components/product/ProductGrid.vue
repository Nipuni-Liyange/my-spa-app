<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import type { Product } from '../../types/product'

defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  (e: 'open-product', product: Product): void
}>()
</script>

<template>
  <section class="mx-auto mt-10 max-w-7xl px-6 pb-12">
    <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @open-product="emit('open-product', $event)"
      />
    </div>
  </section>
</template>

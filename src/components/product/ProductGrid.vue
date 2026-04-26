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
  <section class="mx-auto mt-12 max-w-7xl px-6 pb-14">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.3em] text-[#9b5d52]">
          Collection
        </p>
        <h3 class="mt-2 text-3xl font-semibold text-stone-800 dark:text-white">
          Trending Fashion Picks
        </h3>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :is-new="index < 4"
        @open-product="emit('open-product', $event)"
      />
    </div>
  </section>
</template>

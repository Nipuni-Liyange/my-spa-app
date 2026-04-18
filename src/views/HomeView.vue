<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import { fetchProducts } from '../services/productService'
import type { Product } from '../types/product'

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    loading.value = true
    const data = await fetchProducts()
    products.value = data.products
  } catch (err) {
    error.value = 'Failed to load products.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-3xl font-bold">MiraFashion</h1>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <ProductGrid v-else :products="products" />
  </div>
</template>
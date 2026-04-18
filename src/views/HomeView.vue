<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import HeroBanner from '../components/home/HeroBanner.vue'
import CategoryList from '../components/home/CategoryList.vue'
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
    products.value = data.products.slice(0, 8)
  } catch (err) {
    error.value = 'Failed to load products.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f1e8]">
    <AppHeader />
    <HeroBanner />
    <CategoryList />

    <div class="mx-auto max-w-7xl px-6">
      <p v-if="loading" class="mt-8">Loading...</p>
      <p v-else-if="error" class="mt-8 text-red-500">{{ error }}</p>
    </div>

    <ProductGrid v-if="!loading && !error" :products="products" />
    <AppFooter />
  </div>
</template>

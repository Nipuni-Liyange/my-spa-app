<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
const selectedCategory = ref('Women')

const categoryMap: Record<string, string[]> = {
  Women: [
    'womens-dresses',
    'womens-shoes',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'tops',
  ],
  Men: [
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
  ],
  Kids: [
    'tops',
    'womens-dresses',
    'mens-shirts',
  ],
  Footwear: [
    'mens-shoes',
    'womens-shoes',
  ],
  Jewellery: [
    'womens-jewellery',
  ],
  Others: [
    'beauty',
    'fragrances',
    'groceries',
    'home-decoration',
  ],
}

const filteredProducts = computed(() => {
  const mappedCategories = categoryMap[selectedCategory.value] || []
  return products.value.filter(product => mappedCategories.includes(product.category))
})

function selectCategory(category: string) {
  selectedCategory.value = category
}

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
  <div class="min-h-screen bg-[#f5f1e8]">
    <AppHeader />
    <HeroBanner />

    <CategoryList
      :selected-category="selectedCategory"
      @select-category="selectCategory"
    />

    <div class="mx-auto mt-8 max-w-7xl px-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-stone-800">
          {{ selectedCategory }}
        </h2>
        <p class="text-sm text-stone-500">
          {{ filteredProducts.length }} items
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6">
      <p v-if="loading" class="mt-8">Loading...</p>
      <p v-else-if="error" class="mt-8 text-red-500">{{ error }}</p>
    </div>

    <ProductGrid
      v-if="!loading && !error && filteredProducts.length > 0"
      :products="filteredProducts.slice(0, 8)"
    />

    <p
      v-else-if="!loading && !error && filteredProducts.length === 0"
      class="mx-auto mt-8 max-w-7xl px-6 text-stone-500"
    >
      No products found for this category.
    </p>

    <AppFooter />
  </div>
</template>

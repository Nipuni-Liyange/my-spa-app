<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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

const selectedCategory = ref('Clothes')
const searchTerm = ref('')
const showAll = ref(false)

const menuOpen = ref(false)
const darkMode = ref(localStorage.getItem('darkMode') === 'true')

const categoryMap: Record<string, string[]> = {
  Clothes: [
    'mens-shirts',
    'womens-dresses',
    'tops',
  ],
  Footwear: [
    'mens-shoes',
    'womens-shoes',
  ],
  Others: [
    'beauty',
    'fragrances',
    'groceries',
    'home-decoration',
    'furniture',
    'womens-watches',
    'mens-watches',
    'womens-bags',
    'womens-jewellery',
  ],
}

watch(
  darkMode,
  (value) => {
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('darkMode', String(value))
  },
  { immediate: true }
)

const baseProducts = computed(() => {
  if (showAll.value) return products.value
  const mappedCategories = categoryMap[selectedCategory.value] || []
  return products.value.filter(product => mappedCategories.includes(product.category))
})

const filteredProducts = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  if (!q) return baseProducts.value
  return baseProducts.value.filter(product =>
    product.title.toLowerCase().includes(q)
  )
})

function selectCategory(category: string) {
  selectedCategory.value = category
  showAll.value = false
}

function exploreCollection() {
  showAll.value = true
  searchTerm.value = ''
}

function toggleDark() {
  darkMode.value = !darkMode.value
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
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
  <div class="min-h-screen bg-[#f5f1e8] dark:bg-[#181512]">
    <AppHeader
      :search-term="searchTerm"
      :dark-mode="darkMode"
      :menu-open="menuOpen"
      @update:search-term="searchTerm = $event"
      @toggle-dark="toggleDark"
      @toggle-menu="toggleMenu"
    />

    <HeroBanner @explore="exploreCollection" />

    <CategoryList
      :selected-category="selectedCategory"
      @select-category="selectCategory"
    />

    <div class="mx-auto mt-8 max-w-7xl px-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-stone-800 dark:text-white">
          {{ showAll ? 'All Products' : selectedCategory }}
        </h2>
        <p class="text-sm text-stone-500 dark:text-stone-300">
          {{ filteredProducts.length }} items
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6">
      <p v-if="loading" class="mt-8 dark:text-white">Loading...</p>
      <p v-else-if="error" class="mt-8 text-red-500">{{ error }}</p>
    </div>

    <ProductGrid
      v-if="!loading && !error && filteredProducts.length > 0"
      :products="filteredProducts.slice(0, 8)"
    />

    <p
      v-else-if="!loading && !error && filteredProducts.length === 0"
      class="mx-auto mt-8 max-w-7xl px-6 text-stone-500 dark:text-stone-300"
    >
      Product not available.
    </p>

    <AppFooter />
  </div>
</template>

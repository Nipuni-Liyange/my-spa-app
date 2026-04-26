<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import HeroBanner from '../components/home/HeroBanner.vue'
import CategoryList from '../components/home/CategoryList.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import ProductModal from '../components/product/ProductModal.vue'
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

const selectedProduct = ref<Product | null>(null)
const showProductModal = ref(false)

const fashionCategories = [
  'mens-shirts',
  'womens-dresses',
  'tops',
  'mens-shoes',
  'womens-shoes',
  'beauty',
  'womens-watches',
  'mens-watches',
  'womens-bags',
  'womens-jewellery',
]

const categoryMap: Record<string, string[]> = {
  Clothes: ['mens-shirts', 'womens-dresses', 'tops'],
  Footwear: ['mens-shoes', 'womens-shoes'],
  Others: [
    'beauty',
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

const fashionProducts = computed(() => {
  return products.value.filter(product =>
    fashionCategories.includes(product.category)
  )
})

const baseProducts = computed(() => {
  if (showAll.value) return fashionProducts.value

  const mappedCategories = categoryMap[selectedCategory.value] || []
  return products.value.filter(product => mappedCategories.includes(product.category))
})

const searchedProducts = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()

  if (!q) return baseProducts.value

  return baseProducts.value.filter(product =>
    product.title.toLowerCase().includes(q)
  )
})

const displayedProducts = computed(() => {
  return showAll.value ? searchedProducts.value : searchedProducts.value.slice(0, 8)
})

const categoryImages = computed(() => {
  return {
    Clothes:
      products.value.find(p => ['mens-shirts', 'womens-dresses', 'tops'].includes(p.category))?.thumbnail || '',
    Footwear:
      products.value.find(p => ['mens-shoes', 'womens-shoes'].includes(p.category))?.thumbnail || '',
    Others:
      products.value.find(p =>
        ['beauty', 'womens-watches', 'mens-watches', 'womens-bags', 'womens-jewellery'].includes(p.category)
      )?.thumbnail || '',
  }
})

function selectCategory(category: string) {
  selectedCategory.value = category
  showAll.value = false
  menuOpen.value = false
}

function exploreCollection() {
  showAll.value = true
  searchTerm.value = ''
}

function showAllProducts() {
  showAll.value = true
  searchTerm.value = ''
  menuOpen.value = false
}

function toggleDark() {
  darkMode.value = !darkMode.value
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function openProduct(product: Product) {
  selectedProduct.value = product
  showProductModal.value = true
}

function closeProductModal() {
  showProductModal.value = false
  selectedProduct.value = null
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
      :show-search="true"
      current-page="home"
      @update:search-term="searchTerm = $event"
      @toggle-dark="toggleDark"
      @toggle-menu="toggleMenu"
      @select-menu-category="selectCategory"
      @show-all-products="showAllProducts"
    />

    <HeroBanner @explore="exploreCollection" />

    <CategoryList
      :selected-category="selectedCategory"
      :category-images="categoryImages"
      @select-category="selectCategory"
    />

    <div class="mx-auto mt-8 max-w-7xl px-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-stone-800 dark:text-white">
          {{ showAll ? 'Explore Collection' : selectedCategory }}
        </h2>
        <p class="text-sm text-stone-500 dark:text-stone-300">
          {{ displayedProducts.length }} items
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-6">
      <p v-if="loading" class="mt-8 dark:text-white">Loading...</p>
      <p v-else-if="error" class="mt-8 text-red-500">{{ error }}</p>
    </div>

    <ProductGrid
      v-if="!loading && !error && displayedProducts.length > 0"
      :products="displayedProducts"
      @open-product="openProduct"
    />

    <p
      v-else-if="!loading && !error && displayedProducts.length === 0"
      class="mx-auto mt-8 max-w-7xl px-6 text-stone-500 dark:text-stone-300"
    >
      Product not available.
    </p>

    <ProductModal
      :show="showProductModal"
      :product="selectedProduct"
      @close="closeProductModal"
    />

    <AppFooter />
  </div>
</template>

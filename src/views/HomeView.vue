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

const selectedCategory = ref('')
const searchTerm = ref('')
const showAll = ref(false)

const menuOpen = ref(false)
const darkMode = ref(localStorage.getItem('darkMode') === 'true')

const selectedProduct = ref<Product | null>(null)
const showProductModal = ref(false)

/* important */
const compactView = ref(false)

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
  return products.value.filter((product) =>
    fashionCategories.includes(product.category)
  )
})

const baseProducts = computed(() => {
  if (showAll.value) return fashionProducts.value

  const mappedCategories = categoryMap[selectedCategory.value] || []
  return products.value.filter((product) =>
    mappedCategories.includes(product.category)
  )
})

const searchedProducts = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()

  if (!q) return baseProducts.value

  return baseProducts.value.filter((product) =>
    product.title.toLowerCase().includes(q)
  )
})

const displayedProducts = computed(() => {
  if (searchTerm.value.trim()) return searchedProducts.value
  if (showAll.value) return searchedProducts.value
  if (selectedCategory.value) return searchedProducts.value
  return searchedProducts.value.slice(0, 8)
})

const categoryImages = computed(() => {
  return {
    Clothes:
      products.value.find((p) =>
        ['mens-shirts', 'womens-dresses', 'tops'].includes(p.category)
      )?.thumbnail || '',
    Footwear:
      products.value.find((p) =>
        ['mens-shoes', 'womens-shoes'].includes(p.category)
      )?.thumbnail || '',
    Others:
      products.value.find((p) =>
        ['beauty', 'womens-watches', 'mens-watches', 'womens-bags', 'womens-jewellery'].includes(
          p.category
        )
      )?.thumbnail || '',
  }
})

const showHomeSections = computed(() => {
  return !compactView.value
})

const sectionTitle = computed(() => {
  if (searchTerm.value.trim()) return 'Search Results'
  if (showAll.value) return 'Explore Collection'
  if (selectedCategory.value) return selectedCategory.value
  return 'Featured Products'
})

/* circle click */
function selectCategory(category: string) {
  selectedCategory.value = category
  showAll.value = false
  compactView.value = false
  menuOpen.value = false
}

/* hero button click */
function exploreCollection() {
  showAll.value = true
  selectedCategory.value = ''
  searchTerm.value = ''
  compactView.value = false
}

/* white menu box click */
function showAllProducts() {
  showAll.value = true
  selectedCategory.value = ''
  searchTerm.value = ''
  compactView.value = true
  menuOpen.value = false
}

/* white menu category click */
function selectMenuCategory(category: string) {
  selectedCategory.value = category
  showAll.value = false
  searchTerm.value = ''
  compactView.value = true
  menuOpen.value = false
}

/* search */
function updateSearch(value: string) {
  searchTerm.value = value

  if (value.trim()) {
    selectedCategory.value = ''
    showAll.value = false
    compactView.value = true
  } else {
    compactView.value = false
  }
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
  selectedProduct.value = null
  showProductModal.value = false
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
      @update:search-term="updateSearch"
      @toggle-dark="toggleDark"
      @toggle-menu="toggleMenu"
      @select-menu-category="selectMenuCategory"
      @show-all-products="showAllProducts"
    />

    <template v-if="showHomeSections">
      <HeroBanner @explore="exploreCollection" />

      <CategoryList
        :selected-category="selectedCategory"
        :category-images="categoryImages"
        @select-category="selectCategory"
      />
    </template>

    <div class="mx-auto mt-8 max-w-7xl px-6">
      <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            v-if="compactView"
            class="text-sm uppercase tracking-[0.3em] text-[#9b5d52]"
          >
            Product View
          </p>

          <h2 class="mt-2 text-3xl font-semibold text-stone-800 dark:text-white">
            {{ sectionTitle }}
          </h2>
        </div>

        <p class="text-sm text-stone-500 dark:text-stone-300">
          {{ displayedProducts.length }} items available
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

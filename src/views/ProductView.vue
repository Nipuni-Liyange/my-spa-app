<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProductById } from '../services/productService'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref('')
const addedMessage = ref('')

const darkMode = ref(localStorage.getItem('darkMode') === 'true')

watch(
  darkMode,
  (value) => {
    document.documentElement.classList.toggle('dark', value)
  },
  { immediate: true }
)

onMounted(async () => {
  try {
    loading.value = true
    const id = Number(route.params.id)
    product.value = await fetchProductById(id)
  } catch (err) {
    error.value = 'Failed to load product details.'
  } finally {
    loading.value = false
  }
})

function handleAddToCart() {
  if (product.value) {
    cartStore.addToCart(product.value)
    addedMessage.value = 'Product added to cart successfully.'
    setTimeout(() => {
      addedMessage.value = ''
    }, 2000)
  }
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f1e8] p-6 dark:bg-[#181512]">
    <div class="mx-auto mb-6 flex max-w-5xl items-center justify-between">
      <button
        @click="goBack"
        class="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 dark:border-stone-600 dark:text-white"
      >
        ← Back
      </button>

      <p
        v-if="addedMessage"
        class="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700 dark:bg-green-900/40 dark:text-green-300"
      >
        {{ addedMessage }}
      </p>
    </div>

    <p v-if="loading" class="dark:text-white">Loading product...</p>
    <p v-else-if="error">{{ error }}</p>

    <div
      v-else-if="product"
      class="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm dark:bg-[#241f1b]"
    >
      <div class="grid gap-8 md:grid-cols-2">
        <div class="rounded-2xl bg-stone-100 p-4 dark:bg-[#2d2824]">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="h-[420px] w-full rounded-xl object-cover"
          />
        </div>

        <div class="flex flex-col justify-center">
          <p class="text-sm text-stone-500 dark:text-stone-300">{{ product.category }}</p>
          <h1 class="mt-2 text-4xl font-semibold text-stone-800 dark:text-white">
            {{ product.title }}
          </h1>

          <p class="mt-4 text-base leading-7 text-stone-600 dark:text-stone-300">
            {{ product.description }}
          </p>

          <p class="mt-6 text-3xl font-bold text-[#9b5d52]">
            ${{ product.price }}
          </p>

          <p class="mt-3 text-sm text-stone-500 dark:text-stone-300">Stock: {{ product.stock }}</p>
          <p class="mt-1 text-sm text-stone-500 dark:text-stone-300">Rating: {{ product.rating }}</p>

          <button
            @click="handleAddToCart"
            class="mt-8 w-fit rounded-full bg-[#b79a72] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#a98b64]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProductById } from '../services/productService'
import type { Product } from '../types/product'

const route = useRoute()

const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref('')

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
</script>

<template>
  <div class="p-6">
    <p v-if="loading">Loading product...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="product" class="mx-auto max-w-4xl rounded-lg border p-6 shadow-sm">
      <div class="grid gap-8 md:grid-cols-2">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full rounded-lg object-cover"
        />

        <div>
          <p class="text-sm text-gray-500">{{ product.category }}</p>
          <h1 class="mt-2 text-3xl font-bold">{{ product.title }}</h1>
          <p class="mt-4 text-lg text-gray-700">{{ product.description }}</p>
          <p class="mt-4 text-2xl font-bold">${{ product.price }}</p>
          <p class="mt-2 text-sm text-gray-600">Stock: {{ product.stock }}</p>
          <p class="mt-2 text-sm text-gray-600">Rating: {{ product.rating }}</p>
          <p class="mt-2 text-sm text-gray-600" v-if="product.brand">
            Brand: {{ product.brand }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

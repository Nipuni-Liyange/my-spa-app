
<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../../types/product'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()

function openProduct() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div
    class="cursor-pointer rounded-lg border p-4 shadow-sm transition hover:shadow-md"
    @click="openProduct"
  >
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="h-48 w-full rounded-md object-cover"
    />
    <h3 class="mt-3 text-lg font-semibold">{{ product.title }}</h3>
    <p class="mt-1 text-sm text-gray-600">{{ product.category }}</p>
    <p class="mt-2 font-bold">${{ product.price }}</p>
  </div>
</template>
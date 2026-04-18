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
    class="cursor-pointer rounded-xl bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg"
    @click="openProduct"
  >
    <div class="overflow-hidden rounded-lg bg-stone-100">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-60 w-full object-cover"
      />
    </div>

    <h3 class="mt-3 line-clamp-2 text-sm font-medium text-stone-800">
      {{ product.title }}
    </h3>

    <p class="mt-1 text-xs text-stone-500">{{ product.category }}</p>

    <p class="mt-2 text-sm font-semibold text-[#9b5d52]">
      ${{ product.price }}
    </p>
  </div>
</template>

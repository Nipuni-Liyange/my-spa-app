<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import type { CartItem } from '../../types/cart'

defineProps<{
  item: CartItem
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
    <div class="flex items-center gap-4">
      <img
        :src="item.product.thumbnail"
        :alt="item.product.title"
        class="h-24 w-24 rounded-lg object-cover"
      />

      <div>
        <h3 class="text-lg font-medium text-stone-800">
          {{ item.product.title }}
        </h3>
        <p class="mt-1 text-sm text-stone-500">{{ item.product.category }}</p>

        <div class="mt-3 flex items-center gap-3">
          <button
            @click="cartStore.decreaseQuantity(item.product.id)"
            class="h-8 w-8 rounded-full border border-stone-300 text-stone-700"
          >
            -
          </button>
          <span class="text-sm font-medium">{{ item.quantity }}</span>
          <button
            @click="cartStore.increaseQuantity(item.product.id)"
            class="h-8 w-8 rounded-full border border-stone-300 text-stone-700"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <div class="text-right">
      <p class="text-lg font-semibold text-[#9b5d52]">
        ${{ (item.product.price * item.quantity).toFixed(2) }}
      </p>

      <button
        @click="cartStore.removeFromCart(item.product.id)"
        class="mt-3 text-sm text-stone-500 hover:text-red-500"
      >
        Remove
      </button>
    </div>
  </div>
</template>

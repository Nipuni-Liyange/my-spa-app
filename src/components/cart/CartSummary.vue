<script setup lang="ts">
import { useCartStore } from '../../stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="rounded-2xl bg-white p-6 shadow-sm">
    <h2 class="text-2xl font-semibold text-stone-800">Order Summary</h2>

    <div class="mt-6 space-y-4 text-sm text-stone-600">
      <div class="flex items-center justify-between">
        <span>Subtotal</span>
        <span>${{ cartStore.subtotal }}</span>
      </div>

      <div class="flex items-center justify-between">
        <span>Shipping</span>
        <span>${{ cartStore.shipping }}</span>
      </div>

      <div class="border-t border-stone-200 pt-4">
        <div class="flex items-center justify-between text-lg font-semibold text-stone-800">
          <span>Total</span>
          <span>${{ cartStore.total }}</span>
        </div>
      </div>
    </div>

    <button
      class="mt-8 w-full rounded-full bg-[#b79a72] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#a98b64]"
    >
      Proceed to Checkout
    </button>
  </div>
</template>
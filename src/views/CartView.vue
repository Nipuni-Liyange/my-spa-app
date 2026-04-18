<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import CartItem from '../components/cart/CartItem.vue'
import CartSummary from '../components/cart/CartSummary.vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="min-h-screen bg-[#f5f1e8]">
    <AppHeader />

    <main class="mx-auto max-w-7xl px-6 py-10">
      <h1 class="text-4xl font-semibold text-stone-800">Shopping Cart</h1>

      <div
        v-if="cartStore.cart.length > 0"
        class="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]"
      >
        <div class="space-y-4">
          <CartItem
            v-for="item in cartStore.cart"
            :key="item.product.id"
            :item="item"
          />
        </div>

        <CartSummary />
      </div>

      <div
        v-else
        class="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm"
      >
        <p class="text-xl text-stone-600">Your cart is empty.</p>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

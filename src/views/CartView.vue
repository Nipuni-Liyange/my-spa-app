<script setup lang="ts">
import { ref, watch } from 'vue'
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import CartItem from '../components/cart/CartItem.vue'
import CartSummary from '../components/cart/CartSummary.vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const darkMode = ref(localStorage.getItem('darkMode') === 'true')
const menuOpen = ref(false)

watch(
  darkMode,
  (value) => {
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('darkMode', String(value))
  },
  { immediate: true }
)

function toggleDark() {
  darkMode.value = !darkMode.value
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f1e8] dark:bg-[#181512]">
    <AppHeader
      :dark-mode="darkMode"
      :menu-open="menuOpen"
      current-page="cart"
      :show-search="false"
      @toggle-dark="toggleDark"
      @toggle-menu="toggleMenu"
    />

    <main class="mx-auto max-w-7xl px-6 py-10">
      <h1 class="text-4xl font-semibold text-stone-800 dark:text-white">Shopping Cart</h1>

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
        class="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-[#241f1b]"
      >
        <p class="text-xl text-stone-600 dark:text-stone-300">Your cart is empty.</p>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

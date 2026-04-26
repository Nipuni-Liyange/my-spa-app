<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../../stores/cart'

const cartStore = useCartStore()

const totalItems = computed(() => cartStore.totalItems)
</script>

<template>
  <router-link
    to="/cart"
    class="fixed right-3 top-1/2 z-40 -translate-y-1/2 rounded-full bg-[#b79a72] p-3 sm:p-4 ..."
  >
    <div class="relative flex items-center justify-center">
      <span class="text-2xl">🛒</span>

      <span
        v-if="totalItems > 0"
        class="absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#9b5d52] px-1 text-xs font-bold text-white"
      >
        {{ totalItems }}
      </span>
    </div>
  </router-link>
</template>
<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import type { Product } from '../../types/product'
import { ref } from 'vue'

const props = defineProps<{
  product: Product | null
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cartStore = useCartStore()
const addedMessage = ref('')
const quantity = ref(1)

function closeModal() {
  emit('close')
  addedMessage.value = ''
  quantity.value = 1
}

function increaseQty() {
  quantity.value++
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}

function handleAddToCart() {
  if (!props.product) return

  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(props.product)
  }

  addedMessage.value = 'Added to cart successfully!'
  setTimeout(() => {
    addedMessage.value = ''
  }, 2000)
}
</script>

<template>
  <div
    v-if="show && product"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm px-4"
  >
    <div class="relative w-full max-w-4xl rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#241f1b]">
      <button
        @click="closeModal"
        class="absolute right-4 top-4 text-xl text-stone-500 hover:text-stone-700 dark:text-stone-300"
      >
        ✕
      </button>

      <p
        v-if="addedMessage"
        class="mb-4 rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300"
      >
        {{ addedMessage }}
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-2xl bg-stone-100 p-4 dark:bg-[#2d2824]">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="h-[360px] w-full rounded-xl object-cover"
          />
        </div>

        <div class="flex flex-col justify-center">
          <p class="text-sm text-stone-500 dark:text-stone-300">
            {{ product.category }}
          </p>

          <h2 class="mt-2 text-3xl font-semibold text-stone-800 dark:text-white">
            {{ product.title }}
          </h2>

          <p class="mt-4 text-base leading-7 text-stone-600 dark:text-stone-300">
            {{ product.description }}
          </p>

          <p class="mt-5 text-2xl font-bold text-[#9b5d52]">
            ${{ product.price.toFixed(2) }}
          </p>

          <div class="mt-5">
            <p class="mb-2 text-sm font-medium text-stone-700 dark:text-stone-200">
              Select Quantity
            </p>

            <div class="flex items-center gap-3">
              <button
                @click="decreaseQty"
                class="h-9 w-9 rounded-full border border-stone-300 text-stone-700 dark:border-stone-600 dark:text-white"
              >
                -
              </button>

              <span class="flex h-9 min-w-[40px] items-center justify-center rounded-full bg-stone-100 px-3 text-sm font-medium dark:bg-[#2d2824] dark:text-white">
                {{ quantity }}
              </span>

              <button
                @click="increaseQty"
                class="h-9 w-9 rounded-full border border-stone-300 text-stone-700 dark:border-stone-600 dark:text-white"
              >
                +
              </button>
            </div>
          </div>

          <div class="mt-5 space-y-2 text-sm text-stone-500 dark:text-stone-300">
            <p>Stock: {{ product.stock }}</p>
            <p>Rating: {{ product.rating }}</p>
          </div>

          <button
            @click="handleAddToCart"
            class="mt-6 w-fit rounded-full bg-[#b79a72] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#a98b64]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
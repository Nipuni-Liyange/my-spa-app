<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import type { Product } from '../../types/product'
import { ref, watch } from 'vue'

const props = defineProps<{
  product: Product | null
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cartStore = useCartStore()
const showSuccessToast = ref(false)
const quantity = ref(1)

watch(
  () => props.show,
  (value) => {
    if (value) {
      quantity.value = 1
      showSuccessToast.value = false
    }
  }
)

function closeModal() {
  emit('close')
  showSuccessToast.value = false
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

  showSuccessToast.value = true

  setTimeout(() => {
    showSuccessToast.value = false
  }, 1800)
}
</script>

<template>
  <div
    v-if="show && product"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-3 py-4 backdrop-blur-sm"
  >
    <div
      class="relative w-full max-w-[430px] rounded-2xl bg-white p-4 shadow-2xl sm:max-w-2xl sm:p-5 md:max-w-4xl dark:bg-[#241f1b]"
    >
      <button
        @click="closeModal"
        class="absolute right-3 top-3 text-lg text-stone-500 hover:text-stone-700 dark:text-stone-300"
      >
        ✕
      </button>

      <!-- Success message box -->
      <div
        v-if="showSuccessToast"
        class="absolute left-1/2 top-4 z-10 w-[88%] max-w-sm -translate-x-1/2 rounded-2xl border border-green-200 bg-white px-4 py-3 shadow-lg dark:border-green-800 dark:bg-[#2d2824]"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300"
          >
            ✓
          </div>
          <div>
            <p class="text-sm font-semibold text-stone-800 dark:text-white">
              Added to cart
            </p>
            <p class="text-xs text-stone-500 dark:text-stone-300">
              Product added successfully.
            </p>
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl bg-stone-100 p-3 dark:bg-[#2d2824]">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="h-40 w-full rounded-xl object-cover sm:h-52 md:h-[320px]"
          />
        </div>

        <div class="flex flex-col justify-center">
          <p class="text-[11px] uppercase tracking-[0.18em] text-stone-500 sm:text-xs dark:text-stone-300">
            {{ product.category }}
          </p>

          <h2 class="mt-2 text-2xl font-semibold leading-tight text-stone-800 sm:text-3xl dark:text-white">
            {{ product.title }}
          </h2>

          <p class="mt-3 text-sm leading-7 text-stone-600 sm:text-[15px] dark:text-stone-300">
            {{ product.description }}
          </p>

          <p class="mt-4 text-2xl font-bold text-[#9b5d52]">
            ${{ product.price.toFixed(2) }}
          </p>

          <div class="mt-4">
            <p class="mb-2 text-sm font-medium text-stone-700 dark:text-stone-200">
              Select Quantity
            </p>

            <div class="flex items-center gap-3">
              <button
                @click="decreaseQty"
                class="h-10 w-10 rounded-full border border-stone-300 text-stone-700 dark:border-stone-600 dark:text-white"
              >
                -
              </button>

              <span
                class="flex h-10 min-w-[44px] items-center justify-center rounded-full bg-stone-100 px-3 text-sm font-medium dark:bg-[#2d2824] dark:text-white"
              >
                {{ quantity }}
              </span>

              <button
                @click="increaseQty"
                class="h-10 w-10 rounded-full border border-stone-300 text-stone-700 dark:border-stone-600 dark:text-white"
              >
                +
              </button>
            </div>
          </div>

          <div class="mt-4 space-y-1 text-sm text-stone-500 dark:text-stone-300">
            <p>Stock: {{ product.stock }}</p>
            <p>Rating: {{ product.rating }}</p>
          </div>

          <button
            @click="handleAddToCart"
            class="mt-5 w-full rounded-full bg-[#b79a72] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a98b64] md:w-fit md:px-8"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
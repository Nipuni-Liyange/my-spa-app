<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../../stores/cart'

const cartStore = useCartStore()
const showCheckoutForm = ref(false)
const successMessage = ref('')

function openCheckoutForm() {
  showCheckoutForm.value = true
  successMessage.value = ''
}

function closeCheckoutForm() {
  showCheckoutForm.value = false
}

function confirmPayment() {
  successMessage.value = 'Payment successful!'
  setTimeout(() => {
    successMessage.value = ''
    showCheckoutForm.value = false
  }, 2000)
}
</script>

<template>
  <div class="relative">
    <div class="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#241f1b]">
      <h2 class="text-2xl font-semibold text-stone-800 dark:text-white">
        Order Summary
      </h2>

      <div class="mt-6 space-y-4 text-sm text-stone-600 dark:text-stone-300">
        <div class="flex items-center justify-between">
          <span>Subtotal</span>
          <span>${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>

        <div class="flex items-center justify-between">
          <span>Shipping</span>
          <span>${{ cartStore.shipping.toFixed(2) }}</span>
        </div>

        <div class="border-t border-stone-200 pt-4 dark:border-stone-700">
          <div class="flex items-center justify-between text-lg font-semibold text-stone-800 dark:text-white">
            <span>Total</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <button
        @click="openCheckoutForm"
        class="mt-8 w-full rounded-full bg-[#b79a72] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#a98b64]"
      >
        Proceed to Checkout
      </button>
    </div>

    <div
      v-if="showCheckoutForm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div class="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl dark:bg-[#241f1b]">
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-2xl font-semibold text-stone-800 dark:text-white">
            Payment Details
          </h3>
          <button
            @click="closeCheckoutForm"
            class="text-xl text-stone-500 hover:text-stone-700 dark:text-stone-300"
          >
            ✕
          </button>
        </div>

        <p
          v-if="successMessage"
          class="mb-4 rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300"
        >
          {{ successMessage }}
        </p>

        <div class="grid gap-5 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
              Payment Method
            </label>
            <select
              class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
            >
              <option>Visa</option>
              <option>MasterCard</option>
              <option>Debit Card</option>
              <option>Cash on Delivery</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter full address"
              class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
            />
          </div>

          <div class="md:col-span-2">
            <label class="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
              CVV
            </label>
            <input
              type="password"
              placeholder="123"
              class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
            />
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between border-t border-stone-200 pt-4 dark:border-stone-700">
          <p class="text-lg font-semibold text-stone-800 dark:text-white">
            Total: ${{ cartStore.total.toFixed(2) }}
          </p>

          <button
            @click="confirmPayment"
            class="rounded-full bg-[#b79a72] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a98b64]"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

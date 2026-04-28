<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../../stores/cart'

const cartStore = useCartStore()

const showCheckoutForm = ref(false)
const showSuccessBox = ref(false)
const successMessage = ref('')

const fullName = ref('Nipuni Dinushika')
const phoneNumber = ref('+94 77 123 4567')
const email = ref('nipuni.customer@gmail.com')
const address = ref('Colombo, Sri Lanka')

const paymentMethod = ref<'card' | 'cod'>('card')
const cardNumber = ref('1111 2222 3333 4444')
const expiryDate = ref('12/28')
const cvv = ref('123')

function openCheckoutForm() {
  showCheckoutForm.value = true
  showSuccessBox.value = false
  successMessage.value = ''
}

function closeCheckoutForm() {
  showCheckoutForm.value = false
}

function confirmPayment() {
  successMessage.value =
    paymentMethod.value === 'card'
      ? 'Payment successful!'
      : 'Order placed successfully with Cash on Delivery!'

  showSuccessBox.value = true

  setTimeout(() => {
    showSuccessBox.value = false
    successMessage.value = ''
    showCheckoutForm.value = false
  }, 2200)
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
      class="fixed inset-0 z-50 bg-black/40 px-2 py-2 sm:flex sm:items-center sm:justify-center sm:p-4"
    >
      <div
        class="relative mx-auto h-[96vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:h-auto sm:max-h-[90vh] sm:p-5 dark:bg-[#241f1b]"
      >
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-stone-800 sm:text-2xl dark:text-white">
            Payment Details
          </h3>

          <button
            @click="closeCheckoutForm"
            class="text-xl text-stone-500 hover:text-stone-700 dark:text-stone-300"
          >
            ✕
          </button>
        </div>

        <div
          v-if="showSuccessBox"
          class="fixed inset-0 z-[60] flex items-center justify-center bg-black/25 px-4"
        >
          <div
            class="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl dark:bg-[#241f1b]"
          >
            <div
              class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600 dark:bg-green-900/30 dark:text-green-300"
            >
              ✓
            </div>

            <h4 class="text-lg font-semibold text-stone-800 dark:text-white">
              Success
            </h4>

            <p class="mt-2 text-sm text-stone-600 dark:text-stone-300">
              {{ successMessage }}
            </p>
          </div>
        </div>

        <div class="rounded-2xl border border-stone-300 p-4 sm:p-5 dark:border-stone-700">
          <h4 class="mb-4 text-lg font-semibold text-stone-800 dark:text-white">
            Delivery Information
          </h4>

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">
                Full Name
              </label>
              <input
                v-model="fullName"
                type="text"
                placeholder="Enter full name"
                class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">
                Phone Number
              </label>
              <input
                v-model="phoneNumber"
                type="text"
                placeholder="Enter phone number"
                class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">
                Email
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="Enter email"
                class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">
                Delivery Address
              </label>
              <input
                v-model="address"
                type="text"
                placeholder="Enter full address"
                class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-2xl border border-stone-300 p-4 sm:p-5 dark:border-stone-700">
          <h4 class="mb-4 text-lg font-semibold text-stone-800 dark:text-white">
            Payment Method
          </h4>

          <div class="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              @click="paymentMethod = 'card'"
              class="rounded-xl border px-4 py-3 text-left text-sm transition"
              :class="
                paymentMethod === 'card'
                  ? 'border-[#2f6f4f] bg-[#edf7f1] dark:bg-[#1f3328]'
                  : 'border-stone-300 bg-white dark:border-stone-600 dark:bg-[#2d2824]'
              "
            >
              <p class="font-semibold text-stone-800 dark:text-white">Credit/Debit Card</p>
            </button>

            <button
              type="button"
              @click="paymentMethod = 'cod'"
              class="rounded-xl border px-4 py-3 text-left text-sm transition"
              :class="
                paymentMethod === 'cod'
                  ? 'border-[#2f6f4f] bg-[#edf7f1] dark:bg-[#1f3328]'
                  : 'border-stone-300 bg-white dark:border-stone-600 dark:bg-[#2d2824]'
              "
            >
              <p class="font-semibold text-stone-800 dark:text-white">Cash on Delivery</p>
            </button>
          </div>

          <div v-if="paymentMethod === 'card'" class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="md:col-span-2">
              <label class="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">
                Card Number
              </label>
              <input
                v-model="cardNumber"
                type="text"
                placeholder="0000 0000 0000 0000"
                class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">
                Expiry Date
              </label>
              <input
                v-model="expiryDate"
                type="text"
                placeholder="MM/YY"
                class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">
                CVV
              </label>
              <input
                v-model="cvv"
                type="password"
                placeholder="***"
                class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-col gap-3 rounded-2xl border border-stone-300 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-stone-700">
          <p class="text-xl font-semibold text-stone-800 dark:text-white">
            Total: ${{ cartStore.total.toFixed(2) }}
          </p>

          <button
            @click="confirmPayment"
            class="w-full rounded-full bg-[#b79a72] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a98b64] sm:w-auto"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

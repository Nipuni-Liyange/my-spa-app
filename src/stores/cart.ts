import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'))

  function addToCart(product: Product) {
    const existing = cart.value.find(item => item.product.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.value.push({
        product,
        quantity: 1,
      })
    }
  }

  function removeFromCart(productId: number) {
    cart.value = cart.value.filter(item => item.product.id !== productId)
  }

  function increaseQuantity(productId: number) {
    const item = cart.value.find(item => item.product.id === productId)
    if (item) item.quantity += 1
  }

  function decreaseQuantity(productId: number) {
    const item = cart.value.find(item => item.product.id === productId)
    if (item && item.quantity > 1) {
      item.quantity -= 1
    }
  }

  const totalItems = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  const shipping = computed(() => (cart.value.length > 0 ? 20 : 0))

  const total = computed(() => subtotal.value + shipping.value)

  watch(
    cart,
    (value) => {
      localStorage.setItem('cart', JSON.stringify(value))
    },
    { deep: true }
  )

  return {
    cart,
    totalItems,
    subtotal,
    shipping,
    total,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  }
})
<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps<{
  searchTerm?: string
  darkMode: boolean
  menuOpen: boolean
  currentPage?: 'home' | 'cart' | 'login'
  showSearch?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void
  (e: 'toggle-dark'): void
  (e: 'toggle-menu'): void
  (e: 'select-menu-category', category: string): void
  (e: 'show-all-products'): void
}>()

const authStore = useAuthStore()
const router = useRouter()

const authLabel = computed(() => (authStore.isLoggedIn ? 'LOG OUT' : 'LOG IN'))

function handleAuthClick() {
  if (authStore.isLoggedIn) {
    authStore.logout()
    router.push('/')
  } else {
    router.push('/login')
  }
  emit('toggle-menu')
}

function handleMenuCategory(category: string) {
  emit('select-menu-category', category)
}

function handleShowAll() {
  emit('show-all-products')
}

function goToCart() {
  router.push('/cart')
  emit('toggle-menu')
}

function goToHome() {
  router.push('/')
  emit('toggle-menu')
}
</script>

<template>
  <header
    class="border-b border-stone-200 bg-[#ece8d8] dark:border-stone-700 dark:bg-[#1f1b18]"
  >
    <div class="mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between gap-4">
        <div class="relative flex items-center gap-4">
          <button
            class="text-2xl text-stone-600 transition hover:text-[#9b5d52] dark:text-stone-200"
            @click="emit('toggle-menu')"
            aria-label="Open menu"
          >
            ☰
          </button>

          <input
            v-if="showSearch !== false"
            :value="searchTerm || ''"
            @input="emit('update:searchTerm', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="Search products..."
            class="w-64 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm text-stone-700 outline-none transition focus:border-[#9b7a5a] dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
          />

          <div
            v-if="menuOpen"
            class="absolute left-0 top-16 z-50 w-72 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl dark:border-stone-700 dark:bg-[#2d2824]"
          >
            <div class="space-y-4">
              <div>
                <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                  Shop by Category
                </p>

                <div class="space-y-2">
                  <button
                    @click="handleMenuCategory('Clothes')"
                    class="w-full rounded-xl px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:text-white dark:hover:bg-[#3a332d]"
                  >
                    Clothes
                  </button>

                  <button
                    @click="handleMenuCategory('Footwear')"
                    class="w-full rounded-xl px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:text-white dark:hover:bg-[#3a332d]"
                  >
                    Footwear
                  </button>

                  <button
                    @click="handleMenuCategory('Others')"
                    class="w-full rounded-xl px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:text-white dark:hover:bg-[#3a332d]"
                  >
                    Others
                  </button>
                </div>
              </div>

              <div class="border-t border-stone-200 pt-4 dark:border-stone-700">
                <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                  Quick Actions
                </p>

                <div class="space-y-2">
                  <button
                    @click="handleShowAll"
                    class="w-full rounded-xl px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:text-white dark:hover:bg-[#3a332d]"
                  >
                    Explore Collection
                  </button>

                  <button
                    @click="goToHome"
                    class="w-full rounded-xl px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:text-white dark:hover:bg-[#3a332d]"
                  >
                    Home
                  </button>

                  <button
                    @click="goToCart"
                    class="w-full rounded-xl px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:text-white dark:hover:bg-[#3a332d]"
                  >
                    Cart
                  </button>

                  <button
                    @click="handleAuthClick"
                    class="w-full rounded-xl px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:text-white dark:hover:bg-[#3a332d]"
                  >
                    {{ authLabel }}
                  </button>
                </div>
              </div>

              <div class="border-t border-stone-200 pt-4 dark:border-stone-700">
                <button
                  @click="emit('toggle-dark')"
                  class="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:text-white dark:hover:bg-[#3a332d]"
                >
                  <span>Theme</span>
                  <span class="text-lg">{{ darkMode ? '☀' : '☾' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center leading-tight">
          <h1 class="text-3xl font-bold tracking-[0.08em] text-[#7b4f4a] dark:text-[#e0c9b2] md:text-4xl">
    MiraFashion
          </h1>
          <p class="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#b79a72] dark:text-[#d8b892] md:text-xs">
    Timeless Style · Modern You
          </p>
        </div>

        <nav class="flex items-center gap-6 text-sm text-stone-700 dark:text-stone-200">
          <a
            href="/"
            :class="currentPage === 'home' ? 'text-[#9b5d52]' : 'text-stone-700 dark:text-stone-200'"
          >
            HOME
          </a>

          <a
            href="/cart"
            class="flex items-center gap-2"
            :class="currentPage === 'cart' ? 'text-[#9b5d52]' : 'text-stone-700 dark:text-stone-200'"
          >
            <span>🛒</span>
            <span>CART</span>
          </a>

          <button @click="handleAuthClick">
            {{ authLabel }}
          </button>

          <button
            @click="emit('toggle-dark')"
            class="text-2xl text-stone-700 transition hover:text-[#9b5d52] dark:text-stone-200"
            :title="darkMode ? 'Light Mode' : 'Dark Mode'"
          >
            {{ darkMode ? '☀' : '☾' }}
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>


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

  if (props.menuOpen) emit('toggle-menu')
}

function handleMenuCategory(category: string) {
  emit('select-menu-category', category)
}

function handleShowAll() {
  emit('show-all-products')
}

function goToCart() {
  router.push('/cart')
  if (props.menuOpen) emit('toggle-menu')
}

function goToHome() {
  router.push('/')
  if (props.menuOpen) emit('toggle-menu')
}
</script>

<template>
  <header class="border-b border-stone-200 bg-[#ece8d8] dark:border-stone-700 dark:bg-[#1f1b18]">
    <div class="mx-auto max-w-7xl px-3 py-3 sm:px-6">
      <!-- Main row -->
      <div class="flex items-center justify-between gap-2">
        <!-- Left side -->
        <div class="relative flex min-w-0 items-center gap-2">
          <button
            class="shrink-0 text-2xl text-stone-600 transition hover:text-[#9b5d52] dark:text-stone-200"
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
            placeholder="Search..."
            class="w-28 rounded-full border border-stone-300 bg-white px-3 py-2 text-xs text-stone-700 outline-none transition focus:border-[#9b7a5a] sm:w-44 sm:px-4 sm:text-sm md:w-64 dark:border-stone-600 dark:bg-[#2d2824] dark:text-white"
          />

          <!-- Dropdown menu -->
          <div
            v-if="menuOpen"
            class="absolute left-0 top-14 z-50 w-72 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl dark:border-stone-700 dark:bg-[#2d2824]"
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

        <!-- Brand -->
        <div class="min-w-0 flex-1 px-1 text-center">
          <h1 class="truncate text-xl font-bold tracking-[0.04em] text-[#7b4f4a] sm:text-2xl md:text-4xl dark:text-[#e0c9b2]">
            MiraFashion
          </h1>

          <p class="mt-0.5 hidden text-[10px] uppercase tracking-[0.25em] text-[#b79a72] sm:block md:text-xs dark:text-[#d8b892]">
            Timeless Style · Modern You
          </p>
        </div>

        <!-- Right side -->
        <div class="flex shrink-0 items-center gap-2 sm:gap-3">
          <!-- Mobile icons -->
          <div class="flex items-center gap-2 md:hidden">
            <button
              @click="goToCart"
              class="text-lg sm:text-xl"
              :class="currentPage === 'cart' ? 'text-[#9b5d52]' : 'text-stone-700 dark:text-stone-200'"
            >
              🛒
            </button>

            <button
              @click="emit('toggle-dark')"
              class="text-lg text-stone-700 transition hover:text-[#9b5d52] sm:text-xl dark:text-stone-200"
              :title="darkMode ? 'Light Mode' : 'Dark Mode'"
            >
              {{ darkMode ? '☀' : '☾' }}
            </button>
          </div>

          <!-- Desktop / tablet nav -->
          <nav class="hidden items-center gap-5 text-sm text-stone-700 md:flex dark:text-stone-200">
            <button
              @click="goToHome"
              :class="currentPage === 'home' ? 'text-[#9b5d52]' : 'text-stone-700 dark:text-stone-200'"
            >
              HOME
            </button>

            <button
              @click="goToCart"
              class="flex items-center gap-2"
              :class="currentPage === 'cart' ? 'text-[#9b5d52]' : 'text-stone-700 dark:text-stone-200'"
            >
              <span>🛒</span>
              <span>CART</span>
            </button>

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

      <!-- Mobile navigation row -->
      <nav
        class="mt-3 flex items-center justify-center gap-6 border-t border-stone-200 pt-3 text-xs font-semibold tracking-[0.16em] text-stone-700 md:hidden dark:border-stone-700 dark:text-stone-200"
      >
        <button
          @click="goToHome"
          :class="currentPage === 'home' ? 'text-[#9b5d52]' : 'text-stone-700 dark:text-stone-200'"
        >
          HOME
        </button>

        <button
          @click="goToCart"
          :class="currentPage === 'cart' ? 'text-[#9b5d52]' : 'text-stone-700 dark:text-stone-200'"
        >
          CART
        </button>

        <button
          @click="handleAuthClick"
          class="text-stone-700 dark:text-stone-200"
        >
          {{ authLabel }}
        </button>
      </nav>
    </div>
  </header>
</template>
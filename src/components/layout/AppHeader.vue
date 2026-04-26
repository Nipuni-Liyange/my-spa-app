<script setup lang="ts">
defineProps<{
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
</script>

<template>
  <header
    class="border-b border-stone-200 bg-[#ece8d8] dark:border-stone-700 dark:bg-[#1f1b18]"
  >
    <div class="mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <button
            class="text-2xl text-stone-600 transition hover:text-[#9b5d52] dark:text-stone-200"
            @click="emit('toggle-menu')"
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
        </div>

        <h1 class="text-2xl font-semibold tracking-wide text-[#7b4f4a] dark:text-[#e0c9b2]">
          MiraFashion
        </h1>

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

          <a href="/login">LOG IN</a>

          <button
            @click="emit('toggle-dark')"
            class="text-2xl text-stone-700 transition hover:text-[#9b5d52] dark:text-stone-200"
            :title="darkMode ? 'Light Mode' : 'Dark Mode'"
          >
            {{ darkMode ? '☀' : '☾' }}
          </button>
        </nav>
      </div>

      <div
        v-if="menuOpen"
        class="mt-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-md dark:border-stone-700 dark:bg-[#2d2824]"
      >
        <div class="grid gap-3 sm:grid-cols-2">
          <button
            @click="emit('show-all-products')"
            class="rounded-xl border border-stone-200 px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:border-stone-600 dark:text-white dark:hover:bg-[#3a332d]"
          >
            Explore All Products
          </button>

          <button
            @click="emit('select-menu-category', 'Clothes')"
            class="rounded-xl border border-stone-200 px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:border-stone-600 dark:text-white dark:hover:bg-[#3a332d]"
          >
            Clothes
          </button>

          <button
            @click="emit('select-menu-category', 'Footwear')"
            class="rounded-xl border border-stone-200 px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:border-stone-600 dark:text-white dark:hover:bg-[#3a332d]"
          >
            Footwear
          </button>

          <button
            @click="emit('select-menu-category', 'Others')"
            class="rounded-xl border border-stone-200 px-4 py-3 text-left text-sm text-stone-700 transition hover:bg-[#f5f1e8] dark:border-stone-600 dark:text-white dark:hover:bg-[#3a332d]"
          >
            Others
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

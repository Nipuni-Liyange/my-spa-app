<script setup lang="ts">
import { ref } from 'vue'

const showContact = ref(false)
</script>

<template>
  <footer class="mt-12 border-t border-stone-200 bg-[#ece8d8] dark:border-stone-700 dark:bg-[#1f1b18]">
    <div class="mx-auto max-w-7xl px-6 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-[#7b4f4a] dark:text-[#e0c9b2]">MiraFashion</h3>
          <p class="text-xs text-stone-500 dark:text-stone-300">
            © 2026 MiraFashion. All rights reserved.
          </p>
        </div>

        <button
          @click="showContact = !showContact"
          class="text-sm text-stone-600 hover:text-[#9b5d52] dark:text-stone-300"
        >
          Contact
        </button>
      </div>

      <div
        v-if="showContact"
        class="mt-4 rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700 shadow-sm dark:border-stone-700 dark:bg-[#2d2824] dark:text-stone-200"
      >
        <p><strong>Phone:</strong> +94 77 123 4567</p>
        <p><strong>Email:</strong> mirafashion.store@gmail.com</p>
        <p><strong>Facebook:</strong> MiraFashion Official</p>
      </div>
    </div>
  </footer>
</template>

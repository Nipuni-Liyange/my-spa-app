<script setup lang="ts">
import { ref } from 'vue'

const showContactBox = ref(false)

function openContactBox() {
  showContactBox.value = true
}

function closeContactBox() {
  showContactBox.value = false
}
</script>

<template>
  <footer class="mt-12 border-t border-stone-200 bg-[#ece8d8] dark:border-stone-700 dark:bg-[#1f1b18]">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row sm:text-left"
    >
      <div>
        <h3 class="text-2xl font-semibold tracking-[0.04em] text-[#7b4f4a] dark:text-[#e0c9b2]">
          MiraFashion
        </h3>
        <p class="mt-1 text-sm text-stone-500 dark:text-stone-300">
          © 2026 MiraFashion. All rights reserved.
        </p>
      </div>

      <div>
        <button
          @click="openContactBox"
          class="text-base font-medium text-stone-700 transition hover:text-[#9b5d52] dark:text-stone-200"
        >
          Contact
        </button>
      </div>
    </div>

    <div
      v-if="showContactBox"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
    >
      <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#241f1b]">
        <button
          @click="closeContactBox"
          class="absolute right-4 top-4 text-xl text-stone-500 hover:text-stone-700 dark:text-stone-300"
        >
          ✕
        </button>

        <h3 class="text-2xl font-semibold text-[#7b4f4a] dark:text-[#e0c9b2]">
          Contact MiraFashion
        </h3>

        <div class="mt-5 space-y-4 text-sm text-stone-700 dark:text-stone-200">
          <div>
            <p class="font-semibold text-[#9b5d52]">Phone</p>
            <p>+94 77 123 4567</p>
          </div>

          <div>
            <p class="font-semibold text-[#9b5d52]">Email</p>
            <p>mirafashion.store@gmail.com</p>
          </div>

          <div>
            <p class="font-semibold text-[#9b5d52]">Facebook</p>
            <p>MiraFashion Official</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

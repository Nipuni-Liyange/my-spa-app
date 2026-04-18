<script setup lang="ts">
const categories = ['Beauty', 'Fragrances', 'Furniture', 'Groceries', 'Decoration', 'Other']
</script>

<template>
  <section class="mx-auto mt-10 max-w-7xl px-6">
    <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
      <div
        v-for="category in categories"
        :key="category"
        class="flex flex-col items-center"
      >
        <div class="h-20 w-20 rounded-full bg-stone-200"></div>
        <p class="mt-3 text-sm text-stone-700">{{ category }}</p>
      </div>
    </div>
  </section>
</template>

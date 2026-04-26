<script setup lang="ts">
const emit = defineEmits<{
  (e: 'explore'): void
}>()
</script>

<template>
  <section class="mx-auto mt-8 max-w-7xl px-6">
    <div class="grid min-h-[380px] overflow-hidden rounded-[32px] shadow-lg md:grid-cols-3">
      <div
        class="relative flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center"
      >
        <div class="absolute inset-0 bg-black/20"></div>

        <div class="relative z-10 mx-6 rounded-2xl bg-[#f5efde]/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <p class="mb-3 text-sm uppercase tracking-[0.3em] text-[#9b5d52]">
            MiraFashion
          </p>

          <h2 class="text-4xl font-semibold leading-tight text-[#5f4a3d] md:text-5xl">
            Where Miracle Meets
            <br />
            the Magic of Fashion
          </h2>

          <p class="mt-4 text-sm leading-6 text-stone-600 md:text-base">
            Discover elegant styles, timeless accessories, and beauty essentials
            curated for your everyday glow.
          </p>

          <button
            @click="emit('explore')"
            class="mt-6 rounded-full bg-[#b79a72] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#a98b64]"
          >
            Explore Collection
          </button>
        </div>
      </div>

      <div
        class="relative bg-[url('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center"
      >
        <div class="absolute inset-0 bg-black/10"></div>
      </div>

      <div
        class="relative bg-[url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center"
      >
        <div class="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  </section>
</template>

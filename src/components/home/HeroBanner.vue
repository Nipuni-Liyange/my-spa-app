<script setup lang="ts">
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";

const emit = defineEmits<{
  (e: 'explore'): void
}>()
</script>

<template>
  <section class="mx-auto mt-6 max-w-7xl px-3 sm:mt-8 sm:px-6">
    <div class="grid min-h-[300px] overflow-hidden rounded-[24px] shadow-lg sm:min-h-[380px] sm:rounded-[32px] md:grid-cols-3">
      <div
  class="relative flex items-center justify-center bg-cover bg-center md:col-span-1"
  :style="{ backgroundImage: `url(${image1})` }"
>
        <div class="absolute inset-0 bg-black/20"></div>

        <div class="relative z-10 mx-4 my-6 rounded-2xl bg-[#f5efde]/90 p-5 text-center shadow-xl backdrop-blur-sm sm:mx-6 sm:p-8">
          <p class="mb-2 text-[10px] uppercase tracking-[0.28em] text-[#9b5d52] sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
            MiraFashion
          </p>

          <h2
  class="text-[28px] leading-[1.03] tracking-wide text-[#5f463d] drop-shadow-sm sm:text-[34px] md:text-[38px]"
  style="font-family: 'Playfair Display', serif; font-weight: 500;"
>
  Where Miracle
  <br />
  Meets the Magic
  <br />
  <span class="italic text-[#a16458]">
    of Fashion
  </span>
</h2>

          <p class="mt-3 text-sm leading-6 text-stone-600 sm:mt-4 sm:text-base">
            Discover elegant styles, timeless accessories, and beauty essentials
            curated for your everyday glow.
          </p>

          <button
            @click="emit('explore')"
            class="mt-5 rounded-full bg-[#b79a72] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#a98b64] sm:mt-6 sm:px-6 sm:py-3"
          >
            Explore Collection
          </button>
        </div>
      </div>

      <div
  class="relative hidden bg-cover bg-center md:block"
  :style="{ backgroundImage: `url(${image2})` }"
>
        <div class="absolute inset-0 bg-black/10"></div>
      </div>

      <div
  class="relative hidden bg-cover bg-center md:block"
  :style="{ backgroundImage: `url(${image3})` }"
>
        <div class="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  </section>
</template>

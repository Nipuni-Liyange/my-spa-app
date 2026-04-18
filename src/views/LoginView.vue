<script setup lang="ts">
import LoginForm from '../components/auth/LoginForm.vue'
</script>

<template>
  <div class="min-h-screen bg-[#ece8d8] px-6 py-8">
    <div class="mx-auto grid min-h-[85vh] max-w-6xl overflow-hidden rounded-2xl bg-[#f8f4ea] shadow-xl md:grid-cols-2">
      <div
        class="relative hidden md:block"
        style="
          background-image: url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80');
          background-size: cover;
          background-position: center;
        "
      >
        <div class="absolute inset-0 bg-black/20"></div>

        <div class="absolute bottom-10 left-8 z-10 text-white">
          <p class="max-w-sm text-4xl font-medium leading-tight">
            Where Miracle Meets
            the Magic of Fashion
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center px-6 py-10 md:px-12">
        <LoginForm />
      </div>
    </div>

    <footer class="mx-auto mt-6 flex max-w-6xl items-center justify-between px-2 text-sm text-stone-500">
      <div>
        <span class="font-semibold text-[#7b4f4a]">MiraFashion</span>
      </div>
      <div class="flex gap-6">
        <span>Privacy</span>
        <span>Terms</span>
        <span>Shipping</span>
        <span>Contact</span>
      </div>
    </footer>
  </div>
</template>


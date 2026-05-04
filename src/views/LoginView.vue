<script setup lang="ts">
import AppFooter from '../components/layout/AppFooter.vue'
import LoginForm from '../components/auth/LoginForm.vue'
import loginBg from '../assets/images/login-page.png'
</script>

<template>
  <div class="min-h-screen bg-[#f5f1e8] dark:bg-[#181512]">
    <main class="mx-auto max-w-7xl px-6 py-10">
      <div
        class="grid overflow-hidden rounded-[32px] bg-white shadow-xl dark:bg-[#241f1b] lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div
  class="relative min-h-[420px] bg-cover bg-center"
  :style="{ backgroundImage: `url(${loginBg})` }"
>
          <div class="absolute inset-0 bg-black/20"></div>

          <div class="absolute inset-0 flex items-end p-8">
            <div class="max-w-sm text-white">
              <h2 class="text-4xl md:text-5xl text-white leading-tight drop-shadow-sm font-playfair tracking-wide">
  Where Miracle Meets the Magic of Fashion
</h2>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center bg-[#fbf8f2] p-6 dark:bg-[#1f1b18] md:p-10">
          <LoginForm />
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

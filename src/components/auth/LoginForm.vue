<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

async function handleLogin() {
  const success = await authStore.login({
    username: username.value,
    password: password.value,
  })

  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-[28px] border border-stone-200 bg-white p-8 shadow-lg dark:border-stone-700 dark:bg-[#241f1b] md:p-10">
      <div class="text-center">
        <p class="text-xs uppercase tracking-[0.35em] text-[#b79a72] dark:text-[#d8b892]">
          Welcome Back
        </p>

        <h1 class="mt-3 text-4xl font-bold tracking-[0.06em] text-[#7b4f4a] dark:text-[#e0c9b2]">
          MiraFashion
        </h1>

        <p class="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-300">
          Sign in to continue your fashion journey and explore your curated collection.
        </p>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="handleLogin">
        <div>
          <label class="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter DummyJSON username"
            class="w-full rounded-2xl border border-stone-300 bg-[#faf7f2] px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-[#b79a72] focus:bg-white dark:border-stone-600 dark:bg-[#2d2824] dark:text-white dark:focus:border-[#d8b892]"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="w-full rounded-2xl border border-stone-300 bg-[#faf7f2] px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-[#b79a72] focus:bg-white dark:border-stone-600 dark:bg-[#2d2824] dark:text-white dark:focus:border-[#d8b892]"
          />
        </div>

        <div class="rounded-2xl bg-[#f8f1e6] px-4 py-3 text-sm text-stone-600 dark:bg-[#2d2824] dark:text-stone-300">
          <span class="font-semibold text-[#9b5d52] dark:text-[#d8b892]">Demo Login:</span>
          emilys / emilyspass
        </div>

        <p v-if="authStore.error" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-300">
          {{ authStore.error }}
        </p>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full rounded-full bg-[#b79a72] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#a98b64] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {{ authStore.loading ? 'LOGGING IN...' : 'LOGIN' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-xs uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500">
          Timeless Style · Modern You
        </p>
      </div>
    </div>
  </div>
</template>

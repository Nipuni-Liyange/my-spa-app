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
  <div class="w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-lg">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-semibold text-[#7b4f4a]">MiraFashion</h1>
      <p class="mt-3 text-xl font-medium text-stone-700">Welcome Back</p>
      <p class="mt-2 text-sm text-stone-500">
        Sign in to continue your fashion journey
      </p>
    </div>

    <form class="space-y-5" @submit.prevent="handleLogin">
      <div>
        <label class="mb-2 block text-sm font-medium text-stone-600">
          Username
        </label>
        <input
          v-model="username"
          type="text"
          placeholder="Enter DummyJSON username"
          class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#9b7a5a]"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium text-stone-600">
          Password
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
          class="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#9b7a5a]"
        />
      </div>

      <p v-if="authStore.error" class="text-sm text-red-500">
        {{ authStore.error }}
      </p>

      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full rounded-full bg-[#b79a72] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#a98b64] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {{ authStore.loading ? 'LOGGING IN...' : 'LOGIN' }}
      </button>
    </form>

    <div class="mt-8 text-center text-sm text-stone-500">
      After login, the header will show Log Out.
    </div>
  </div>
</template>

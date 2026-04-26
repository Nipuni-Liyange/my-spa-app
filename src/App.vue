<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import FloatingCartButton from './components/layout/FloatingCartButton.vue'

const route = useRoute()

const showFloatingCart = computed(() => route.path !== '/login')
</script>

<template>
  <router-view />
  <FloatingCartButton v-if="showFloatingCart" />
</template>
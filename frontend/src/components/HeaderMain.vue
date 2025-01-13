<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{{ headerText }}</h1>
        <p class="py-6">
          {{ mainText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const headerText = computed(() => {
  return route.path === '/admin' ? 'Admin Dashboard' : 'Home View'
})
const mainText = computed(() => {
  return route.path === '/admin' ? 'admin admin admin admin admin admin admin admin admin admin admin admin admin' : 'home home home home home home home home home home home'
})
</script>

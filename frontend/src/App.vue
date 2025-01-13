<template>
  <div class="flex min-h-screen h-screen w-full flex-col">
    <NavbarMain />
    <main class="flex-1">
      <RouterView />
    </main>
    <FooterMain />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavbarMain from './components/NavbarMain.vue'
import FooterMain from './components/FooterMain.vue'
</script>

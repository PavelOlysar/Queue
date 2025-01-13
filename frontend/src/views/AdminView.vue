<template>
  <main class="w-full h-full flex flex-col items-center p-4 gap-2">
    <HeaderMain />
    <section class="w-full flex justify-center items-center gap-4">
      <input type="text" placeholder="Add location..." class="input input-bordered w-full max-w-xs" />
      <button class="btn btn-primary">Submit</button>
    </section>
    <LocationList />
  </main>
</template>

<script setup lang="ts">
import HeaderMain from '@/components/HeaderMain.vue'
import LocationList from '@/components/LocationList.vue'
</script>

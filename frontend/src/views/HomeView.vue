<template>
  <main class="w-full h-full flex flex-col items-center p-4 gap-2">
    <HeaderMain />
    <LocationList :locations="locations" />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HeaderMain from '@/components/HeaderMain.vue'
import LocationList from '@/components/LocationList.vue'
import { useLocations } from '@/composables/useLocations'

const { locations, fetchLocations } = useLocations()

onMounted(() => {
  fetchLocations()
})
</script>

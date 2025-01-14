<template>
  <main class="w-full h-full flex flex-col items-center p-4 gap-2">
    <HeaderMain />
    <section class="w-full flex justify-center items-center gap-4">
      <input v-model="newLocation" type="text" placeholder="Add location..."
        class="input input-bordered w-full max-w-xs" />
      <button class="btn btn-primary" @click="handleAddLocation">Submit</button>
    </section>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <LocationList :locations="locations" @updateLocation="handleUpdateLocation"
      @deleteLocation="handleDeleteLocation" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderMain from '@/components/HeaderMain.vue'
import LocationList from '@/components/LocationList.vue'
import { useLocations } from '@/composables/useLocations'

const { locations, fetchLocations, addLocation, updateLocation, deleteLocation, error } = useLocations()
const newLocation = ref('')

const handleAddLocation = async () => {
  if (newLocation.value.trim()) {
    await addLocation(newLocation.value.trim())
    if (!error.value) {
      newLocation.value = ''
    }
  }
}

const handleUpdateLocation = async (id: number, name: string) => {
  await updateLocation(id, name)
}

const handleDeleteLocation = async (id: number) => {
  await deleteLocation(id)
}

onMounted(() => {
  fetchLocations()
})
</script>

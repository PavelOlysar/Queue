<template>
  <section class="w-full h-full flex flex-col items-center gap-4 p-6">
    <h2 class="text-4xl font-bold p-4">Locations</h2>
    <ul class="w-full flex flex-col gap-16">
      <li v-for="location in locations" :key="location.id" class="w-full flex flex-col gap-6">
        <div class="flex gap-4 justify-between items-center w-full bg-base-200 p-4">
          <h3 class="text-2xl font-bold p-3">{{ location.name }}</h3>
          <div class="flex gap-4 items-center">
            <input v-if="admin" v-model="location.newName" type="text" placeholder="New location name..."
              class="input input-bordered w-full max-w-xs">
            <button class="btn btn-warning" v-if="admin"
              @click="updateLocation(location.id, location.newName || '')">Update
              Location</button>
          </div>
          <button class="btn btn-error" v-if="admin" @click="deleteLocation(location.id)">Delete
            Location</button>
        </div>
        <p v-if="location.error" class="text-red-500">{{ location.error }}</p>
        <ol class="w-full flex justify-between">
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Ordered</h4>
            <ol class="flex flex-col gap-4">
              <li v-for="order in location.orders.filter(order => order.status === 'ordered')" :key="order.id">
                <OrderMain :order="order" />
              </li>
            </ol>
          </section>
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Prepared</h4>
            <ol class="flex flex-col gap-4">
              <li v-for="order in location.orders.filter(order => order.status === 'prepared')" :key="order.id">
                <OrderMain :order="order" />
              </li>
            </ol>
          </section>
          <section class="w-1/3 flex flex-col gap-4">
            <h4 class="text-lg font-bold">Finished</h4>
            <ol class="flex flex-col gap-4">
              <li v-for="order in location.orders.filter(order => order.status === 'finished')" :key="order.id">
                <OrderMain :order="order" />
              </li>
            </ol>
          </section>
        </ol>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import OrderMain from '@/components/OrderMain.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Location } from '@/types'

const props = defineProps<{ locations: Location[] }>()
const emit = defineEmits(['updateLocation', 'deleteLocation'])

const route = useRoute()

const admin = computed(() => {
  return route.path === '/admin' ? true : false
})

const updateLocation = (id: number, name: string) => {
  if (!name.trim()) {
    props.locations.find(location => location.id === id)!.error = 'Location name cannot be empty'
    return
  }

  if (props.locations.some(location => location.name.toLowerCase() === name.toLowerCase() && location.id !== id)) {
    props.locations.find(location => location.id === id)!.error = 'Location with this name already exists'
    return
  }

  emit('updateLocation', id, name)
  props.locations.find(location => location.id === id)!.error = null
}

const deleteLocation = (id: number) => {
  emit('deleteLocation', id)
}

props.locations.forEach(location => {
  location.newName = ''
  location.error = null
})
</script>

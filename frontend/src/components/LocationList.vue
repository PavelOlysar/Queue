<template>
  <section class="w-full h-full flex flex-col items-center gap-4 p-6">
    <h2 class="text-4xl font-bold p-4">Locations</h2>
    <ul class="w-full flex flex-col gap-16">
      <li v-for="location in locations" :key="location.name" class="w-full flex flex-col gap-6">
        <div class="flex gap-4 items-center">
          <h3 class="text-2xl font-bold p-3">{{ location.name }}</h3>
          <input v-if="admin" type="text" placeholder="Order description..."
            class="input input-bordered w-full max-w-xs">
          <button class="btn btn-primary" v-if="admin">
            Add Order
          </button>
        </div>
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
import type { Order, Location } from '@/types'

const route = useRoute()

const admin = computed(() => {
  return route.path === '/admin' ? true : false
})



// Example orders
const orderedOrder: Order = {
  id: 1,
  location: 'Prague',
  description: 'Order description',
  status: 'ordered'
}

const preparedOrder: Order = {
  id: 2,
  location: 'Prague',
  description: 'Prepared order description',
  status: 'prepared'
}

const finishedOrder: Order = {
  id: 3,
  location: 'Prague',
  description: 'Finished order description',
  status: 'finished'
}

// Example locations
const locations: Location[] = [
  {
    name: 'Prague',
    orders: [orderedOrder, preparedOrder, finishedOrder]
  },
  {
    name: 'Berlin',
    orders: [
      {
        id: 4,
        location: 'Berlin',
        description: 'Berlin order description',
        status: 'ordered'
      }
    ]
  }
]
</script>

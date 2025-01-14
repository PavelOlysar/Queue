<template>
  <div :class="['card', bgColorClass, 'text-black', 'w-96']">
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ order.id }}</h2>
      <p>{{ order.description }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-base font-bold text-2xl" v-if="admin && order.status !== 'ordered'"
          @click="changeStatus('previous')">
          ←
        </button>
        <button class="btn btn-primary font-bold text-2xl" v-if="admin && order.status !== 'finished'"
          @click="changeStatus('next')">
          →
        </button>
      </div>
      <button class="btn btn-error" v-if="admin" @click="deleteOrder">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrders } from '@/composables/useOrders'
import type { Order } from '@/types'

const props = defineProps<{ order: Order }>()
const emit = defineEmits(['statusUpdated', 'orderDeleted'])

const route = useRoute()
const { updateOrderStatus, deleteOrder: deleteOrderApi } = useOrders()

const admin = computed(() => {
  return route.path === '/admin' ? true : false
})

const bgColorClass = computed(() => {
  switch (props.order.status) {
    case 'ordered':
      return 'bg-amber-500'
    case 'prepared':
      return 'bg-blue-500'
    case 'finished':
      return 'bg-green-500'
    default:
      return 'bg-neutral'
  }
})

const changeStatus = async (direction: 'previous' | 'next') => {
  const statusOrder = ['ordered', 'prepared', 'finished']
  const currentIndex = statusOrder.indexOf(props.order.status)
  let newIndex = currentIndex

  if (direction === 'previous' && currentIndex > 0) {
    newIndex = currentIndex - 1
  } else if (direction === 'next' && currentIndex < statusOrder.length - 1) {
    newIndex = currentIndex + 1
  }

  if (newIndex !== currentIndex) {
    const updatedOrder = await updateOrderStatus(props.order.id, statusOrder[newIndex] as 'ordered' | 'prepared' | 'finished')
    if (updatedOrder) {
      emit('statusUpdated', updatedOrder)
    }
  }
}

const deleteOrder = async () => {
  await deleteOrderApi(props.order.id)
  emit('orderDeleted', props.order.id)
}
</script>

<template>
  <div class="card bg-neutral text-neutral-content w-96">
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ props.order.id }}</h2>
      <p>{{ props.order.description }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-ghost font-bold text-2xl" v-if="admin">
          ←
        </button>
        <button class="btn btn-primary font-bold text-2xl" v-if="admin">
          →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Order } from '@/types'

const props = defineProps<{ order: Order }>()

const route = useRoute()

const admin = computed(() => {
  return route.path === '/admin' ? true : false
})
</script>

import { ref } from 'vue'
import type { Order } from '@/types'

export function useOrders() {
  const orders = ref<Order[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const addOrder = async (
    description: string,
    locationId: number,
    status: 'ordered' | 'prepared' | 'finished',
  ) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, locationId, status }),
      })
      if (!response.ok) {
        throw new Error('Failed to add order')
      }
      const newOrder = await response.json()
      orders.value.push(newOrder)
      return newOrder
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
      console.error('Error adding order:', error.value)
    } finally {
      loading.value = false
    }
  }

  const updateOrderStatus = async (id: number, status: 'ordered' | 'prepared' | 'finished') => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        throw new Error('Failed to update order status')
      }
      const updatedOrder = await response.json()
      const index = orders.value.findIndex((order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = updatedOrder
      }
      return updatedOrder
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
      console.error('Error updating order status:', error.value)
    } finally {
      loading.value = false
    }
  }

  const deleteOrder = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete order')
      }
      orders.value = orders.value.filter((order) => order.id !== id)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
      console.error('Error deleting order:', error.value)
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    loading,
    error,
    addOrder,
    updateOrderStatus,
    deleteOrder,
  }
}

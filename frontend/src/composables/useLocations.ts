import { ref } from 'vue'
import type { Location } from '@/types'

export function useLocations() {
  const locations = ref<Location[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchLocations = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/locations')
      if (!response.ok) {
        throw new Error('Failed to fetch locations')
      }
      const data = await response.json()
      locations.value = data
        .map((location: Location) => ({
          ...location,
          orders: location.orders || [],
          newName: '', // Initialize newName as an empty string
        }))
        .sort((a: Location, b: Location) => b.id - a.id) // Sort by id in descending order
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
      console.error('Error fetching locations:', error.value)
    } finally {
      loading.value = false
    }
  }

  const addLocation = async (name: string) => {
    loading.value = true
    error.value = null

    // Check for duplicate location names
    if (locations.value.some((location) => location.name.toLowerCase() === name.toLowerCase())) {
      error.value = 'Location with this name already exists'
      loading.value = false
      return
    }

    try {
      const response = await fetch('http://localhost:3000/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      if (!response.ok) {
        throw new Error('Failed to add location')
      }
      const newLocation = await response.json()
      locations.value.unshift({ ...newLocation, orders: [], newName: '' }) // Add new location to the beginning
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
    } finally {
      loading.value = false
    }
  }

  const updateLocation = async (id: number, name: string) => {
    loading.value = true
    error.value = null

    // Check for empty name
    if (!name.trim()) {
      error.value = 'Location name cannot be empty'
      loading.value = false
      return
    }

    // Check for duplicate location names
    if (
      locations.value.some(
        (location) => location.name.toLowerCase() === name.toLowerCase() && location.id !== id,
      )
    ) {
      error.value = 'Location with this name already exists'
      loading.value = false
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      if (!response.ok) {
        throw new Error('Failed to update location')
      }
      const updatedLocation = await response.json()
      const index = locations.value.findIndex((location) => location.id === id)
      if (index !== -1) {
        locations.value[index] = {
          ...updatedLocation,
          orders: locations.value[index].orders,
          newName: '', // Reset newName after updating
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
    } finally {
      loading.value = false
    }
  }

  const deleteLocation = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete location')
      }
      locations.value = locations.value.filter((location) => location.id !== id)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
    } finally {
      loading.value = false
    }
  }

  return {
    locations,
    loading,
    error,
    fetchLocations,
    addLocation,
    updateLocation,
    deleteLocation,
  }
}

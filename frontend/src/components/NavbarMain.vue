<template>
  <div class="navbar bg-base-100 border-b border-base-300">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><router-link to="/" active-class="font-bold">Home</router-link></li>
          <li><router-link to="/admin" active-class="font-bold">Admin</router-link></li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl">Queue</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/" active-class="font-bold">Home</router-link></li>
        <li><router-link to="/admin" active-class="font-bold">Admin</router-link></li>
      </ul>
    </div>
    <div class="navbar-end">
      <button class="btn btn-secondary" @click="resetData">Restart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocations } from '@/composables/useLocations'

const { fetchLocations } = useLocations()

const resetData = async () => {
  try {
    const response = await fetch('http://localhost:3000/locations/reset', {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('Failed to reset data')
    }
    await fetchLocations()
    window.location.reload()
  } catch (error) {
    console.error('Error resetting data:', error)
  }

  try {
    const response = await fetch('http://localhost:3000/orders/reset', {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('Failed to reset data')
    }
  } catch (error) {
    console.error('Error resetting data:', error)
  }
}
</script>

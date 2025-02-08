import { Hono } from 'hono'
import type { Location } from '../types.ts'
import { locationsData, ordersData } from '../data'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const locations = new Hono()

const createLocationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
})

const updateLocationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
})

locations.get('/', (c) => {
  const locationsWithOrders = locationsData.map((location) => ({
    ...location,
    orders: ordersData.filter((order) => order.locationId === location.id),
  }))
  return c.json(locationsWithOrders)
})

locations.post('/', zValidator('json', createLocationSchema), async (c) => {
  const { name } = await c.req.json()

  if (
    locationsData.some(
      (location) => location.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    return c.json({ message: 'Location with this name already exists' }, 400)
  }

  const newLocation: Location = {
    id: locationsData.length + 1,
    name,
    orders: [],
  }
  locationsData.push(newLocation)

  return c.json(newLocation, 201)
})

locations.put('/:id', zValidator('json', updateLocationSchema), async (c) => {
  const id = Number(c.req.param('id'))
  const { name } = await c.req.json()

  if (
    locationsData.some(
      (location) =>
        location.name.toLowerCase() === name.toLowerCase() && location.id !== id
    )
  ) {
    return c.json({ message: 'Location with this name already exists' }, 400)
  }

  const location = locationsData.find((location) => location.id === id)
  if (!location) {
    return c.json({ message: 'Location not found' }, 404)
  }
  location.name = name
  return c.json(location)
})

locations.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const index = locationsData.findIndex((location) => location.id === id)
  if (index === -1) {
    return c.json({ message: 'Location not found' }, 404)
  }

  const ordersToDelete = ordersData.filter((order) => order.locationId === id)
  ordersToDelete.forEach((order) => {
    const orderIndex = ordersData.findIndex((o) => o.id === order.id)
    if (orderIndex !== -1) {
      ordersData.splice(orderIndex, 1)
    }
  })

  locationsData.splice(index, 1)
  return c.json({ message: 'Location and associated orders deleted' })
})

locations.post('/reset', (c) => {
  locationsData.length = 0
  ordersData.length = 0
  return c.json({ message: 'Data reset' })
})

export default locations

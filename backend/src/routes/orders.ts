import { Hono } from 'hono'
import type { Order } from '../types.ts'
import { ordersData } from '../data'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const orders = new Hono()

const createOrderSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  locationId: z.number().positive('Location ID must be positive'),
  status: z.enum(['ordered', 'prepared', 'finished'], {
    required_error: 'Status must be either ordered, prepared, or finished',
  }),
})

const updateOrderSchema = z.object({
  status: z.enum(['ordered', 'prepared', 'finished'], {
    required_error: 'Status must be either ordered, prepared, or finished',
  }),
})

orders.get('/', (c) => {
  return c.json(ordersData)
})

orders.post('/', zValidator('json', createOrderSchema), async (c) => {
  const { description, locationId, status } = await c.req.json()
  const newOrder: Order = {
    id: ordersData.length + 1,
    description,
    locationId,
    status,
  }
  ordersData.push(newOrder)
  return c.json(newOrder, 201)
})

orders.put('/:id', zValidator('json', updateOrderSchema), async (c) => {
  const id = Number(c.req.param('id'))
  const { status } = await c.req.json()
  const order = ordersData.find((order) => order.id === id)
  if (!order) {
    return c.json({ message: 'Order not found' }, 404)
  }
  order.status = status
  return c.json(order)
})

orders.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const index = ordersData.findIndex((order) => order.id === id)
  if (index === -1) {
    return c.json({ message: 'Order not found' }, 404)
  }
  ordersData.splice(index, 1)
  return c.json({ message: 'Order deleted' })
})

orders.post('/reset', (c) => {
  ordersData.length = 0
  return c.json({ message: 'Data reset' })
})

export default orders

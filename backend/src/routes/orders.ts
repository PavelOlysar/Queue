import { Hono } from 'hono';

const orders = new Hono();

import type { Order } from '../types.ts';

const ordersData: Order[] = [];
const initialOrdersData: Order[] = [];

orders.get('/', (c) => {
  return c.json(ordersData);
});

orders.post('/', async (c) => {});

orders.put('/:id', async (c) => {});

orders.delete('/:id', async (c) => {});

orders.post('/reset', (c) => {
  ordersData.length = 0;
  ordersData.push(...initialOrdersData);
  return c.json({ message: 'Data reset' });
});

export default orders;

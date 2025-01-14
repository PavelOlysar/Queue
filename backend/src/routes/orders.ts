import { Hono } from 'hono';

const orders = new Hono();

// Sample data
const ordersData = [
  { id: 1, locationId: 1, description: 'Order 1', status: 'ordered' },
  { id: 2, locationId: 1, description: 'Order 2', status: 'prepared' },
  { id: 3, locationId: 2, description: 'Order 3', status: 'finished' },
];

// Routes for orders
orders.get('/', (c) => {
  return c.json(ordersData);
});

orders.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const order = ordersData.find((ord) => ord.id === id);
  if (order) {
    return c.json(order);
  } else {
    return c.notFound();
  }
});

export default orders;

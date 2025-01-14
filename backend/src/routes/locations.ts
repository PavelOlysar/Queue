import { Hono } from 'hono';
import type { Location } from '../types.ts';
import { locationsData, ordersData } from '../data';

const locations = new Hono();

locations.get('/', (c) => {
  const locationsWithOrders = locationsData.map((location) => ({
    ...location,
    orders: ordersData.filter((order) => order.locationId === location.id),
  }));
  return c.json(locationsWithOrders);
});

locations.post('/', async (c) => {
  const { name } = await c.req.json();
  const newLocation: Location = {
    id: locationsData.length + 1,
    name,
    orders: [],
  };
  locationsData.push(newLocation);
  return c.json(newLocation, 201);
});

locations.put('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { name } = await c.req.json();
  const location = locationsData.find((location) => location.id === id);
  if (!location) {
    return c.json({ message: 'Location not found' }, 404);
  }
  location.name = name;
  return c.json(location);
});

locations.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const index = locationsData.findIndex((location) => location.id === id);
  if (index === -1) {
    return c.json({ message: 'Location not found' }, 404);
  }

  const ordersToDelete = ordersData.filter((order) => order.locationId === id);
  ordersToDelete.forEach((order) => {
    const orderIndex = ordersData.findIndex((o) => o.id === order.id);
    if (orderIndex !== -1) {
      ordersData.splice(orderIndex, 1);
    }
  });

  locationsData.splice(index, 1);
  return c.json({ message: 'Location and associated orders deleted' });
});

locations.post('/reset', (c) => {
  locationsData.length = 0;
  ordersData.length = 0;
  return c.json({ message: 'Data reset' });
});

export default locations;

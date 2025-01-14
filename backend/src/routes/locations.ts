import { Hono } from 'hono';

const locations = new Hono();

import type { Location } from '../types.ts';

const locationsData: Location[] = [];

locations.get('/', (c) => {
  return c.json(locationsData);
});

locations.post('/', async (c) => {
  const { name } = await c.req.json();
  const newLocation = {
    id: locationsData.length + 1,
    name,
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
  locationsData.splice(index, 1);
  return c.json({ message: 'Location deleted' });
});

export default locations;

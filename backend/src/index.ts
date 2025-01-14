import { Hono } from 'hono';
import { cors } from 'hono/cors';
import locations from './routes/locations';
import orders from './routes/orders';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/locations', locations);
app.route('/orders', orders);

export default app;

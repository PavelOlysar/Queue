import { Hono } from 'hono';
import Home from './pages/Home';

const app = new Hono();

app.get('/', (c) => {
  return c.html(<Home />);
});
export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};

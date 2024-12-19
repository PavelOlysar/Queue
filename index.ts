import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HTMX + Tailwind</title>
      <script src="https://unpkg.com/htmx.org"></script>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="p-4">
      <h1 class="text-2xl font-bold">Hello, HTMX!</h1>
      <button hx-get="/update" hx-target="#result" class="btn btn-primary">
        Click Me
      </button>
      <div id="result" class="mt-4"></div>
    </body>
    </html>
  `);
});

app.get('/update', (c) =>
  c.html('<p class="text-green-500">Updated via HTMX!</p>')
);

Bun.serve({
  fetch(req) {
    return app.fetch(req);
  },
  port: 6969,
});

console.log('Server running on http://localhost:6969');

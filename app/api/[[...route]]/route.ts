import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");;
app.use('/*', cors());

const WEATHER_API_KEY = '2c34f3ac415c611be0e3f6b9cf55e5f6'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

app.get('/weather/:lat/:lon', async (c) => {
  const { lat, lon } = c.req.param();
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const data = await response.json();
  return c.json(data);
});

app.get('/location/:query', async (c) => {
  const { query } = c.req.param();
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${WEATHER_API_KEY}`
  );
  console.log("ok")
  const data = await response.json();
  return c.json(data);
});

export const GET = handle(app);
export default app as never;
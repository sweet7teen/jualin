import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => ({
  origin: process.env.CORS_ORIGIN ?? process.env.FRONTEND_URL ?? 'http://localhost:3000',
  credentials: process.env.CORS_CREDENTIALS !== 'false',
}));

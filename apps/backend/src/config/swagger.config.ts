import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE ?? 'Belidisini API',
  description: process.env.SWAGGER_DESCRIPTION ?? 'Belidisini SaaS Marketplace API',
  version: process.env.SWAGGER_VERSION ?? '0.1.0',
}));

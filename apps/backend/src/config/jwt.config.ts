import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
  refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret-change-me',
  accessExpiry: parseInt(process.env.JWT_ACCESS_EXPIRY ?? '900', 10),
  refreshExpiry: parseInt(process.env.JWT_REFRESH_EXPIRY ?? '604800', 10),
}));

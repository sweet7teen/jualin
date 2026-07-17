import { registerAs } from '@nestjs/config';

export default registerAs('payment', () => ({
  qrisExpiryMinutes: parseInt(process.env.QRIS_EXPIRY_MINUTES ?? '60', 10),
}));

export const APP_CONFIG = {
  name: 'Belidisini',
  description: 'SaaS Marketplace Platform',
  version: '0.1.0',
} as const;

export const SUBSCRIPTION_PLANS = [
  { id: '3-days', name: '3 Days', days: 3, price: 5000 },
  { id: '7-days', name: '7 Days', days: 7, price: 10000 },
  { id: '30-days', name: '30 Days', days: 30, price: 25000 },
] as const;

export const API_PREFIX = 'api/v1';

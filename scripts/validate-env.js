#!/usr/bin/env node

/**
 * Environment validation script.
 * Run: node scripts/validate-env.js
 * Exits with code 1 if any required variable is missing or using a fallback default.
 */

const required = [
  { name: 'DATABASE_URL', hint: 'mysql://user:pass@host:3306/belidisini' },
  { name: 'JWT_SECRET', hint: 'Use a random 64-character string' },
  { name: 'JWT_REFRESH_SECRET', hint: 'Use a different random 64-character string' },
];

const forbiddenDefaults = ['dev-secret-change-me', 'dev-refresh-secret-change-me', 'change-me-in-production'];

let exitCode = 0;

console.log('🔍 Validating environment variables...\n');

for (const { name, hint } of required) {
  const value = process.env[name];

  if (!value) {
    console.error(`MISSING: ${name} — ${hint}`);
    exitCode = 1;
    continue;
  }

  if (forbiddenDefaults.includes(value)) {
    console.error(`INSECURE: ${name} is still using the default value. ${hint}`);
    exitCode = 1;
    continue;
  }

  console.log(`OK: ${name} is set`);
}

if (exitCode === 0) {
  console.log('\nAll required environment variables are present and secure.');
} else {
  console.error('\nOne or more environment variables are missing or insecure. Fix before deploying.');
}

process.exit(exitCode);

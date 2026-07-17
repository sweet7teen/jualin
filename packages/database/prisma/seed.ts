import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const existing = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Admin',
          role: 'SUPER_ADMIN',
          buyerProfile: { create: {} },
        },
      });

      console.log(`✅ SUPER_ADMIN user created: ${adminEmail}`);
    } else {
      console.log(`ℹ️  SUPER_ADMIN user already exists: ${adminEmail}`);
    }
  } else {
    console.log('⚠️  ADMIN_EMAIL and ADMIN_PASSWORD not set — skipping admin seed');
  }

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

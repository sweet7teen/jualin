import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: Record<string, jest.Mock>;

  const mockPrisma = {
    subscription: { findUnique: jest.fn() },
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = mockPrisma;
  });

  describe('isSubscriptionActive (via create logic)', () => {
    it('should return false if no subscription found', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue(null);
      const result = await (service as any).isSubscriptionActive('store-1');
      expect(result).toBe(false);
    });

    it('should return false if subscription status is INACTIVE', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue({
        status: 'INACTIVE',
        endDate: new Date(Date.now() + 86400000),
      });
      const result = await (service as any).isSubscriptionActive('store-1');
      expect(result).toBe(false);
    });

    it('should return false if subscription endDate has passed', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue({
        status: 'ACTIVE',
        endDate: new Date(Date.now() - 86400000),
      });
      const result = await (service as any).isSubscriptionActive('store-1');
      expect(result).toBe(false);
    });

    it('should return true if subscription is ACTIVE and not expired', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue({
        status: 'ACTIVE',
        endDate: new Date(Date.now() + 86400000),
      });
      const result = await (service as any).isSubscriptionActive('store-1');
      expect(result).toBe(true);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CheckoutService } from './checkout.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let prisma: Record<string, jest.Mock>;

  const mockPrisma = {
    buyerProfile: { findUnique: jest.fn() },
    cartItem: { findMany: jest.fn(), deleteMany: jest.fn() },
    order: { create: jest.fn() },
    product: { updateMany: jest.fn() },
    $transaction: jest.fn(),
  };

  const mockPaymentService = {
    createPayment: jest.fn().mockResolvedValue({ id: 'payment-1' }),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: PaymentService, useValue: mockPaymentService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
    prisma = mockPrisma;
  });

  describe('checkout', () => {
    it('should throw NotFoundException if buyer profile not found', async () => {
      mockPrisma.buyerProfile.findUnique.mockResolvedValue(null);

      await expect(
        service.checkout('user-1', { notes: undefined }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if cart is empty', async () => {
      mockPrisma.buyerProfile.findUnique.mockResolvedValue({ id: 'buyer-1' });
      mockPrisma.cartItem.findMany.mockResolvedValue([]);

      await expect(
        service.checkout('user-1', { notes: undefined }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if product is not ACTIVE', async () => {
      mockPrisma.buyerProfile.findUnique.mockResolvedValue({ id: 'buyer-1' });
      mockPrisma.cartItem.findMany.mockResolvedValue([
        {
          id: 'item-1',
          quantity: 1,
          product: {
            id: 'prod-1',
            name: 'Widget',
            status: 'INACTIVE',
            stock: 5,
            price: 1000,
            store: { isActive: true, name: 'Store' },
          },
        },
      ]);

      await expect(
        service.checkout('user-1', { notes: undefined }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if store is suspended', async () => {
      mockPrisma.buyerProfile.findUnique.mockResolvedValue({ id: 'buyer-1' });
      mockPrisma.cartItem.findMany.mockResolvedValue([
        {
          id: 'item-1',
          quantity: 1,
          product: {
            id: 'prod-1',
            name: 'Widget',
            status: 'ACTIVE',
            stock: 5,
            price: 1000,
            store: { isActive: false, name: 'Suspended Store' },
          },
        },
      ]);

      await expect(
        service.checkout('user-1', { notes: undefined }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});

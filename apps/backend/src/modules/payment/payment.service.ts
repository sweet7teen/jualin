import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PaymentStatus } from '@belidisini/database';
import { PrismaService } from '../../prisma/prisma.service';
import { PAYMENT_PROVIDER } from './payment.constants';
import type { PaymentProvider, CreatePaymentInput } from './providers/payment-provider.interface';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    @Inject(PAYMENT_PROVIDER) private provider: PaymentProvider,
  ) {}

  async createPayment(input: CreatePaymentInput) {
    const payment = await this.prisma.payment.create({
      data: {
        orderId: input.orderId,
        provider: this.getProviderName(),
        amount: input.amount,
        currency: input.currency ?? 'IDR',
      },
    });

    const result = await this.provider.createPayment(input);

    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerPaymentId: result.providerPaymentId,
        expiresAt: result.expiresAt,
      },
    });

    return this.prisma.payment.findUniqueOrThrow({ where: { id: payment.id } });
  }

  async verifyPayment(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (!payment.providerPaymentId) {
      return payment;
    }

    const result = await this.provider.verifyPayment(payment.providerPaymentId);

    if (result.status === 'PAID') {
      await this.prisma.payment.update({
        where: { id: paymentId },
        data: { status: PaymentStatus.PAID, paidAt: result.paidAt ?? new Date() },
      });
    }

    return this.prisma.payment.findUniqueOrThrow({ where: { id: paymentId } });
  }

  async refundPayment(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (!payment.providerPaymentId) {
      throw new Error('No provider payment ID — cannot process refund');
    }

    const result = await this.provider.refundPayment(payment.providerPaymentId, payment.amount);

    if (result.success) {
      await this.prisma.payment.update({
        where: { id: paymentId },
        data: { status: PaymentStatus.REFUNDED },
      });
    }

    return this.prisma.payment.findUniqueOrThrow({ where: { id: paymentId } });
  }

  private getProviderName(): string {
    return this.provider.constructor.name.toLowerCase().replace('paymentprovider', '');
  }
}

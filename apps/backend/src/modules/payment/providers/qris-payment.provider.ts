import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  PaymentProvider,
  CreatePaymentInput,
  CreatePaymentResult,
  VerifyPaymentResult,
  RefundResult,
} from './payment-provider.interface';

@Injectable()
export class QrisPaymentProvider implements PaymentProvider {
  constructor(private configService: ConfigService) {}

  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const expiresInMinutes = this.configService.get<number>('payment.qrisExpiryMinutes', 60);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

    return Promise.resolve({
      providerPaymentId: `qris-${input.orderId}-${Date.now()}`,
      paymentUrl: `qris://payment?order=${input.orderId}&amount=${input.amount}`,
      expiresAt,
    });
  }

  verifyPayment(_providerPaymentId: string): Promise<VerifyPaymentResult> {
    // In production: call QRIS gateway to verify.
    // For now: assume still pending — webhook will mark as PAID.
    return Promise.resolve({ status: 'PENDING' });
  }

  refundPayment(_providerPaymentId: string, _amount: number): Promise<RefundResult> {
    // In production: call QRIS gateway to process refund.
    return Promise.resolve({
      success: true,
      providerRefundId: `refund-${_providerPaymentId}`,
    });
  }
}

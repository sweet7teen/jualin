import {
  PaymentProvider,
  CreatePaymentInput,
  CreatePaymentResult,
  VerifyPaymentResult,
  RefundResult,
} from './payment-provider.interface';

export class NoopPaymentProvider implements PaymentProvider {
  createPayment(_input: CreatePaymentInput): Promise<CreatePaymentResult> {
    // noop — replaced by concrete provider via DI
    throw new Error(
      'Payment provider not configured. Register a concrete provider before processing payments.',
    );
  }

  verifyPayment(_providerPaymentId: string): Promise<VerifyPaymentResult> {
    // noop — replaced by concrete provider via DI
    throw new Error(
      'Payment provider not configured. Register a concrete provider before processing payments.',
    );
  }

  refundPayment(_providerPaymentId: string, _amount: number): Promise<RefundResult> {
    // noop — replaced by concrete provider via DI
    throw new Error(
      'Payment provider not configured. Register a concrete provider before processing payments.',
    );
  }
}

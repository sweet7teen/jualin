export interface CreatePaymentInput {
  orderId: string;
  amount: number;
  currency?: string;
}

export interface CreatePaymentResult {
  providerPaymentId: string;
  paymentUrl?: string;
  expiresAt?: Date;
}

export interface VerifyPaymentResult {
  status: 'PAID' | 'EXPIRED' | 'PENDING';
  paidAt?: Date;
}

export interface RefundResult {
  success: boolean;
  providerRefundId?: string;
}

export interface PaymentProvider {
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  verifyPayment(providerPaymentId: string): Promise<VerifyPaymentResult>;
  refundPayment(providerPaymentId: string, amount: number): Promise<RefundResult>;
}

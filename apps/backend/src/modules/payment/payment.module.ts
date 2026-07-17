import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { QrisPaymentProvider } from './providers/qris-payment.provider';
import { PAYMENT_PROVIDER } from './payment.constants';

@Module({
  providers: [
    PaymentService,
    {
      provide: PAYMENT_PROVIDER,
      useClass: QrisPaymentProvider,
    },
  ],
  exports: [PaymentService],
})
export class PaymentModule {}

import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { NoopPaymentProvider } from './providers/noop-payment.provider';
import { PAYMENT_PROVIDER } from './payment.constants';

@Module({
  providers: [
    PaymentService,
    {
      provide: PAYMENT_PROVIDER,
      useClass: NoopPaymentProvider,
    },
  ],
  exports: [PaymentService],
})
export class PaymentModule {}

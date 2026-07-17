import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoreModule } from './modules/store/store.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { PaymentModule } from './modules/payment/payment.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { OrdersModule } from './modules/orders/orders.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import configs from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: configs,
    }),
    PrismaModule,
    AuthModule,
    StoreModule,
    ProductModule,
    CartModule,
    PaymentModule,
    CheckoutModule,
    OrdersModule,
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

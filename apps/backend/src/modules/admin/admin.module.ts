import { Module } from '@nestjs/common';
import { AdminUsersService } from './services/admin-users.service';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminStoresService } from './services/admin-stores.service';
import { AdminStoresController } from './controllers/admin-stores.controller';
import { AdminSubscriptionsService } from './services/admin-subscriptions.service';
import { AdminSubscriptionsController } from './controllers/admin-subscriptions.controller';
import { AdminProductsService } from './services/admin-products.service';
import { AdminProductsController } from './controllers/admin-products.controller';

@Module({
  controllers: [
    AdminUsersController,
    AdminStoresController,
    AdminSubscriptionsController,
    AdminProductsController,
  ],
  providers: [
    AdminUsersService,
    AdminStoresService,
    AdminSubscriptionsService,
    AdminProductsService,
  ],
})
export class AdminModule {}

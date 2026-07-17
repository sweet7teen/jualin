import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PolicyService {
  constructor(private prisma: PrismaService) {}

  async ensureStoreOwner(storeId: string, userId: string): Promise<void> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
      select: { userId: true },
    });

    if (!store) throw new NotFoundException('Store not found');
    if (store.userId !== userId) throw new ForbiddenException('You do not own this store');
  }

  async ensureProductOwner(productId: string, userId: string): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { store: { select: { userId: true } } },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (product.store.userId !== userId) throw new ForbiddenException('You do not own this product');
  }

  async ensureOrderBuyer(orderId: string, userId: string): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { userId: true },
    });

    if (!order || order.userId !== userId) throw new NotFoundException('Order not found');
  }
}

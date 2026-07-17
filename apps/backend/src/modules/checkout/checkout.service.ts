import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService,
  ) {}

  async checkout(userId: string, dto: CheckoutDto) {
    const buyerProfile = await this.prisma.buyerProfile.findUnique({
      where: { userId },
    });

    if (!buyerProfile) {
      throw new NotFoundException('Buyer profile not found');
    }

    const cartItems = await this.prisma.cartItem.findMany({
      where: { buyerId: buyerProfile.id },
      include: {
        product: {
          include: { store: true },
        },
      },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    for (const item of cartItems) {
      const product = item.product;

      if (product.status !== 'ACTIVE') {
        throw new BadRequestException(`Product "${product.name}" is no longer available`);
      }

      if (!product.store.isActive) {
        throw new BadRequestException(
          `Store "${product.store.name}" is currently suspended â€” cannot process checkout`,
        );
      }
    }

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const order = await this.prisma.$transaction(async (tx) => {
      for (const item of cartItems) {
        if (item.quantity > item.product.stock) {
          throw new BadRequestException(
            `Insufficient stock for "${item.product.name}". Available: ${item.product.stock}, requested: ${item.quantity}`,
          );
        }
      }

      const created = await tx.order.create({
        data: {
          userId,
          buyerId: buyerProfile.id,
          total,
          notes: dto.notes,
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      });

      for (const item of cartItems) {
        const result = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });

        if (result.count === 0) {
          throw new InternalServerErrorException(
            `Concurrent stock conflict for "${item.product.name}"`,
          );
        }
      }

      await tx.cartItem.deleteMany({
        where: { buyerId: buyerProfile.id },
      });

      return created;
    });

    const payment = await this.paymentService.createPayment({
      orderId: order.id,
      amount: total,
    });

    return { order, payment };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async findAll(userId: string, page?: number) {
    const defaultLimit = this.configService.get<number>('pagination.defaultLimit', 20);
    const skip = page ? (page - 1) * defaultLimit : 0;

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: defaultLimit,
        skip,
        include: {
          items: {
            include: {
              product: {
                select: { id: true, name: true, slug: true, images: true },
              },
            },
          },
          payment: {
            select: { status: true, provider: true, paidAt: true },
          },
        },
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);

    return {
      data: orders.map((o) => ({
        ...o,
        items: o.items.map((item) => ({
          ...item,
          product: {
            ...item.product,
            images: item.product.images ? (JSON.parse(item.product.images) as string[]) : [],
          },
        })),
      })),
      meta: {
        total,
        limit: defaultLimit,
        page: page ?? 1,
        totalPages: Math.ceil(total / defaultLimit),
      },
    };
  }

  async findById(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, slug: true, images: true },
            },
          },
        },
        payment: true,
      },
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          images: item.product.images ? (JSON.parse(item.product.images) as string[]) : [],
        },
      })),
    };
  }
}

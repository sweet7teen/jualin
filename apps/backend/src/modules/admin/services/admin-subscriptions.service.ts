import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto/subscription.dto';

@Injectable()
export class AdminSubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number) {
    const limit = 20;
    const skip = page ? (page - 1) * limit : 0;

    const [subscriptions, total] = await Promise.all([
      this.prisma.subscription.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
        include: {
          store: { select: { id: true, name: true, slug: true } },
        },
      }),
      this.prisma.subscription.count(),
    ]);

    return {
      data: subscriptions,
      meta: { total, limit, page: page ?? 1, totalPages: Math.ceil(total / limit) },
    };
  }

  async create(dto: CreateSubscriptionDto) {
    const store = await this.prisma.store.findUnique({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const existing = await this.prisma.subscription.findUnique({ where: { storeId: dto.storeId } });
    if (existing) {
      throw new ConflictException('Store already has a subscription');
    }

    const endDate = dto.endDate ? new Date(dto.endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return this.prisma.subscription.create({
      data: {
        storeId: dto.storeId,
        plan: dto.plan,
        price: dto.price,
        endDate,
      },
    });
  }

  async update(id: string, dto: UpdateSubscriptionDto) {
    const sub = await this.prisma.subscription.findUnique({ where: { id } });
    if (!sub) {
      throw new NotFoundException('Subscription not found');
    }

    const data: Record<string, unknown> = {};
    if (dto.status) data.status = dto.status;
    if (dto.endDate) data.endDate = new Date(dto.endDate);

    return this.prisma.subscription.update({ where: { id }, data });
  }
}

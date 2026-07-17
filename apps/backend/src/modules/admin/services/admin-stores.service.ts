import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateStoreDto } from '../dto/update-store.dto';

@Injectable()
export class AdminStoresService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number, isActive?: string) {
    const limit = 20;
    const skip = page ? (page - 1) * limit : 0;

    const where = isActive !== undefined ? { isActive: isActive === 'true' } : {};

    const [stores, total] = await Promise.all([
      this.prisma.store.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
        include: {
          user: { select: { id: true, email: true, name: true } },
          _count: { select: { products: true } },
          subscription: { select: { status: true, plan: true, endDate: true } },
        },
      }),
      this.prisma.store.count({ where }),
    ]);

    return {
      data: stores,
      meta: { total, limit, page: page ?? 1, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, name: true } },
        products: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          select: { id: true, name: true, slug: true, price: true, stock: true, status: true },
        },
        subscription: true,
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  async update(id: string, dto: UpdateStoreDto) {
    const store = await this.prisma.store.findUnique({ where: { id } });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    if (dto.slug && dto.slug !== store.slug) {
      const existing = await this.prisma.store.findUnique({ where: { slug: dto.slug } });
      if (existing) {
        throw new NotFoundException('Slug already taken');
      }
    }

    return this.prisma.store.update({
      where: { id },
      data: dto,
      select: {
        id: true, name: true, slug: true, isActive: true, updatedAt: true,
      },
    });
  }
}

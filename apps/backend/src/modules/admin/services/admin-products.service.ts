import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class AdminProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number, storeId?: string) {
    const limit = 20;
    const skip = page ? (page - 1) * limit : 0;

    const where = storeId ? { storeId } : {};

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
        include: {
          store: { select: { id: true, name: true, slug: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products.map((p) => ({
        ...p,
        images: p.images ? (JSON.parse(p.images) as string[]) : [],
      })),
      meta: { total, limit, page: page ?? 1, totalPages: Math.ceil(total / limit) },
    };
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: {
        store: { select: { id: true, name: true } },
      },
    });
  }
}

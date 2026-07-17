import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const buyer = await this.prisma.buyerProfile.findUnique({
      where: { userId },
    });

    if (!buyer) {
      throw new NotFoundException('Buyer profile not found');
    }

    const items = await this.prisma.wishlist.findMany({
      where: { buyerId: buyer.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            images: true,
            status: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });

    return items.map((item) => ({
      id: item.id,
      product: {
        ...item.product,
        images: item.product.images ? (JSON.parse(item.product.images) as string[]) : [],
      },
      createdAt: item.id,
    }));
  }

  async add(userId: string, productId: string) {
    const buyer = await this.prisma.buyerProfile.findUnique({
      where: { userId },
    });

    if (!buyer) {
      throw new NotFoundException('Buyer profile not found');
    }

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || product.status !== 'ACTIVE') {
      throw new NotFoundException('Product not found');
    }

    const existing = await this.prisma.wishlist.findUnique({
      where: { buyerId_productId: { buyerId: buyer.id, productId } },
    });

    if (existing) {
      throw new ConflictException('Product already in wishlist');
    }

    return this.prisma.wishlist.create({
      data: { buyerId: buyer.id, productId },
    });
  }

  async remove(userId: string, itemId: string) {
    const buyer = await this.prisma.buyerProfile.findUnique({
      where: { userId },
    });

    if (!buyer) {
      throw new NotFoundException('Buyer profile not found');
    }

    const item = await this.prisma.wishlist.findUnique({
      where: { id: itemId },
    });

    if (!item || item.buyerId !== buyer.id) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.prisma.wishlist.delete({
      where: { id: itemId },
    });
  }
}

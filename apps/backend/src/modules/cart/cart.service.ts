import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async findAll(buyerId: string) {
    const items = await this.prisma.cartItem.findMany({
      where: { buyerId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            stock: true,
            images: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        ...item.product,
        images: item.product.images ? (JSON.parse(item.product.images) as string[]) : [],
      },
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }

  async add(buyerId: string, dto: AddCartItemDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product || product.status !== 'ACTIVE') {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < 1) {
      throw new BadRequestException('Product is out of stock');
    }

    if (dto.quantity > product.stock) {
      throw new BadRequestException(
        `Requested quantity exceeds available stock (${product.stock})`,
      );
    }

    const item = await this.prisma.cartItem.upsert({
      where: {
        buyerId_productId: { buyerId, productId: dto.productId },
      },
      update: { quantity: dto.quantity },
      create: {
        buyerId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
    });

    return item;
  }

  async update(buyerId: string, itemId: string, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { product: true },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (item.buyerId !== buyerId) {
      throw new ForbiddenException('You do not own this cart item');
    }

    if (dto.quantity > item.product.stock) {
      throw new BadRequestException(
        `Requested quantity exceeds available stock (${item.product.stock})`,
      );
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });
  }

  async remove(buyerId: string, itemId: string) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (item.buyerId !== buyerId) {
      throw new ForbiddenException('You do not own this cart item');
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }
}

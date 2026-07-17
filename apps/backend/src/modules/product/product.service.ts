import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(storeId: string, userId: string, dto: CreateProductDto) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    if (store.userId !== userId) {
      throw new ForbiddenException('You do not own this store');
    }

    const existingSlug = await this.prisma.product.findFirst({
      where: { storeId, slug: dto.slug },
    });

    if (existingSlug) {
      throw new ConflictException('Product slug is already taken in this store');
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { storeId },
    });

    const hasActiveSubscription =
      subscription?.status === 'ACTIVE' && subscription.endDate > new Date();

    const status = hasActiveSubscription ? 'ACTIVE' : 'DRAFT';

    const product = await this.prisma.product.create({
      data: {
        storeId,
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        price: dto.price,
        stock: dto.stock ?? 0,
        images: dto.images ? JSON.stringify(dto.images) : undefined,
        status,
      },
    });

    return product;
  }

  async findAll(storeId: string, page?: number) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store || !store.isActive) {
      throw new NotFoundException('Store not found');
    }

    if (!(await this.isSubscriptionActive(storeId))) {
      return {
        data: [],
        meta: { total: 0, limit: 0, page: page ?? 1, totalPages: 0 },
      };
    }

    const defaultLimit = this.configService.get<number>('pagination.defaultLimit', 20);
    const skip = page ? (page - 1) * defaultLimit : 0;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { storeId, status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: defaultLimit,
        skip,
      }),
      this.prisma.product.count({
        where: { storeId, status: 'ACTIVE' },
      }),
    ]);

    return {
      data: products.map((p) => ({
        ...p,
        images: p.images ? (JSON.parse(p.images) as string[]) : [],
      })),
      meta: {
        total,
        limit: defaultLimit,
        page: page ?? 1,
        totalPages: Math.ceil(total / defaultLimit),
      },
    };
  }

  async findBySlug(storeSlug: string, productSlug: string) {
    const store = await this.prisma.store.findUnique({
      where: { slug: storeSlug },
    });

    if (!store || !store.isActive) {
      throw new NotFoundException('Store not found');
    }

    if (!(await this.isSubscriptionActive(store.id))) {
      throw new NotFoundException('Product not found');
    }

    const product = await this.prisma.product.findFirst({
      where: { storeId: store.id, slug: productSlug },
    });

    if (!product || product.status !== 'ACTIVE') {
      throw new NotFoundException('Product not found');
    }

    return {
      ...product,
      images: product.images ? (JSON.parse(product.images) as string[]) : [],
    };
  }

  async update(productId: string, userId: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { store: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.store.userId !== userId) {
      throw new ForbiddenException('You do not own this product');
    }

    if (dto.slug && dto.slug !== product.slug) {
      const existingSlug = await this.prisma.product.findFirst({
        where: { storeId: product.storeId, slug: dto.slug },
      });

      if (existingSlug) {
        throw new ConflictException('Product slug is already taken in this store');
      }
    }

    const data: Record<string, unknown> = { ...dto };
    if (dto.images) {
      data.images = JSON.stringify(dto.images);
    }

    return this.prisma.product.update({
      where: { id: productId },
      data,
    });
  }

  async remove(productId: string, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { store: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.store.userId !== userId) {
      throw new ForbiddenException('You do not own this product');
    }

    return this.prisma.product.update({
      where: { id: productId },
      data: { status: 'ARCHIVED' },
    });
  }

  private async isSubscriptionActive(storeId: string): Promise<boolean> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { storeId },
    });

    return subscription?.status === 'ACTIVE' && subscription.endDate > new Date();
  }
}

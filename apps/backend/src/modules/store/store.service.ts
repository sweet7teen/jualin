import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../cache/cache.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private cacheService: CacheService,
  ) {}

  async create(userId: string, dto: CreateStoreDto) {
    const existingSlug = await this.prisma.store.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new ConflictException('Slug is already taken');
    }

    const existingUserStore = await this.prisma.store.findUnique({
      where: { userId },
    });

    if (existingUserStore) {
      throw new ConflictException('User already has a store');
    }

    const store = await this.prisma.store.create({
      data: {
        userId,
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
      },
    });

    this.cacheService.invalidate('stores');
    return store;
  }

  async findAll() {
    const cached = this.cacheService.get<any>('stores:list');
    if (cached) return cached;

    const defaultLimit = this.configService.get<number>('pagination.defaultLimit', 20);

    const stores = await this.prisma.store.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: defaultLimit,
    });

    const total = await this.prisma.store.count({
      where: { isActive: true },
    });

    const result = {
      data: stores,
      meta: { total, limit: defaultLimit },
    };

    this.cacheService.set('stores:list', result, 300_000);
    return result;
  }

  async findBySlug(slug: string) {
    const store = await this.prisma.store.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: 'ACTIVE' },
          take: 20,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!store || !store.isActive) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  async update(userId: string, storeId: string, dto: UpdateStoreDto) {
    const store = await this.prisma.store.findUnique({ where: { id: storeId } });

    if (!store) throw new NotFoundException('Store not found');
    if (store.userId !== userId) throw new ForbiddenException('You do not own this store');

    if (dto.slug && dto.slug !== store.slug) {
      const existingSlug = await this.prisma.store.findUnique({ where: { slug: dto.slug } });
      if (existingSlug) throw new ConflictException('Slug is already taken');
    }

    const updated = await this.prisma.store.update({ where: { id: storeId }, data: dto });
    this.cacheService.invalidate('stores');
    return updated;
  }

  async remove(userId: string, storeId: string) {
    const store = await this.prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');
    if (store.userId !== userId) throw new ForbiddenException('You do not own this store');

    const result = await this.prisma.store.update({ where: { id: storeId }, data: { isActive: false } });
    this.cacheService.invalidate('stores');
    return result;
  }
}

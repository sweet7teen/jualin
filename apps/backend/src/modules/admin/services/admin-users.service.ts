import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { Role } from '@belidisini/database';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: number, role?: string) {
    const limit = 20;
    const skip = page ? (page - 1) * limit : 0;

    const where = role ? { role: role as Role } : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { orders: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: { total, limit, page: page ?? 1, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { orders: true, refreshTokens: true } },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, currentUserId: string, data: { role?: Role; isActive?: boolean; name?: string; email?: string }) {
    if (id === currentUserId) {
      if (data.role && data.role !== (await this.getCurrentRole(id))) {
        throw new ForbiddenException('Cannot change your own role');
      }

      if (data.isActive === false) {
        throw new ForbiddenException('Cannot deactivate your own account');
      }
    }

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email && data.email !== user.email) {
      const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (existing) {
        throw new ConflictException('Email already in use');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true, email: true, name: true, role: true, isActive: true, updatedAt: true,
      },
    });
  }

  private async getCurrentRole(userId: string): Promise<Role> {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    return user!.role;
  }
}

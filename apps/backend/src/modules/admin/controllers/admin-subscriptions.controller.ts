import { Controller, Get, Post, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@belidisini/database';
import { AdminSubscriptionsService } from '../services/admin-subscriptions.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto/subscription.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin - Subscriptions')
@Controller('admin/subscriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
@ApiBearerAuth()
export class AdminSubscriptionsController {
  constructor(private readonly adminSubscriptionsService: AdminSubscriptionsService) {}

  @Get()
  @ApiOperation({ summary: 'List all subscriptions (paginated)' })
  async findAll(@Query('page') page?: string) {
    return this.adminSubscriptionsService.findAll(page ? parseInt(page, 10) : undefined);
  }

  @Post()
  @ApiOperation({ summary: 'Create subscription for a store' })
  async create(@Body() dto: CreateSubscriptionDto) {
    return this.adminSubscriptionsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update subscription (status, endDate)' })
  async update(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
    return this.adminSubscriptionsService.update(id, dto);
  }
}

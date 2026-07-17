import { Controller, Get, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@belidisini/database';
import { AdminStoresService } from '../services/admin-stores.service';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin - Stores')
@Controller('admin/stores')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
@ApiBearerAuth()
export class AdminStoresController {
  constructor(private readonly adminStoresService: AdminStoresService) {}

  @Get()
  @ApiOperation({ summary: 'List all stores (paginated, filterable by isActive)' })
  async findAll(@Query('page') page?: string, @Query('isActive') isActive?: string) {
    return this.adminStoresService.findAll(page ? parseInt(page, 10) : undefined, isActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store detail with products and subscription' })
  async findById(@Param('id') id: string) {
    return this.adminStoresService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update store (suspend/restore, rename)' })
  async update(@Param('id') id: string, @Body() dto: UpdateStoreDto) {
    return this.adminStoresService.update(id, dto);
  }
}

import { Controller, Get, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@belidisini/database';
import { AdminProductsService } from '../services/admin-products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin - Products')
@Controller('admin/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
@ApiBearerAuth()
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List all products (paginated, filterable by store)' })
  async findAll(@Query('page') page?: string, @Query('storeId') storeId?: string) {
    return this.adminProductsService.findAll(page ? parseInt(page, 10) : undefined, storeId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product status' })
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.adminProductsService.update(id, dto);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Products')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('stores/:storeId/products')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a product (store owner only)' })
  async create(
    @Param('storeId') storeId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.create(storeId, userId, dto);
  }

  @Get('stores/:storeId/products')
  @ApiOperation({ summary: 'List active products for a store (public)' })
  async findAll(@Param('storeId') storeId: string, @Query('page') page?: string) {
    return this.productService.findAll(storeId, page ? parseInt(page, 10) : undefined);
  }

  @Get('stores/:storeSlug/products/:productSlug')
  @ApiOperation({ summary: 'Get product by store slug + product slug (public)' })
  async findBySlug(
    @Param('storeSlug') storeSlug: string,
    @Param('productSlug') productSlug: string,
  ) {
    return this.productService.findBySlug(storeSlug, productSlug);
  }

  @Patch('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product (store owner only)' })
  async update(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update(id, userId, dto);
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive product (store owner only)' })
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.productService.remove(id, userId);
  }
}

import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Wishlist')
@Controller('wishlist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'List wishlist items' })
  async findAll(@CurrentUser('id') userId: string) {
    return this.wishlistService.findAll(userId);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add product to wishlist' })
  async add(@CurrentUser('id') userId: string, @Body('productId') productId: string) {
    return this.wishlistService.add(userId, productId);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Remove item from wishlist (hard delete)' })
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.wishlistService.remove(userId, id);
  }
}

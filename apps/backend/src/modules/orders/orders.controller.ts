import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List user orders (paginated)' })
  async findAll(@CurrentUser('id') userId: string, @Query('page') page?: string) {
    return this.ordersService.findAll(userId, page ? parseInt(page, 10) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order detail' })
  async findById(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.ordersService.findById(userId, id);
  }
}

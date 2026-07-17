import { Controller, Get, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@belidisini/database';
import { AdminUsersService } from '../services/admin-users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Admin - Users')
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
@ApiBearerAuth()
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users (paginated, filterable by role)' })
  async findAll(@Query('page') page?: string, @Query('role') role?: string) {
    return this.adminUsersService.findAll(page ? parseInt(page, 10) : undefined, role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user detail' })
  async findById(@Param('id') id: string) {
    return this.adminUsersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user (role, isActive, name, email)' })
  async update(
    @Param('id') id: string,
    @CurrentUser('id') currentUserId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.adminUsersService.update(id, currentUserId, dto);
  }
}

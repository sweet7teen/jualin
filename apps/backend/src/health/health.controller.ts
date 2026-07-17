import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Health check — reports DB and service status' })
  async check() {
    const dbOk = await this.prisma.$queryRaw`SELECT 1 AS ok`
      .then(() => true)
      .catch(() => false);

    return {
      status: dbOk ? 'healthy' : 'degraded',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks: {
        database: dbOk ? 'up' : 'down',
      },
    };
  }
}

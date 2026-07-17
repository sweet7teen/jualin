import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@belidisini/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    super({
      log:
        configService.get<string>('app.nodeEnv') === 'development'
          ? [{ emit: 'event', level: 'query' }]
          : [{ emit: 'stdout', level: 'warn' }],
    });

    if (configService.get<string>('app.nodeEnv') === 'development') {
      this.$on('query' as never, (e: { query: string; duration: number }) => {
        this.logger.debug(`Query (${e.duration}ms): ${e.query}`);
      });
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

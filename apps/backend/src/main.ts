import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { RequestLoggingInterceptor } from './common/interceptors/request-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const nodeEnv = configService.get<string>('app.nodeEnv', 'development');

  if (nodeEnv === 'production') {
    const jwtSecret = configService.get<string>('jwt.secret', '');
    const jwtRefreshSecret = configService.get<string>('jwt.refreshSecret', '');

    if (!jwtSecret || jwtSecret === 'dev-secret-change-me') {
      throw new Error(
        'JWT_SECRET must be set to a secure value in production. ' +
        'Set the JWT_SECRET environment variable and restart the server.',
      );
    }

    if (!jwtRefreshSecret || jwtRefreshSecret === 'dev-refresh-secret-change-me') {
      throw new Error(
        'JWT_REFRESH_SECRET must be set to a secure value in production. ' +
        'Set the JWT_REFRESH_SECRET environment variable and restart the server.',
      );
    }
  }

  const port = configService.get<number>('app.port', 3001);
  const frontendUrl = configService.get<string>('app.frontendUrl', 'http://localhost:3000');
  const apiVersion = configService.get<string>('app.apiVersion', 'v1');

  app.setGlobalPrefix(`api/${apiVersion}`);

  app.enableCors({
    origin: configService.get<string>('cors.origin', frontendUrl),
    credentials: configService.get<boolean>('cors.credentials', true),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Observability
  app.use(new CorrelationIdMiddleware().use);
  app.useGlobalInterceptors(new RequestLoggingInterceptor());

  const swaggerTitle = configService.get<string>('swagger.title', 'Belidisini API');
  const swaggerDescription = configService.get<string>('swagger.description', 'Belidisini SaaS Marketplace API');
  const swaggerVersion = configService.get<string>('swagger.version', '0.1.0');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion(swaggerVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  console.log(`🚀 Application running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}

void bootstrap();

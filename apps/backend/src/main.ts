import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

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

  const swaggerTitle = configService.get<string>('swagger.title', 'Belidisini API');
  const swaggerDescription = configService.get<string>(
    'swagger.description',
    'Belidisini SaaS Marketplace API',
  );
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

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MainBootstrap');
  app.enableCors();
  app.useGlobalPipes(
    // for all incoming requests
    new ValidationPipe({
      transform: true, // automatically transform payloads to DTO instances
      whitelist: true, // strip properties that do not have any decorators in the DTO
      forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are present
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  const url = await app.getUrl();
  logger.log(`Server is listening on: ${url}`);
}

bootstrap();

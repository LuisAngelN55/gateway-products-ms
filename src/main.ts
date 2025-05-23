import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger('Main-Gateway');
  logger.log('Starting Client Gateway...');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.useGlobalFilters( new RpcCustomExceptionFilter())

  await app.listen(envs.port);

  logger.log(`Client Gateway is running on: http://localhost:${envs.port}`);
}
bootstrap();

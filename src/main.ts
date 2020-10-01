import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './shared/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new MyLogger())
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

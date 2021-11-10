import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('API TCC')
    .setDescription('API das rotas do trabalho de TCC')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .setVersion('1.0')
    .build();

  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const PORT = Number(process.env.PORT) || 3002;

  await app.listen(PORT, '0.0.0.0');
  const url = await app.getUrl();

  console.log(`Application started in ${url}`);
  console.log(`Swagger started in ${url}/api`);
}
bootstrap();

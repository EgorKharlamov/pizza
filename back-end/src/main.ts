import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({ origin: ['http://localhost:3000', 'http://localhost', 'http://192.168.0.9', 'http://192.168.20.3'] });

  const options = new DocumentBuilder()
    .setTitle('Pizza')
    .setDescription('Development interface')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT || 2310);
}
bootstrap();

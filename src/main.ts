 import { NestFactory } from '@nestjs/core';
 import { AppModule } from './app.module';
 import { ValidationPipe } from '@nestjs/common';
 import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
 import 'dotenv/config';
 async function bootstrap() {
 const app = await NestFactory.create(AppModule);
   app.useGlobalPipes( 
    new ValidationPipe({
     whitelist: true,
     transform: true,
     }),
   );

  //  ADD THIS BLOCK
  const config = new DocumentBuilder()
    .setTitle('Employee Management API')
    .setDescription('API documentation for Employee & Supervisor system')
    .setVersion('1.0')
    .addBearerAuth() //  for JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
                                                                                          
  SwaggerModule.setup('api-docs', app, document);
  // This decides the URL

  await app.listen(3004);
}

bootstrap();




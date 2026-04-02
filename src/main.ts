 import { NestFactory } from '@nestjs/core';
 import { AppModule } from './app.module';
 import { ValidationPipe } from '@nestjs/common';
 import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
 import 'dotenv/config';
import { HttpExceptionFilter } from './common/entities/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { join } from 'path';
import * as express from 'express';
 async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 app.useGlobalFilters(new HttpExceptionFilter());
 
 app.useGlobalInterceptors(
  new LoggingInterceptor(),
  new ResponseInterceptor(),
 );
 
 app.useGlobalPipes( 
    new ValidationPipe({
     whitelist: true,
     forbidNonWhitelisted:true,
     transform: true,
     
     }),
     
   );
   app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  //    swagger api documentation
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




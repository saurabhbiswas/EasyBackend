// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet'; // Ensure helmet is imported
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Helmet for security
  app.use(helmet());

  // Enable CORS
  app.enableCors({
    //origin: 'http://localhost:3000', 
    origin: 'http://mygablubacket.s3-website-ap-southeast-2.amazonaws.com',
    // Adjust based on your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    
  });

  // Use Global Validation Pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
  console.log(`Backend is running on http://localhost:3001`);
}
bootstrap();

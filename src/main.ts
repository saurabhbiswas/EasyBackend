// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe,Logger } from '@nestjs/common';
import { ConfigService} from '@nestjs/config'; 
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve ConfigService from the application context
  const configService = app.get(ConfigService);

  // Access PORT and FRONTEND_URL from environment variables
  const port = configService.get<number>('PORT', 3001); // Default to 3001 if PORT is not set
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  // Validate that FRONTEND_URL is provided
  if (!frontendUrl) {
    throw new Error('FRONTEND_URL is not defined in the environment variables.');
  }

  // Enable Helmet for security headers
  app.use(helmet());

  // Enable CORS with dynamic origin
  app.enableCors({
    origin: frontendUrl, // Use FRONTEND_URL from environment variables
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically remove properties that are not in the DTO
    forbidNonWhitelisted: true, // Throw an error when extra properties are passed
    transform: true, // Automatically transform payloads to match DTOs
  }));


// Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('API documentation for the Authentication module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // Start the application on the specified port
  await app.listen(port);
  Logger.log(`Backend is running on http://localhost:${port}`);
  Logger.log(`Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();

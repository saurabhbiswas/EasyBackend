// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { LoggerMiddleware } from './common/middleware/logger.middleware';




@Module({
  imports: [
    // Configure ConfigModule
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Dynamically load .env files based on NODE_ENV
      isGlobal: true, // Makes ConfigModule available globally
      validationSchema: Joi.object({
        PORT: Joi.number().default(3001),
        FRONTEND_URL: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().min(8).required(),
        MONGODB_URI: Joi.string().uri().required(),
      }),
    }),

    // Configure MongooseModule using ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Retrieve MONGODB_URI from ConfigService
      }),
      inject: [ConfigService], // Inject ConfigService
    }),

    // Other modules
    AuthModule,

    // Configure ThrottlerModule
    ThrottlerModule.forRoot({
      ttl: 60,    // Time to live in seconds
      limit: 10,  // Maximum number of requests within TTL
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Apply ThrottlerGuard globally
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}



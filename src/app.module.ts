// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://easytarget:t9VD3OSM06stZVST@cluster0.qu6rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // Ensure MongoDB is running
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,    // Time to live in seconds
      limit: 10,  // Maximum number of requests within TTL
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronJobModule } from './cron-job/cron-job.module';
import { WebhookModule } from './webhook/webhook.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cron_job_db'), // MongoDB connection
    CronJobModule, // Import the CronJobModule
    WebhookModule, // Import the WebhookModule
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Time-to-live in seconds
          limit: 10, // Maximum number of requests within TTL
        },
      ],
    }),
  ],
})
export class AppModule {}
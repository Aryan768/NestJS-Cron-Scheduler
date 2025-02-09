// src/cron-job/cron-job.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronJobController } from './cron-job.controller';
import { CronJobService } from './cron-job.service';
import { CronJobSchema } from '../schemas/cron-job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CronJob', schema: CronJobSchema }]), // Register the schema
  ],
  controllers: [CronJobController], // Register the controller
  providers: [CronJobService], // Register the service
})
export class CronJobModule {}
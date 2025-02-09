// src/cron-job/cron-job.scheduler.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CronJobService } from './cron-job.service';

@Injectable()
export class CronJobScheduler {
  constructor(private readonly cronJobService: CronJobService) {}

  @Cron(CronExpression.EVERY_MINUTE) // Adjust the schedule as needed
  async handleCron() {
    const cronJobs = await this.cronJobService.findAll();
    cronJobs.forEach((job) => {
      // Trigger the job's link using an HTTP request
      console.log(`Triggering job: ${job.name}`);
    });
  }
}
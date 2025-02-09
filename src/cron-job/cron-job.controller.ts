import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { CronJob } from '../schemas/cron-job.schema';
import { Throttle, ThrottlerModuleOptions } from '@nestjs/throttler';

@Controller('cron-jobs')
export class CronJobController {
  constructor(private readonly cronJobService: CronJobService) {}

  @Post()
  async create(@Body() cronJob: CronJob): Promise<CronJob> {
    return this.cronJobService.create(cronJob);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } }) // Explicit configuration
  @Get()
  async findAll(): Promise<CronJob[]> {
    return this.cronJobService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() cronJob: CronJob): Promise<CronJob> {
    return this.cronJobService.update(id, cronJob);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CronJob> {
    return this.cronJobService.delete(id);
  }
}

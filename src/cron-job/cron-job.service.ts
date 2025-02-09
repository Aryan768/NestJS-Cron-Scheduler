// src/cron-job/cron-job.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CronJob } from '../schemas/cron-job.schema';

@Injectable()
export class CronJobService {
  constructor(@InjectModel('CronJob') private readonly cronJobModel: Model<CronJob>) {}

  async create(cronJob: CronJob): Promise<CronJob> {
    const newCronJob = new this.cronJobModel(cronJob);
    return newCronJob.save();
  }

  async findAll(): Promise<CronJob[]> {
    return this.cronJobModel.find().exec();
  }

  async update(id: string, cronJob: CronJob): Promise<CronJob> {
    const updatedCronJob = await this.cronJobModel
      .findByIdAndUpdate(id, cronJob, { new: true })
      .exec();
    if (!updatedCronJob) {
      throw new NotFoundException(`CronJob with ID ${id} not found`);
    }
    return updatedCronJob;
  }

  async delete(id: string): Promise<CronJob> {
    const deletedCronJob = await this.cronJobModel.findByIdAndDelete(id).exec();
    if (!deletedCronJob) {
      throw new NotFoundException(`CronJob with ID ${id} not found`);
    }
    return deletedCronJob;
  }
}
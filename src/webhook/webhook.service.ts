
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Webhook } from '../schemas/webhook.schema';

@Injectable()
export class WebhookService {
  constructor(@InjectModel('Webhook') private readonly webhookModel: Model<Webhook>) {}

  // Store webhook data in MongoDB
  async create(webhookData: any, cronJobId: string): Promise<Webhook> {
    const newWebhook = new this.webhookModel({ data: webhookData, cronJobId });
    return newWebhook.save();
  }

  // Retrieve all webhooks for a specific cron job
  async findAllByCronJobId(cronJobId: string): Promise<Webhook[]> {
    return this.webhookModel.find({ cronJobId }).exec();
  }

  // Retrieve all webhooks
  async findAll(): Promise<Webhook[]> {
    return this.webhookModel.find().exec();
  }
}

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Webhook } from '../schemas/webhook.schema';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // Endpoint to receive webhook data
  @Post(':cronJobId')
  async handleWebhook(@Param('cronJobId') cronJobId: string, @Body() data: any): Promise<Webhook> {
    return this.webhookService.create(data, cronJobId);
  }

  // Endpoint to retrieve all webhooks for a specific cron job
  @Get(':cronJobId')
  async findAllByCronJobId(@Param('cronJobId') cronJobId: string): Promise<Webhook[]> {
    return this.webhookService.findAllByCronJobId(cronJobId);
  }

  // Endpoint to retrieve all webhooks
  @Get()
  async findAll(): Promise<Webhook[]> {
    return this.webhookService.findAll();
  }
}
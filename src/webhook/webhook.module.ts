import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookSchema } from '../schemas/webhook.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Webhook', schema: WebhookSchema }]), // Register the schema
  ],
  controllers: [WebhookController], // Register the controller
  providers: [WebhookService], // Register the service
})
export class WebhookModule {}
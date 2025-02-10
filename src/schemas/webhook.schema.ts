// src/schemas/webhook.schema.ts
import { Schema, Document } from 'mongoose';

export const WebhookSchema = new Schema({
  data: { type: Object, required: true }, // The JSON data received from the webhook
  cronJobId: { type: String, required: true }, // ID of the associated cron job
  createdAt: { type: Date, default: Date.now }, // Timestamp of creation
});

export interface Webhook extends Document {
  data: any; // JSON data
  cronJobId: string; // Associated cron job ID
  createdAt: Date; // Creation timestamp
}

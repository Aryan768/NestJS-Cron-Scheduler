// src/schemas/cron-job.schema.ts
import { Schema, Document } from 'mongoose';

export const CronJobSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  apiKey: { type: String, required: true },
  schedule: { type: String, required: true },
  startDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  history: [
    {
      timestamp: { type: Date, default: Date.now },
      response: { type: Object }, // Store the response from the triggered job
    },
  ],
});

export interface CronJob extends Document {
  name: string;
  link: string;
  apiKey: string;
  schedule: string;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
  history: { timestamp: Date; response: any }[];
}
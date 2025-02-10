// src/cron-job/cron-job.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CronJobController } from './cron-job.controller';
import { CronJobService } from './cron-job.service';
import { CronJob } from '../schemas/cron-job.schema';

describe('CronJobController', () => {
  let controller: CronJobController;
  let service: CronJobService;

  const mockCronJob: Partial<CronJob> = {
    _id: '1', // Add _id
    name: 'Test Job',
    link: 'https://example.com',
    apiKey: 'test-key',
    schedule: '0 0 * * *',
    startDate: new Date(),
    createdAt: new Date(), // Add createdAt
    updatedAt: new Date(), // Add updatedAt
    history: [], // Add history
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronJobController],
      providers: [
        {
          provide: CronJobService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockCronJob),
            findAll: jest.fn().mockResolvedValue([mockCronJob]),
            update: jest.fn().mockResolvedValue(mockCronJob),
            delete: jest.fn().mockResolvedValue(mockCronJob),
          },
        },
      ],
    }).compile();

    controller = module.get<CronJobController>(CronJobController);
    service = module.get<CronJobService>(CronJobService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cron job', async () => {
    const result = await controller.create(mockCronJob as CronJob);
    expect(result).toEqual(mockCronJob);
    expect(service.create).toHaveBeenCalledWith(mockCronJob);
  });

  it('should find all cron jobs', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockCronJob]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should update a cron job', async () => {
    const result = await controller.update('1', mockCronJob as CronJob);
    expect(result).toEqual(mockCronJob);
    expect(service.update).toHaveBeenCalledWith('1', mockCronJob);
  });

  it('should delete a cron job', async () => {
    const result = await controller.delete('1');
    expect(result).toEqual(mockCronJob);
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
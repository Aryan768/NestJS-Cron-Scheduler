// src/cron-job/cron-job.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CronJobService } from './cron-job.service';
import { CronJob } from '../schemas/cron-job.schema';

describe('CronJobService', () => {
  let service: CronJobService;
  let model: any;

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
      providers: [
        CronJobService,
        {
          provide: getModelToken('CronJob'),
          useValue: {
            create: jest.fn().mockResolvedValue(mockCronJob),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockCronJob]),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockCronJob),
            }),
            findByIdAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockCronJob),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CronJobService>(CronJobService);
    model = module.get(getModelToken('CronJob'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cron job', async () => {
    const result = await service.create(mockCronJob as CronJob);
    expect(result).toEqual(mockCronJob);
    expect(model.create).toHaveBeenCalledWith(mockCronJob);
  });

  it('should find all cron jobs', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockCronJob]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should update a cron job', async () => {
    const result = await service.update('1', mockCronJob as CronJob);
    expect(result).toEqual(mockCronJob);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', mockCronJob, { new: true });
  });

  it('should delete a cron job', async () => {
    const result = await service.delete('1');
    expect(result).toEqual(mockCronJob);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
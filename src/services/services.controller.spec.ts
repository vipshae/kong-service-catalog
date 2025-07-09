/* eslint-disable @typescript-eslint/no-floating-promises */
import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { NotFoundException } from '@nestjs/common';

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: ServicesService;
  const resultServicesFixture = [
    {
      id: '1',
      name: 'Service 1',
      description: 'Test Service 1',
      versions: ['v1.0.0'],
    },
    {
      id: '2',
      name: 'Service 2',
      description: 'Test Service 2',
      versions: ['v0.0.1'],
    },
  ];
  const resultVersionsFixture = [
    {
      id: '1',
      version: 'v1.0.0',
      description: 'Version 1.0.0 of Service 1',
      serviceId: '1',
    },
    {
      id: '2',
      version: 'v0.0.1',
      description: 'Version 0.0.1 of Service 2',
      serviceId: '2',
    },
  ];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(resultServicesFixture),
            getById: jest.fn().mockImplementation((id: number) => {
              return resultServicesFixture[id - 1];
            }),
            getVersions: jest.fn().mockImplementation((id: number) => {
              return resultVersionsFixture.filter((version) => version.serviceId === String(id));
            }),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<ServicesController>(ServicesController);
    service = moduleRef.get<ServicesService>(ServicesService);
  });

  describe('getAllServices', () => {
    it('should return an array of services', async () => {
      expect(await controller.getAllServices({})).toEqual(resultServicesFixture);
    });
    it('should return an empty array when no services are found', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue([]);
      expect(await controller.getAllServices({})).toEqual([]);
    });
  });

  describe('getServiceById', () => {
    it('should return a service by ID', async () => {
      const serviceId = 1;
      expect(await controller.getServiceById(serviceId)).toEqual(resultServicesFixture[serviceId - 1]);
    });

    it('should throw NotFoundException for non-existent service ID', async () => {
      const serviceId = 9999;
      jest.spyOn(service, 'getById').mockImplementation(() => {
        throw new NotFoundException(`Service with id ${serviceId} not found`);
      });
      await expect(controller.getServiceById(serviceId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getServiceVersions', () => {
    it('should return versions of a service by ID', async () => {
      const serviceId = 1;
      expect(await controller.getServiceVersions(serviceId)).toEqual(
        resultVersionsFixture.filter((version) => version.serviceId === String(serviceId)),
      );
    });

    it('should throw NotFoundException for non-existent service ID', async () => {
      const serviceId = 9999;
      jest.spyOn(service, 'getVersions').mockImplementation(() => {
        throw new NotFoundException(`Service with id ${serviceId} not found`);
      });
      await expect(controller.getServiceVersions(serviceId)).rejects.toThrow(NotFoundException);
    });
  });
});

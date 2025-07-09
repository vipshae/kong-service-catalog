/* eslint-disable @typescript-eslint/no-floating-promises */
import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { ServicesRepository } from './services.repository';
import { describe } from 'node:test';

describe('ServicesService', () => {
  let service: ServicesService;
  let repository: ServicesRepository;
  const mockServices = [
    {
      id: 1,
      name: 'Service 1',
      description: 'Test Service 1',
      versions: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Service 2',
      description: 'Test Service 2',
      versions: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const mockVersions = [
    {
      id: 1,
      description: 'Version 1.0 of Service 1',
      version: '1.0',
      service: mockServices[0],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      description: 'Version 1.1 of Service 1',
      version: '1.1',
      service: mockServices[0],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const mapper = (entity: { id: number | string; [key: string]: any }): any => {
    return { ...entity, id: String(entity.id) };
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: ServicesRepository,
          useValue: {
            findAllServices: jest.fn().mockResolvedValue([]),
            findServiceById: jest.fn().mockResolvedValue(null),
            findAllVersionsForService: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ServicesService>(ServicesService);
    repository = moduleRef.get<ServicesRepository>(ServicesRepository);
  });

  describe('getAll', () => {
    it('should return an empty array when no services are found', async () => {
      const result = await service.getAll();
      expect(result).toEqual([]);
    });

    it('should return a list of services', async () => {
      jest.spyOn(repository, 'findAllServices').mockResolvedValue(mockServices);
      const result = await service.getAll();
      expect(result).toEqual(mockServices.map(mapper));
    });
  });

  describe('getById', () => {
    it('should throw NotFoundException when service is not found', async () => {
      await expect(service.getById(9999)).rejects.toThrow('Service with id 9999 not found');
    });

    it('should return a service by ID', async () => {
      jest.spyOn(repository, 'findServiceById').mockResolvedValue(mockServices[0]);
      const result = await service.getById(1);
      expect(result).toEqual(mapper(mockServices[0]));
    });
  });

  describe('getVersions', () => {
    it('should throw NotFoundException when service is not found', async () => {
      jest.spyOn(repository, 'findAllVersionsForService').mockResolvedValue(null);
      await expect(service.getVersions(9999)).rejects.toThrow('Service with id 9999 not found');
    });

    it('should not throw an error when service is found but has no versions', async () => {
      jest.spyOn(repository, 'findAllVersionsForService').mockResolvedValue(mockServices[0].versions);
      const result = await service.getVersions(1);
      expect(result).toEqual([]);
    });

    it('should return versions of a service by ID', async () => {
      jest.spyOn(repository, 'findAllVersionsForService').mockResolvedValue(mockVersions);
      const result = await service.getVersions(1);
      const mappedVersionRep = mockVersions.map((version) => {
        return {
          id: String(version.id),
          description: version.description,
          version: version.version,
          created_at: version.created_at,
          updated_at: version.updated_at,
          serviceId: String(version.service.id),
        };
      });
      expect(result).toEqual(mappedVersionRep);
    });
  });
});

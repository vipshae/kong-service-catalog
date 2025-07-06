import { Injectable } from '@nestjs/common';
import { Service } from './interfaces/service.interface';
import { ServiceVersion } from './interfaces/serviceVersion.interface';

@Injectable()
export class ServicesService {
  private readonly services: Service[] = [
    {
      id: '1',
      name: 'User Service',
      description: 'Service for managing users',
      versions: [
        {
          id: 'v1',
          version: '1.0.0',
          description: 'Initial version of User Service',
          serviceId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getAll(query: any = {}): Service[] {
    return this.services;
  }

  getById(id: string): Service | undefined {
    return this.services.find((service) => service.id === id);
  }

  getVersions(id: string): ServiceVersion[] {
    const service = this.getById(id);
    return service ? service.versions : [];
  }
}

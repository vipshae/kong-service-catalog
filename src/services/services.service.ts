import { Injectable } from '@nestjs/common';
import { ServicesResponseDTO } from './dto/services.dto';
import { VersionsResponseDTO } from './dto/versions.dto';
import { ServicesQueryDTO } from './dto/services.query.dto';
import { Service } from './interfaces/service.interface';
import { ServiceVersion } from './interfaces/serviceVersion.interface';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ServicesService {
  private readonly sericeVersions: ServiceVersion[] = [
    {
      id: 'v1',
      version: '1.0.0',
      description: 'Initial version of User Service',
      serviceId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private readonly services: Service[] = [
    {
      id: '1',
      name: 'User Service',
      description: 'Service for managing users',
      versions: this.sericeVersions,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private mapServiceToDTO(service: Service): ServicesResponseDTO {
    return {
      id: service.id,
      name: service.name,
      description: service.description,
      versions: service.versions.map((version) => version.version),
      created_at: service.createdAt,
      updated_at: service.updatedAt,
    };
  }

  async getAll(query: ServicesQueryDTO = {}): Promise<ServicesResponseDTO[]> {
    const { limit = 5, page = 1 } = query;
    const offset = (page - 1) * limit;
    const paginatedServices = this.services.slice(offset, offset + limit);
    return paginatedServices.map((service) => this.mapServiceToDTO(service));
  }

  async getById(serviceId: string): Promise<ServicesResponseDTO> {
    const foundService = this.services.find((service) => service.id === serviceId);
    if (!foundService) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }
    return this.mapServiceToDTO(foundService);
  }

  async getVersions(serviceId: string): Promise<VersionsResponseDTO[]> {
    const foundService = this.services.find((service) => service.id === serviceId);
    if (!foundService) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }
    return foundService ? foundService.versions : [];
  }
}

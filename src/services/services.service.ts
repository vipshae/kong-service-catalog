import { Injectable } from '@nestjs/common';
import { ServicesResponseDTO } from './dto/services.dto';
import { VersionsResponseDTO } from './dto/versions.dto';
import { ServicesQueryDTO } from './dto/services.query.dto';
import { Service as ServiceEntity } from './entity/service.entity';
import { ServiceVersion as ServiceVersionEntity } from './entity/service-version.entity';
import { ServicesRepository } from './services.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  private mapServiceToDTO(service: ServiceEntity): ServicesResponseDTO {
    return {
      id: String(service.id),
      name: service.name,
      description: service.description,
      versions: service.versions.map((version) => version.version),
      createdAt: service.created_at,
      updatedAt: service.updated_at,
    };
  }

  private mapServiceVersionToDTO(
    serviceVersion: ServiceVersionEntity,
  ): VersionsResponseDTO {
    return {
      id: String(serviceVersion.id),
      description: serviceVersion.description,
      version: serviceVersion.version,
      serviceId: String(serviceVersion.service.id),
      createdAt: serviceVersion.created_at,
      updatedAt: serviceVersion.updated_at,
    };
  }

  async getAll(query: ServicesQueryDTO = {}): Promise<ServicesResponseDTO[]> {
    const queriedServices =
      await this.servicesRepository.findAllServices(query);
    return queriedServices.map((service) => this.mapServiceToDTO(service));
  }

  async getById(serviceId: number): Promise<ServicesResponseDTO> {
    const foundService =
      await this.servicesRepository.findServiceById(serviceId);
    if (!foundService) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }
    return this.mapServiceToDTO(foundService);
  }

  async getVersions(serviceId: number): Promise<VersionsResponseDTO[]> {
    const foundVersions =
      await this.servicesRepository.findAllVersionsForService(serviceId);
    return foundVersions.map((version) => this.mapServiceVersionToDTO(version));
  }
}

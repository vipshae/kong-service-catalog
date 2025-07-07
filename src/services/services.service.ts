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

  // Helper method to map ServiceEntity to ServicesResponseDTO
  private static mapServiceToDTO(service: ServiceEntity): ServicesResponseDTO {
    return {
      id: String(service.id),
      name: service.name,
      description: service.description,
      versions: service.versions.map((version) => version.version),
      created_at: service.created_at,
      updated_at: service.updated_at,
    };
  }

  // Helper method to map ServiceVersionEntity to VersionsResponseDTO
  private static mapServiceVersionToDTO(
    serviceVersion: ServiceVersionEntity,
  ): VersionsResponseDTO {
    return {
      id: String(serviceVersion.id),
      description: serviceVersion.description,
      version: serviceVersion.version,
      serviceId: String(serviceVersion.service.id),
      created_at: serviceVersion.created_at,
      updated_at: serviceVersion.updated_at,
    };
  }

  async getAll(query: ServicesQueryDTO = {}): Promise<ServicesResponseDTO[]> {
    const dbQuery = {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      filters: {
        name: query.name,
        description: query.description,
      },
    };
    const queriedServices =
      await this.servicesRepository.findAllServices(dbQuery);
    return queriedServices.map((service) =>
      ServicesService.mapServiceToDTO(service),
    );
  }

  async getById(serviceId: number): Promise<ServicesResponseDTO> {
    const foundService =
      await this.servicesRepository.findServiceById(serviceId);
    if (!foundService) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }
    return ServicesService.mapServiceToDTO(foundService);
  }

  async getVersions(serviceId: number): Promise<VersionsResponseDTO[]> {
    const foundVersions =
      await this.servicesRepository.findAllVersionsForService(serviceId);
    if (!foundVersions) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }
    return foundVersions.map((version) =>
      ServicesService.mapServiceVersionToDTO(version),
    );
  }
}

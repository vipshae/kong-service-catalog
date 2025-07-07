import { Injectable } from '@nestjs/common';
import { Service as ServiceEntity } from './entity/service.entity';
import { ServiceVersion as ServiceVersionEntity } from './entity/service-version.entity';
import { DataSource, ILike, Repository, In } from 'typeorm';

@Injectable()
export class ServicesRepository {
  private serviceRepository: Repository<ServiceEntity>;
  private serviceVersionRepository: Repository<ServiceVersionEntity>;

  constructor(private dataSource: DataSource) {
    this.serviceRepository = this.dataSource.getRepository(ServiceEntity);
    this.serviceVersionRepository =
      this.dataSource.getRepository(ServiceVersionEntity);
  }

  private static buildWhere(filters: { name?: string; description?: string }) {
    const where: Record<string, any> = {};
    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }
    if (filters.description) {
      where.description = ILike(`%${filters.description}%`);
    }
    return where;
  }

  async findAllServices(options: {
    page?: number;
    limit?: number;
    sortBy?: 'name' | 'created_at' | 'updated_at';
    sortOrder?: 'ASC' | 'DESC';
    filters?: {
      name?: string;
      description?: string;
    };
  }): Promise<ServiceEntity[]> {
    const {
      page = 1,
      limit = 5,
      sortBy = 'name',
      sortOrder = 'ASC',
      filters = {},
    } = options;
    const whereClause = ServicesRepository.buildWhere(filters);
    const [services, total] = await this.serviceRepository.findAndCount({
      where: whereClause,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });
    if (total === 0) return [];
    const serviceIds = services.map((s) => s.id);
    const servicesWithVersions = await this.serviceRepository.find({
      where: { id: In(serviceIds) },
      relations: ['versions'],
      order: { [sortBy]: sortOrder },
    });
    return serviceIds.map(
      (id) => servicesWithVersions.find((s) => s.id === id)!,
    );
  }

  async findServiceById(id: number): Promise<ServiceEntity | null> {
    return this.serviceRepository.findOne({
      where: { id },
      relations: ['versions'],
    });
  }

  async findAllVersionsForService(
    serviceId: number,
  ): Promise<ServiceVersionEntity[]> {
    return this.serviceVersionRepository.find({
      where: { service: { id: serviceId } },
      order: { version: 'ASC' },
      relations: ['service'],
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Service as ServiceEntity } from './entity/service.entity';
import { ServiceVersion as ServiceVersionEntity } from './entity/service-version.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ServicesRepository {
  private serviceRepository: Repository<ServiceEntity>;
  private serviceVersionRepository: Repository<ServiceVersionEntity>;

  constructor(private dataSource: DataSource) {
    this.serviceRepository = this.dataSource.getRepository(ServiceEntity);
    this.serviceVersionRepository =
      this.dataSource.getRepository(ServiceVersionEntity);
  }

  async findAllServices(queryOptions: {
    page?: number;
    pageSize?: number;
    filterBy?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }): Promise<ServiceEntity[]> {
    const {
      limit = 5,
      page = 1,
      filterBy = {},
      sortBy = 'name',
      sortOrder = 'ASC',
    } = queryOptions;
    return this.serviceRepository.find({
      relations: ['versions'],
    });
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
    });
  }
}

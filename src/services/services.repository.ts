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

  // Helper method to build the WHERE clause for filtering services
  // supports filtering for service name and description.
  // It uses ILike for case-insensitive matching.
  // If a filter is not provided, it will not be included in the WHERE clause.
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

  // Finds all services with pagination, sorting, and filtering options.
  // - `page`: The page number for pagination (default is 1).
  // - `limit`: The number of services per page (default is 5).
  // - `sortBy`: The field to sort by (default is 'name').
  // - `sortOrder`: The order of sorting, either 'ASC' or 'DESC' (default is 'ASC').
  // - `filters`: An object containing optional filters for name and description.
  // Returns an array of ServiceEntity objects.
  // If no services are found, it returns an empty array.
  // It also fetches the versions for each service and includes them in the result.
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

    // find services matching the where clause with pagination and sorting.
    const [services, total] = await this.serviceRepository.findAndCount({
      where: whereClause,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });
    // if matching services are not found, return an empty array.
    if (total === 0) return [];
    const serviceIds = services.map((s) => s.id);
    // Fetch the versions for each service and include them in the result.
    const servicesWithVersions = await this.serviceRepository.find({
      where: { id: In(serviceIds) },
      relations: ['versions'],
      order: { [sortBy]: sortOrder },
    });
    // return the services with their versions in the same order as the paginated serviceIds.
    return serviceIds.map(
      (id) => servicesWithVersions.find((s) => s.id === id)!,
    );
  }

  // Finds a service by its ID, including its versions.
  // - `id`: The ID of the service to find.
  // Returns the ServiceEntity if found, or null if not found.
  // It also fetches the versions for the service and includes them in the result.
  // If the service is not found, it returns null.
  async findServiceById(id: number): Promise<ServiceEntity | null> {
    return this.serviceRepository.findOne({
      where: { id },
      relations: ['versions'],
    });
  }

  // Finds all versions for a given service ID.
  // - `serviceId`: The ID of the service for which to find versions.
  // Returns an array of ServiceVersionEntity objects, ordered by version in ascending order.
  // If no versions are found, it returns an empty array.
  async findAllVersionsForService(
    serviceId: number,
  ): Promise<ServiceVersionEntity[] | null> {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) {
      return null;
    }
    return this.serviceVersionRepository.find({
      where: { service: { id: serviceId } },
      order: { version: 'ASC' },
      relations: ['service'],
    });
  }
}

import { Controller, Query, Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesQuery } from './dto/services.query.dto';
import { ServicesResponseDto } from './dto/services.dto';
import { VersionsResponseDto } from './dto/versions.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getAllServices(
    @Query() query: ServicesQuery,
  ): Promise<ServicesResponseDto[]> {
    return this.servicesService.getAll(query);
  }

  @Get(':id')
  getServiceById(@Param('id') id: string): Promise<ServicesResponseDto> {
    return this.servicesService.getById(id);
  }

  @Get(':id/versions')
  getServiceVersions(@Param('id') id: string): Promise<VersionsResponseDto[]> {
    return this.servicesService.getVersions(id);
  }
}

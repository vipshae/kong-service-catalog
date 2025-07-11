import { Controller, Query, Param } from '@nestjs/common';
import { Get, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesQueryDTO } from './dto/services.query.dto';
import { ServicesResponseDTO } from './dto/services.dto';
import { VersionsResponseDTO } from './dto/versions.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllServices(@Query() serviceQueryDTO: ServicesQueryDTO): Promise<ServicesResponseDTO[]> {
    return this.servicesService.getAll(serviceQueryDTO);
  }

  @Get(':id')
  async getServiceById(@Param('id', ParseIntPipe) id: number): Promise<ServicesResponseDTO> {
    return this.servicesService.getById(id);
  }

  @Get(':id/versions')
  async getServiceVersions(@Param('id', ParseIntPipe) id: number): Promise<VersionsResponseDTO[]> {
    return this.servicesService.getVersions(id);
  }
}

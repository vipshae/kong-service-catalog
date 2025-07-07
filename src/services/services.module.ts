import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entity/service.entity';
import { ServiceVersion } from './entity/service-version.entity';
import { ServicesRepository } from './services.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceVersion])],
  providers: [ServicesService, ServicesRepository],
  controllers: [ServicesController],
})
export class ServicesModule {}

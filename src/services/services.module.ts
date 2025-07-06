import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}

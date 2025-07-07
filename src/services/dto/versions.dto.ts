/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DefaultResponseDTO } from './default.dto';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VersionsResponseDTO extends DefaultResponseDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

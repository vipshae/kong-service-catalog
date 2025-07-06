/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsOptional } from 'class-validator';

export class DefaultResponseDTO {
  @IsString()
  @IsOptional()
  message?: string;

  @IsOptional()
  data?: any;
}

/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsOptional } from 'class-validator';

export class DefaultResponseDto {
  @IsString()
  @IsOptional()
  message?: string;

  @IsOptional()
  data?: any;
}

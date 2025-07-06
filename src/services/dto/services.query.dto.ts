/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

export class ServicesQueryDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Max(100)
  @Min(1)
  limit?: number = 5;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  filterBy?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sortBy?: string = 'id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';
}

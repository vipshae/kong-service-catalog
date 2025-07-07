import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

import { Type, Transform } from 'class-transformer';

export class ServicesQueryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 5;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['name', 'created_at', 'updated_at'])
  @IsNotEmpty()
  sortBy?: 'name' | 'created_at' | 'updated_at' = 'name';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  @Transform(({ value }) => value?.toUpperCase())
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}

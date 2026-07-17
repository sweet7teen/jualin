import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from '@belidisini/database';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'INACTIVE' })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;
}

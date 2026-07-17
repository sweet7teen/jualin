import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiPropertyOptional({ example: 'Leave at the front desk' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  notes?: string;
}

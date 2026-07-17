import { IsString, IsInt, IsEnum, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubscriptionStatus } from '@belidisini/database';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 'clx...' })
  @IsString()
  storeId: string;

  @ApiProperty({ example: '30-days' })
  @IsString()
  plan: string;

  @ApiProperty({ example: 25000 })
  @IsInt()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: '2026-08-16T00:00:00Z' })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class UpdateSubscriptionDto {
  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsEnum(SubscriptionStatus)
  @IsOptional()
  status?: SubscriptionStatus;

  @ApiPropertyOptional({ example: '2026-08-16T00:00:00Z' })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}

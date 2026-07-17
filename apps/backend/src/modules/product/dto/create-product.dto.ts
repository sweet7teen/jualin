import { IsString, IsInt, IsOptional, IsArray, Min, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Blue Widget' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'blue-widget' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  slug: string;

  @ApiPropertyOptional({ example: 'A high-quality blue widget.' })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ example: 25000 })
  @IsInt()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 10 })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({ example: ['https://cdn.example.com/image1.jpg'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}

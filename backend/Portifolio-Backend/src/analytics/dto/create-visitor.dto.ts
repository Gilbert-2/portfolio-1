// src/analytics/dto/create-visitor.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateVisitorDto {
  @ApiProperty({ example: '123.45.67.89', required: false })
  @IsOptional()
  @IsIP()
  ip?: string;

  @ApiProperty({ example: 'Mozilla/5.0...', required: false })
  @IsOptional()
  userAgent?: string;

  @ApiProperty({ example: 'https://google.com', required: false })
  @IsOptional()
  @IsUrl()
  referrer?: string;

  @ApiProperty({ example: '/projects' })
  @IsNotEmpty()
  path: string;

  @ApiProperty({ example: 'US', required: false })
  @IsOptional()
  country?: string;

  @ApiProperty({ example: 'Chrome', required: false })
  @IsOptional()
  browser?: string;

  @ApiProperty({ example: 'Windows', required: false })
  @IsOptional()
  operatingSystem?: string;

  @ApiProperty({ example: 'Desktop', required: false })
  @IsOptional()
  deviceType?: string;
}
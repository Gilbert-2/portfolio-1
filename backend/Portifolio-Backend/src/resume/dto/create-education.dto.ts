// src/resume/dto/create-education.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ example: 'University of Rwanda' })
  @IsNotEmpty()
  @IsString()
  institution: string;

  @ApiProperty({ example: 'Bachelor of Computer Engineering' })
  @IsNotEmpty()
  @IsString()
  degree: string;

  @ApiProperty({ example: 'Computer Engineering' })
  @IsNotEmpty()
  @IsString()
  fieldOfStudy: string;

  @ApiProperty({ example: '2021-01-01' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'Honours', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

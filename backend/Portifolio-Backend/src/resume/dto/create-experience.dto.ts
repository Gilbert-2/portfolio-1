// src/resume/dto/create-experience.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ example: 'NEXGEN ESSENTIAL LTD' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ example: 'Frontend Developer Intern' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ example: 'Kigali, Rwanda', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '2024-09-01' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-02-01', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'Developed a scalable property management system...' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: ['Next.js', 'JavaScript', 'Ant Design'], required: false })
  @IsOptional()
  @IsArray()
  technologies?: string[];
}
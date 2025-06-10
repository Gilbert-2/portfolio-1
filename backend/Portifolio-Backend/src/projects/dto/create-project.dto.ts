// CreateProjectDto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProjectDto {
  @ApiProperty({ example: 'Portfolio Website' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A personal portfolio website built with NestJS and React' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://example.com/project', required: false })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ example: 'https://github.com/username/repo', required: false })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Project image file',
    required: false
  })
  @IsOptional()
  image?: any;

  @ApiProperty({ 
    example: ['React', 'TypeScript', 'NestJS'], 
    required: false,
    description: 'Technologies used in project (can be comma-separated string or array)'
  })
  @IsOptional()
  @Transform(({ value }) => {
    // Handle both array and comma-separated string
    if (typeof value === 'string') {
      return value ? value.split(',').map(tech => tech.trim()) : [];
    }
    return value;
  })
  @IsArray()
  technologies?: string[];

  @ApiProperty({ 
    example: true, 
    required: false,
    description: 'Whether project is featured (true/false or "true"/"false")'
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    if (typeof value === 'string') {
      return value === 'true' || value === '1';
    }
    return Boolean(value);
  })
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ example: '2023-01-01', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2023-03-01', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
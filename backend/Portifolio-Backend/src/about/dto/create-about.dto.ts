import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateAboutDto {
  @ApiProperty({ example: 'Gilbert Mugabe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'Full Stack Developer' })
  @IsString()
  @IsNotEmpty()
  headline: string;

  @ApiProperty({ example: 'Professional summary paragraph' })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty({ example: 'Detailed biography paragraph', required: false })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiProperty({ example: ['MongoDB', 'PostgreSQL'], required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  databases?: string[];

  @ApiProperty({ example: ['TypeScript', 'JavaScript'], required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiProperty({ example: ['NestJS', 'Next.js'], required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  frameworks?: string[];

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  yearsExperience?: number;
}

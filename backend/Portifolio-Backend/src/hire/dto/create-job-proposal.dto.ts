// src/hire/dto/create-job-proposal.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateJobProposalDto {
  @ApiProperty({ example: 'Acme Inc.' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ example: 'john.doe@acme.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Senior Full Stack Developer' })
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @ApiProperty({ example: 'We need a developer for our new project...' })
  @IsNotEmpty()
  @MinLength(10)
  @IsString()
  description: string;

  @ApiProperty({ example: 'Full-time' })
  @IsNotEmpty()
  @IsString()
  jobType: string;

  @ApiProperty({ example: 'Remote', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '70000-90000 USD', required: false })
  @IsOptional()
  @IsString()
  salaryRange?: string;
}

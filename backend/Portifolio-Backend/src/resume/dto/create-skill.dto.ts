// src/resume/dto/create-skill.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'Backend Technologies' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ example: 'Express.js & TypeScript' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 90, description: 'Proficiency level (0-100)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  level: number;

  @ApiProperty({ example: 1, description: 'Display order' })
  @IsOptional()
  @IsNumber()
  order?: number;
}

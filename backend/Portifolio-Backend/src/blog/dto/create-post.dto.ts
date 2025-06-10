// src/blog/dto/create-post.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsArray, IsBoolean, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Introduction to NestJS' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'nestjs-introduction' })
  @IsNotEmpty()
  @IsString()
  slug: string;
  
  @ApiProperty({ example: 'NestJS is a framework...', required: false })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ example: '# Introduction\n\nNestJS is...' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsUrl()
  featuredImage?: string;

  @ApiProperty({ example: ['NestJS', 'TypeScript'], required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
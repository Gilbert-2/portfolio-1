// src/contact/dto/create-contact.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Job Opportunity' })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'I would like to discuss a job opportunity...' })
  @IsNotEmpty()
  @MinLength(10)
  message: string;
}
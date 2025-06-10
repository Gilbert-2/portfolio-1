// src/contact/dto/update-contact.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateContactDto {
  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  replied?: boolean;
}

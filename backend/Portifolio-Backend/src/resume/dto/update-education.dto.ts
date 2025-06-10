// src/resume/dto/update-education.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateEducationDto } from './create-education.dto';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}
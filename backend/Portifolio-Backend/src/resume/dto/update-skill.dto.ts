// src/resume/dto/update-skill.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
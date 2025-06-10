// src/resume/entities/skill.entity.ts

import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('skills')
export class Skill extends BaseEntity {
  @ApiProperty({ example: 'Backend Technologies', description: 'Skill category' })
  @Column()
  category: string;

  @ApiProperty({ example: 'Express.js & TypeScript', description: 'Skill name' })
  @Column()
  name: string;

  @ApiProperty({ example: 90, description: 'Proficiency level (0-100)' })
  @Column({ default: 80 })
  level: number;

  @ApiProperty({ example: 1, description: 'Display order' })
  @Column({ default: 1 })
  order: number;
}
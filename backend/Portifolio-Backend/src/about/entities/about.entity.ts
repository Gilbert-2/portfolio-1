import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('about')
export class About extends BaseEntity {
  @ApiProperty({ example: 'Gilbert Mugabe', description: 'Profile name' })
  @Column({ name: 'full_name' })
  fullName: string;

  @ApiProperty({ example: 'Full Stack Developer', description: 'Profile headline' })
  @Column()
  headline: string;

  @ApiProperty({ example: 'Professional summary paragraph', description: 'About summary text' })
  @Column({ type: 'text' })
  summary: string;

  @ApiProperty({ example: 'Detailed biography paragraph', description: 'About biography text' })
  @Column({ type: 'text', nullable: true })
  biography: string | null;

  @ApiProperty({ example: ['MongoDB', 'PostgreSQL'], description: 'Database skills' })
  @Column({ type: 'simple-array', nullable: true, default: '' })
  databases: string[];

  @ApiProperty({ example: ['TypeScript', 'JavaScript'], description: 'Programming languages' })
  @Column({ type: 'simple-array', nullable: true, default: '' })
  languages: string[];

  @ApiProperty({ example: ['NestJS', 'Next.js'], description: 'Frameworks and libraries' })
  @Column({ type: 'simple-array', nullable: true, default: '' })
  frameworks: string[];

  @ApiProperty({ example: 2, description: 'Years of experience' })
  @Column({ name: 'years_experience', type: 'int', default: 1 })
  yearsExperience: number;
}

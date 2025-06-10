import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('experience')
export class Experience extends BaseEntity {
  @ApiProperty({ example: 'NEXGEN ESSENTIAL LTD', description: 'Company name' })
  @Column()
  company: string;

  @ApiProperty({ example: 'Frontend Developer Intern', description: 'Position' })
  @Column()
  position: string;

  @ApiProperty({ example: 'Kigali, Rwanda', description: 'Location' })
  @Column({ nullable: true, type: 'varchar' })
  location: string | null;

  @ApiProperty({ example: '2024-09-01', description: 'Start date' })
  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @ApiProperty({ example: '2025-02-01', description: 'End date' })
  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @ApiProperty({ example: 'Developed a scalable property management system...', description: 'Job description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: ['Next.js', 'JavaScript', 'Ant Design'], description: 'Technologies used' })
  @Column({ type: 'simple-array', nullable: true, default: '' })
  technologies: string[] | null;
}
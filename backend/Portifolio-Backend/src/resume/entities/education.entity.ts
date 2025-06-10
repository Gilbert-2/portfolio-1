import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('education')
export class Education extends BaseEntity {
  @ApiProperty({ example: 'University of Rwanda', description: 'Institution name' })
  @Column()
  institution: string;

  @ApiProperty({ example: 'Bachelor of Computer Engineering', description: 'Degree' })
  @Column()
  degree: string;

  @ApiProperty({ example: 'Computer Engineering', description: 'Field of study' })
  @Column({ name: 'field_of_study' })
  fieldOfStudy: string;

  @ApiProperty({ example: '2021-01-01', description: 'Start date' })
  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @ApiProperty({ example: '2025-01-01', description: 'End date' })
  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @ApiProperty({ example: 'Honours', description: 'Additional info' })
  @Column({ nullable: true, type: 'text' })
  description: string | null;
}
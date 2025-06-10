import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('projects')
export class Project extends BaseEntity {
  @ApiProperty({ example: 'Portfolio Website', description: 'Project title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'A personal portfolio website built with NestJS and React', description: 'Project description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'https://example.com/project', description: 'Project URL' })
  @Column({ nullable: true })
  url: string;

  @ApiProperty({ example: 'https://github.com/username/repo', description: 'GitHub repository URL' })
  @Column({ name: 'github_url', nullable: true })
  githubUrl: string;

  @ApiProperty({ example: 'projects/image-1234567890.jpg', description: 'Project image path' })
  @Column({ name: 'image_path', nullable: true })
  imagePath: string;

  @ApiProperty({ example: ['React', 'TypeScript', 'NestJS'], description: 'Project technologies' })
  @Column({ type: 'simple-array', default: '' })
  technologies: string[];

  @ApiProperty({ example: true, description: 'Is the project featured?' })
  @Column({ default: false })
  featured: boolean;

  @ApiProperty({ example: '2023-01-01', description: 'Project start date' })
  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @ApiProperty({ example: '2023-03-01', description: 'Project end date' })
  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;
}
// src/hire/entities/job-proposal.entity.ts

import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('job_proposals')
export class JobProposal extends BaseEntity {
  @ApiProperty({ example: 'Acme Inc.', description: 'Company name' })
  @Column()
  company: string;

  @ApiProperty({ example: 'john.doe@acme.com', description: 'Contact email' })
  @Column()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Contact phone' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'Senior Full Stack Developer', description: 'Job title' })
  @Column({ name: 'job_title' })
  jobTitle: string;

  @ApiProperty({ example: 'We need a developer for our new project...', description: 'Job description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'Full-time', description: 'Job type' })
  @Column({ name: 'job_type' })
  jobType: string;

  @ApiProperty({ example: 'Remote', description: 'Job location' })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ example: '70000-90000 USD', description: 'Salary range' })
  @Column({ name: 'salary_range', nullable: true })
  salaryRange: string;

  @ApiProperty({ example: 'new', description: 'Proposal status' })
  @Column({ default: 'new' })
  status: string;

  @ApiProperty({ example: 'First interview scheduled for...', description: 'Notes' })
  @Column({ type: 'text', nullable: true })
  notes: string;
}

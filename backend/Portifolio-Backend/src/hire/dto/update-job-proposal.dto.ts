// src/hire/dto/update-job-proposal.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateJobProposalDto } from './create-job-proposal.dto';

export class UpdateJobProposalDto extends PartialType(CreateJobProposalDto) {
  @ApiProperty({ example: 'accepted', required: false, enum: ['new', 'reviewing', 'accepted', 'rejected'] })
  @IsOptional()
  @IsString()
  @IsIn(['new', 'reviewing', 'accepted', 'rejected'])
  status?: string;

  @ApiProperty({ example: 'First interview scheduled for...', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

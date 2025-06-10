// src/hire/hire.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { HireService } from './hire.service';
import { CreateJobProposalDto } from './dto/create-job-proposal.dto';
import { UpdateJobProposalDto } from './dto/update-job-proposal.dto';
import { JobProposal } from './entities/job-proposal.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Hiring-Management')
@Controller('hire')
export class HireController {
  constructor(private readonly hireService: HireService) {}

  @Post('proposals')
  @ApiOperation({ summary: 'Submit a job proposal' })
  @ApiResponse({ status: 201, description: 'The job proposal has been created successfully.', type: JobProposal })
  create(@Body() createJobProposalDto: CreateJobProposalDto): Promise<JobProposal> {
    return this.hireService.create(createJobProposalDto);
  }

  @Get('proposals')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all job proposals' })
  @ApiQuery({ name: 'status', required: false })
  @ApiResponse({ status: 200, description: 'Return all job proposals.', type: [JobProposal] })
  findAll(@Query('status') status?: string): Promise<JobProposal[]> {
    if (status) {
      return this.hireService.findByStatus(status);
    }
    return this.hireService.findAll();
  }

  @Get('proposals/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a job proposal by id' })
  @ApiResponse({ status: 200, description: 'Return the found job proposal.', type: JobProposal })
  findOne(@Param('id') id: string): Promise<JobProposal> {
    return this.hireService.findOne(+id);
  }

  @Patch('proposals/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a job proposal' })
  @ApiResponse({ status: 200, description: 'The job proposal has been updated successfully.', type: JobProposal })
  update(@Param('id') id: string, @Body() updateJobProposalDto: UpdateJobProposalDto): Promise<JobProposal> {
    return this.hireService.update(+id, updateJobProposalDto);
  }

  @Delete('proposals/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a job proposal' })
  @ApiResponse({ status: 200, description: 'The job proposal has been deleted successfully.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.hireService.remove(+id);
  }
}
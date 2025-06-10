// src/resume/controllers/education.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EducationService } from '../services/education.service';
import { CreateEducationDto } from '../dto/create-education.dto';
import { UpdateEducationDto } from '../dto/update-education.dto';
import { Education } from '../entities/education.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Education-Management')
@Controller('resume/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new education entry' })
  @ApiResponse({ status: 201, description: 'The education entry has been created successfully.', type: Education })
  create(@Body() createEducationDto: CreateEducationDto): Promise<Education> {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all education entries' })
  @ApiResponse({ status: 200, description: 'Return all education entries.', type: [Education] })
  findAll(): Promise<Education[]> {
    return this.educationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an education entry by id' })
  @ApiResponse({ status: 200, description: 'Return the found education entry.', type: Education })
  findOne(@Param('id') id: string): Promise<Education> {
    return this.educationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an education entry' })
  @ApiResponse({ status: 200, description: 'The education entry has been updated successfully.', type: Education })
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto): Promise<Education> {
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an education entry' })
  @ApiResponse({ status: 200, description: 'The education entry has been deleted successfully.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.educationService.remove(+id);
  }
}
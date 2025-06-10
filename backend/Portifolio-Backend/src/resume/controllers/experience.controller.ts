// src/resume/controllers/experience.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ExperienceService } from '../services/experience.service';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { UpdateExperienceDto } from '../dto/update-experience.dto';
import { Experience } from '../entities/experience.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Experience-Management')
@Controller('resume/experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new experience entry' })
  @ApiResponse({ status: 201, description: 'The experience entry has been created successfully.', type: Experience })
  create(@Body() createExperienceDto: CreateExperienceDto): Promise<Experience> {
    return this.experienceService.create(createExperienceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experience entries' })
  @ApiResponse({ status: 200, description: 'Return all experience entries.', type: [Experience] })
  findAll(): Promise<Experience[]> {
    return this.experienceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an experience entry by id' })
  @ApiResponse({ status: 200, description: 'Return the found experience entry.', type: Experience })
  findOne(@Param('id') id: string): Promise<Experience> {
    return this.experienceService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an experience entry' })
  @ApiResponse({ status: 200, description: 'The experience entry has been updated successfully.', type: Experience })
  update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an experience entry' })
  @ApiResponse({ status: 200, description: 'The experience entry has been deleted successfully.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.experienceService.remove(+id);
  }
}

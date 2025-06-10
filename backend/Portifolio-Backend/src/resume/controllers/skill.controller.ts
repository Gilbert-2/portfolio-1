// src/resume/controllers/skill.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SkillService } from '../services/skill.service';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { UpdateSkillDto } from '../dto/update-skill.dto';
import { Skill } from '../entities/skill.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Skills-Management')
@Controller('resume/skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new skill entry' })
  @ApiResponse({ status: 201, description: 'The skill entry has been created successfully.', type: Skill })
  create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all skill entries' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter skills by category' })
  @ApiResponse({ status: 200, description: 'Return all skill entries.', type: [Skill] })
  findAll(@Query('category') category?: string): Promise<Skill[]> {
    if (category) {
      return this.skillService.findByCategory(category);
    }
    return this.skillService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a skill entry by id' })
  @ApiResponse({ status: 200, description: 'Return the found skill entry.', type: Skill })
  findOne(@Param('id') id: string): Promise<Skill> {
    return this.skillService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a skill entry' })
  @ApiResponse({ status: 200, description: 'The skill entry has been updated successfully.', type: Skill })
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto): Promise<Skill> {
    return this.skillService.update(+id, updateSkillDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a skill entry' })
  @ApiResponse({ status: 200, description: 'The skill entry has been deleted successfully.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.skillService.remove(+id);
  }
}

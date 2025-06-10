// src/resume/services/experience.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '../entities/experience.entity';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { UpdateExperienceDto } from '../dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const experience = this.experienceRepository.create({
      ...createExperienceDto,
      startDate: new Date(createExperienceDto.startDate),
      endDate: createExperienceDto.endDate ? new Date(createExperienceDto.endDate) : null,
    });
    return this.experienceRepository.save(experience);
  }

  async findAll(): Promise<Experience[]> {
    return this.experienceRepository.find({
      order: {
        startDate: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Experience> {
    const experience = await this.experienceRepository.findOneBy({ id });
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return experience;
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
    const experience = await this.findOne(id);
    
    const updatedExperience = {
      ...experience,
      ...updateExperienceDto,
      startDate: updateExperienceDto.startDate ? new Date(updateExperienceDto.startDate) : experience.startDate,
      endDate: updateExperienceDto.endDate ? new Date(updateExperienceDto.endDate) : experience.endDate,
    };
    
    return this.experienceRepository.save(updatedExperience);
  }

  async remove(id: number): Promise<void> {
    const result = await this.experienceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
  }
}
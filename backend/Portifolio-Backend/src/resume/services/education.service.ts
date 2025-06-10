import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from '../entities/education.entity';
import { CreateEducationDto } from '../dto/create-education.dto';
import { UpdateEducationDto } from '../dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    // Create a new entity instance first
    const education = new Education();
    
    // Assign properties manually
    education.institution = createEducationDto.institution;
    education.degree = createEducationDto.degree;
    education.fieldOfStudy = createEducationDto.fieldOfStudy;
    education.startDate = new Date(createEducationDto.startDate);
    education.endDate = createEducationDto.endDate ? new Date(createEducationDto.endDate) : null;
    education.description = createEducationDto.description || null;
    
    // Save the entity
    return this.educationRepository.save(education);
  }

  async findAll(): Promise<Education[]> {
    return this.educationRepository.find({
      order: {
        startDate: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Education> {
    const education = await this.educationRepository.findOneBy({ id });
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    return education;
  }

  async update(id: number, updateEducationDto: UpdateEducationDto): Promise<Education> {
    const education = await this.findOne(id);
    
    // Update properties if they exist in the DTO
    if (updateEducationDto.institution !== undefined) {
      education.institution = updateEducationDto.institution;
    }
    if (updateEducationDto.degree !== undefined) {
      education.degree = updateEducationDto.degree;
    }
    if (updateEducationDto.fieldOfStudy !== undefined) {
      education.fieldOfStudy = updateEducationDto.fieldOfStudy;
    }
    if (updateEducationDto.startDate !== undefined) {
      education.startDate = new Date(updateEducationDto.startDate);
    }
    if (updateEducationDto.endDate !== undefined) {
      education.endDate = updateEducationDto.endDate ? new Date(updateEducationDto.endDate) : null;
    }
    if (updateEducationDto.description !== undefined) {
      education.description = updateEducationDto.description || null;
    }
    
    return this.educationRepository.save(education);
  }

  async remove(id: number): Promise<void> {
    const result = await this.educationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
  }
}
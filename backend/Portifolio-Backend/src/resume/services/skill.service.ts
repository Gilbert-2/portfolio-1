// src/resume/services/skill.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../entities/skill.entity';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { UpdateSkillDto } from '../dto/update-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(createSkillDto);
    return this.skillRepository.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find({
      order: {
        category: 'ASC',
        order: 'ASC',
        name: 'ASC',
      },
    });
  }

  async findByCategory(category: string): Promise<Skill[]> {
    return this.skillRepository.find({
      where: { category },
      order: {
        order: 'ASC',
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    const updatedSkill = Object.assign(skill, updateSkillDto);
    return this.skillRepository.save(updatedSkill);
  }

  async remove(id: number): Promise<void> {
    const result = await this.skillRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
  }
}

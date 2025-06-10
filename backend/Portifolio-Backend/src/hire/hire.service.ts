// src/hire/hire.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobProposal } from './entities/job-proposal.entity';
import { CreateJobProposalDto } from './dto/create-job-proposal.dto';
import { UpdateJobProposalDto } from './dto/update-job-proposal.dto';

@Injectable()
export class HireService {
  constructor(
    @InjectRepository(JobProposal)
    private readonly jobProposalRepository: Repository<JobProposal>,
  ) {}

  async create(createJobProposalDto: CreateJobProposalDto): Promise<JobProposal> {
    const proposal = this.jobProposalRepository.create(createJobProposalDto);
    return this.jobProposalRepository.save(proposal);
  }

  async findAll(): Promise<JobProposal[]> {
    return this.jobProposalRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<JobProposal> {
    const proposal = await this.jobProposalRepository.findOneBy({ id });
    if (!proposal) {
      throw new NotFoundException(`Job proposal with ID ${id} not found`);
    }
    return proposal;
  }

  async update(id: number, updateJobProposalDto: UpdateJobProposalDto): Promise<JobProposal> {
    const proposal = await this.findOne(id);
    const updatedProposal = Object.assign(proposal, updateJobProposalDto);
    return this.jobProposalRepository.save(updatedProposal);
  }

  async remove(id: number): Promise<void> {
    const result = await this.jobProposalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job proposal with ID ${id} not found`);
    }
  }

  async findByStatus(status: string): Promise<JobProposal[]> {
    return this.jobProposalRepository.find({
      where: { status },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}

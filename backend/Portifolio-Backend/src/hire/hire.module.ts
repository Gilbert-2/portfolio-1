// src/hire/hire.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HireService } from './hire.service';
import { HireController } from './hire.controller';
import { JobProposal } from './entities/job-proposal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobProposal])],
  controllers: [HireController],
  providers: [HireService],
  exports: [HireService],
})
export class HireModule {}
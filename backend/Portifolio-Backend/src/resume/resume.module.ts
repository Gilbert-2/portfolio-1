// src/resume/resume.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Experience } from './entities/experience.entity';
import { Skill } from './entities/skill.entity';
import { Certificate } from './entities/certificate.entity';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experience.service';
import { SkillService } from './services/skill.service';
import { CertificateService } from './services/certificate.service';
import { EducationController } from './controllers/education.controller';
import { ExperienceController } from './controllers/experience.controller';
import { SkillController } from './controllers/skill.controller';
import { CertificateController } from './controllers/certificate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Education, Experience, Skill, Certificate])],
  controllers: [
    EducationController,
    ExperienceController,
    SkillController,
    CertificateController
  ],
  providers: [
    EducationService,
    ExperienceService,
    SkillService,
    CertificateService
  ],
  exports: [
    EducationService,
    ExperienceService,
    SkillService,
    CertificateService
  ],
})
export class ResumeModule {}
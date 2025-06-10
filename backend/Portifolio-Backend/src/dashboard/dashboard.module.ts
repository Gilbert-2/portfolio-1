// src/dashboard/dashboard.module.ts

import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AnalyticsModule } from '../analytics/analytics.module';
import { BlogModule } from '../blog/blog.module';
import { ProjectsModule } from '../projects/projects.module';
import { ContactModule } from '../contact/contact.module';
import { HireModule } from '../hire/hire.module';

@Module({
  imports: [
    AnalyticsModule,
    BlogModule,
    ProjectsModule,
    ContactModule,
    HireModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
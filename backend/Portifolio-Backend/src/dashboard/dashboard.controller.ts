// src/dashboard/dashboard.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@ApiTags('Dashboard_Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get dashboard summary' })
  @ApiResponse({ status: 200, description: 'Return dashboard summary statistics.' })
  getDashboardSummary() {
    return this.dashboardService.getDashboardSummary();
  }
}

// src/analytics/analytics.controller.ts

import { Controller, Get, Post, Body, Query, UseGuards, ParseDatePipe } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@ApiTags('Analytics-Management')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  @ApiOperation({ summary: 'Track a visitor' })
  @ApiResponse({ status: 201, description: 'The visitor has been successfully tracked.' })
  trackVisitor(@Body() createVisitorDto: CreateVisitorDto) {
    return this.analyticsService.createVisitor(createVisitorDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
 
  @ApiOperation({ summary: 'Get recent visitors' })
  @ApiResponse({ status: 200, description: 'Return recent visitors.' })
  findAll() {
    return this.analyticsService.findAll();
  }

  @Get('statistics')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)

  @ApiOperation({ summary: 'Get visitor statistics' })
  @ApiResponse({ status: 200, description: 'Return visitor statistics.' })
  getStatistics() {
    return this.analyticsService.getVisitorStatistics();
  }

  @Get('count')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)

  @ApiOperation({ summary: 'Get visitor count' })
  @ApiResponse({ status: 200, description: 'Return visitor count.' })
  getVisitorCount() {
    return this.analyticsService.getVisitorCount();
  }

  @Get('unique')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  
  @ApiOperation({ summary: 'Get unique visitor count' })
  @ApiResponse({ status: 200, description: 'Return unique visitor count.' })
  getUniqueVisitorCount() {
    return this.analyticsService.getUniqueVisitorCount();
  }

  @Get('top-pages')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  
  @ApiOperation({ summary: 'Get top visited pages' })
  @ApiResponse({ status: 200, description: 'Return top visited pages.' })
  getTopPages(@Query('limit') limit: number = 10) {
    return this.analyticsService.getTopPages(limit);
  }

  @Get('by-path')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  
  @ApiOperation({ summary: 'Get visitors by path' })
  @ApiResponse({ status: 200, description: 'Return visitors for a specific path.' })
  getVisitorsByPath(@Query('path') path: string) {
    return this.analyticsService.getVisitorsByPath(path);
  }

  @Get('by-date')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  
  @ApiOperation({ summary: 'Get visitors by date range' })
  @ApiResponse({ status: 200, description: 'Return visitors for a specific date range.' })
  getVisitorsByDateRange(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.analyticsService.getVisitorsByDateRange(startDate, endDate);
  }
}
// src/analytics/analytics.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Visitor } from './entities/visitor.entity';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { VisitorStatisticsDto } from './dto/visitor-statistics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
  ) {}

  async createVisitor(createVisitorDto: CreateVisitorDto): Promise<Visitor> {
    const visitor = this.visitorRepository.create(createVisitorDto);
    return this.visitorRepository.save(visitor);
  }

  async findAll(): Promise<Visitor[]> {
    return this.visitorRepository.find({
      order: { createdAt: 'DESC' },
      take: 100,
    });
  }

  async getVisitorCount(): Promise<number> {
    return this.visitorRepository.count();
  }

  async getUniqueVisitorCount(): Promise<number> {
    const uniqueIps = await this.visitorRepository
      .createQueryBuilder('visitor')
      .select('visitor.ip')
      .where('visitor.ip IS NOT NULL')
      .groupBy('visitor.ip')
      .getCount();
    return uniqueIps;
  }

  async getVisitorsByDateRange(startDate: Date, endDate: Date): Promise<Visitor[]> {
    return this.visitorRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async getVisitorsByPath(path: string): Promise<Visitor[]> {
    return this.visitorRepository.find({
      where: { path },
      order: { createdAt: 'DESC' },
    });
  }

  async getTopPages(limit: number = 10): Promise<{ path: string; count: number }[]> {
    const result = await this.visitorRepository
      .createQueryBuilder('visitor')
      .select('visitor.path, COUNT(visitor.id) as count')
      .groupBy('visitor.path')
      .orderBy('count', 'DESC')
      .limit(limit)
      .getRawMany();
    return result;
  }

  async getVisitorStatistics(): Promise<VisitorStatisticsDto> {
    
    const totalVisitors = await this.getVisitorCount();
    
  
    const uniqueVisitors = await this.getUniqueVisitorCount();
    
    
    const topPages = await this.getTopPages(5);
    
    
    const browserStats = await this.visitorRepository
      .createQueryBuilder('visitor')
      .select('visitor.browser, COUNT(visitor.id) as count')
      .where('visitor.browser IS NOT NULL')
      .groupBy('visitor.browser')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();
    
  
    const deviceStats = await this.visitorRepository
      .createQueryBuilder('visitor')
      .select('visitor.deviceType, COUNT(visitor.id) as count')
      .where('visitor.deviceType IS NOT NULL')
      .groupBy('visitor.deviceType')
      .orderBy('count', 'DESC')
      .limit(3)
      .getRawMany();
    
 
    const countryStats = await this.visitorRepository
      .createQueryBuilder('visitor')
      .select('visitor.country, COUNT(visitor.id) as count')
      .where('visitor.country IS NOT NULL')
      .groupBy('visitor.country')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();
    
    return {
      totalVisitors,
      uniqueVisitors,
      topPages,
      browserStats,
      deviceStats,
      countryStats,
    };
  }
}

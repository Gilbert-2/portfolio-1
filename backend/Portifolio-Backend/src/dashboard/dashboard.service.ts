// src/dashboard/dashboard.service.ts

import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '../analytics/analytics.service';
import { DashboardSummaryDto } from './dto/dashboard-summary.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly analyticsService: AnalyticsService,
  ) {}

  async getDashboardSummary(): Promise<DashboardSummaryDto> {
 
    const visitorStats = await this.analyticsService.getVisitorStatistics();
    
 
    const mobileUsers = visitorStats.deviceStats.find(stat => stat.deviceType === 'Mobile')?.count || 0;
    const desktopUsers = visitorStats.deviceStats.find(stat => stat.deviceType === 'Desktop')?.count || 0;
    const tabletUsers = visitorStats.deviceStats.find(stat => stat.deviceType === 'Tablet')?.count || 0;
    
    const totalDeviceUsers = mobileUsers + desktopUsers + tabletUsers;
    
    const mobilePercentage = totalDeviceUsers > 0 ? (mobileUsers / totalDeviceUsers) * 100 : 0;
    const desktopPercentage = totalDeviceUsers > 0 ? (desktopUsers / totalDeviceUsers) * 100 : 0;
    const tabletPercentage = totalDeviceUsers > 0 ? (tabletUsers / totalDeviceUsers) * 100 : 0;
    
  
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const recentVisitors = await this.analyticsService.getVisitorsByDateRange(sevenDaysAgo, today);
    
  
    const visitorsByDay = recentVisitors.reduce((acc, visitor) => {
      const date = visitor.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});
    

    const dailyVisitorsChart = Object.keys(visitorsByDay).map(date => ({
      date,
      visitors: visitorsByDay[date],
    })).sort((a, b) => a.date.localeCompare(b.date));
    
    return {
      totalVisitors: visitorStats.totalVisitors,
      uniqueVisitors: visitorStats.uniqueVisitors,
      topPages: visitorStats.topPages,
      deviceDistribution: {
        mobile: mobilePercentage,
        desktop: desktopPercentage,
        tablet: tabletPercentage,
      },
      visitorsByCountry: visitorStats.countryStats,
      dailyVisitorsChart,
      browserDistribution: visitorStats.browserStats,
    };
  }
}
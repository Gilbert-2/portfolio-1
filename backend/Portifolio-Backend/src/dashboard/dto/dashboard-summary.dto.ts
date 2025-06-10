// src/dashboard/dto/dashboard-summary.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class DeviceDistributionDto {
  @ApiProperty({ example: 35.5 })
  mobile: number;

  @ApiProperty({ example: 60.2 })
  desktop: number;

  @ApiProperty({ example: 4.3 })
  tablet: number;
}

export class DailyVisitorsDto {
  @ApiProperty({ example: '2023-05-01' })
  date: string;

  @ApiProperty({ example: 125 })
  visitors: number;
}

export class DashboardSummaryDto {
  @ApiProperty({ example: 1500 })
  totalVisitors: number;

  @ApiProperty({ example: 800 })
  uniqueVisitors: number;

  @ApiProperty({
    example: [
      { path: '/projects', count: 350 },
      { path: '/blog', count: 250 },
    ],
  })
  topPages: { path: string; count: number }[];

  @ApiProperty()
  deviceDistribution: DeviceDistributionDto;

  @ApiProperty({
    example: [
      { country: 'US', count: 400 },
      { country: 'UK', count: 200 },
    ],
  })
  visitorsByCountry: { country: string; count: number }[];

  @ApiProperty({
    example: [
      { date: '2023-05-01', visitors: 125 },
      { date: '2023-05-02', visitors: 142 },
    ],
  })
  dailyVisitorsChart: DailyVisitorsDto[];

  @ApiProperty({
    example: [
      { browser: 'Chrome', count: 600 },
      { browser: 'Firefox', count: 300 },
    ],
  })
  browserDistribution: { browser: string; count: number }[];
}
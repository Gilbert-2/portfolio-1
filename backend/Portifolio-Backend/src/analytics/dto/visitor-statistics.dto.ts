// src/analytics/dto/visitor-statistics.dto.ts

import { ApiProperty } from '@nestjs/swagger';
export class VisitorStatisticsDto {
  @ApiProperty({ example: 1000 })
  totalVisitors: number;

  @ApiProperty({ example: 500 })
  uniqueVisitors: number;

  @ApiProperty({
    example: [
      { path: '/projects', count: 250 },
      { path: '/blog', count: 150 },
    ],
  })
  topPages: { path: string; count: number }[];

  @ApiProperty({
    example: [
      { browser: 'Chrome', count: 400 },
      { browser: 'Firefox', count: 200 },
    ],
  })
  browserStats: { browser: string; count: number }[];

  @ApiProperty({
    example: [
      { deviceType: 'Desktop', count: 600 },
      { deviceType: 'Mobile', count: 300 },
    ],
  })
  deviceStats: { deviceType: string; count: number }[];

  @ApiProperty({
    example: [
      { country: 'US', count: 300 },
      { country: 'GB', count: 150 },
    ],
  })
  countryStats: { country: string; count: number }[];
}
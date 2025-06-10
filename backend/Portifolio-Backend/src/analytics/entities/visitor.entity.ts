// src/analytics/entities/visitor.entity.ts

import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('visitors')
export class Visitor extends BaseEntity {
  @ApiProperty({ example: '123.45.67.89', description: 'Visitor IP address' })
  @Column({ nullable: true })
  ip: string;

  @ApiProperty({ example: 'Mozilla/5.0...', description: 'User agent string' })
  @Column({ name: 'user_agent', nullable: true })
  userAgent: string;

  @ApiProperty({ example: 'https://google.com', description: 'Referrer URL' })
  @Column({ nullable: true })
  referrer: string;

  @ApiProperty({ example: '/projects', description: 'Page visited' })
  @Column()
  path: string;

  @ApiProperty({ example: 'US', description: 'Country code' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ example: 'Chrome', description: 'Browser' })
  @Column({ nullable: true })
  browser: string;

  @ApiProperty({ example: 'Windows', description: 'Operating system' })
  @Column({ name: 'operating_system', nullable: true })
  operatingSystem: string;

  @ApiProperty({ example: 'Desktop', description: 'Device type' })
  @Column({ name: 'device_type', nullable: true })
  deviceType: string;
}

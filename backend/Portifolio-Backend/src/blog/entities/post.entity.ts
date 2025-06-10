// src/blog/entities/post.entity.ts

import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('blog_posts')
export class BlogPost extends BaseEntity {
  @ApiProperty({ example: 'Introduction to NestJS', description: 'Post title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'nestjs-introduction', description: 'Post slug' })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({ example: 'NestJS is a framework...', description: 'Post excerpt' })
  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @ApiProperty({ example: '# Introduction\n\nNestJS is...', description: 'Post content in markdown' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Featured image URL' })
  @Column({ name: 'featured_image', nullable: true })
  featuredImage: string;

  @ApiProperty({ example: ['NestJS', 'TypeScript'], description: 'Post tags' })
  @Column({ type: 'simple-array', default: '' })
  tags: string[];

  @ApiProperty({ example: true, description: 'Is the post published?' })
  @Column({ default: false })
  published: boolean;

  @ApiProperty({ example: '2023-01-01', description: 'Publication date' })
  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date;
}

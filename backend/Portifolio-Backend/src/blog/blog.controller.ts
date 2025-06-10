// src/blog/blog.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPost } from './entities/post.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Blog-Management')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({ status: 201, description: 'The post has been created successfully.', type: BlogPost })
  create(@Body() createPostDto: CreatePostDto): Promise<BlogPost> {
    return this.blogService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiQuery({ name: 'published', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Return all blog posts.', type: [BlogPost] })
  findAll(@Query('published') published?: boolean): Promise<BlogPost[]> {
    return this.blogService.findAll(published === undefined ? undefined : published === true);
  }

  @Get('tag/:tag')
  @ApiOperation({ summary: 'Get posts by tag' })
  @ApiResponse({ status: 200, description: 'Return posts with specified tag.', type: [BlogPost] })
  findByTag(@Param('tag') tag: string): Promise<BlogPost[]> {
    return this.blogService.findByTag(tag);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by id' })
  @ApiResponse({ status: 200, description: 'Return the found post.', type: BlogPost })
  findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.findOne(+id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a blog post by slug' })
  @ApiResponse({ status: 200, description: 'Return the found post.', type: BlogPost })
  findBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    return this.blogService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a blog post' })
  @ApiResponse({ status: 200, description: 'The post has been updated successfully.', type: BlogPost })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<BlogPost> {
    return this.blogService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiResponse({ status: 200, description: 'The post has been deleted successfully.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(+id);
  }
}
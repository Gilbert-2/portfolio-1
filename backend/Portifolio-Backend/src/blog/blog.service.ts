// src/blog/blog.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<BlogPost> {
    const post = this.blogPostRepository.create(createPostDto);
    if (createPostDto.published) {
      post.publishedAt = new Date();
    }
    return this.blogPostRepository.save(post);
  }

  async findAll(published?: boolean): Promise<BlogPost[]> {
    const query = this.blogPostRepository.createQueryBuilder('post');
    
    if (published !== undefined) {
      query.where('post.published = :published', { published });
    }
    
    return query.orderBy('post.createdAt', 'DESC').getMany();
  }

  async findOne(id: number): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return post;
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOneBy({ slug });
    if (!post) {
      throw new NotFoundException(`Blog post with slug ${slug} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<BlogPost> {
    const post = await this.findOne(id);
    
    // If post is being published for the first time, set publishedAt date
    if (!post.published && updatePostDto.published) {
      updatePostDto['publishedAt'] = new Date();
    }
    
    const updatedPost = Object.assign(post, updatePostDto);
    return this.blogPostRepository.save(updatedPost);
  }

  async remove(id: number): Promise<void> {
    const result = await this.blogPostRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
  }

  async findByTag(tag: string): Promise<BlogPost[]> {
    return this.blogPostRepository
      .createQueryBuilder('post')
      .where('post.tags LIKE :tag', { tag: `%${tag}%` })
      .andWhere('post.published = :published', { published: true })
      .orderBy('post.publishedAt', 'DESC')
      .getMany();
  }
}

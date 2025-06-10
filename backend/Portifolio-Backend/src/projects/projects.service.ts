import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, image?: Express.Multer.File): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    
    if (image) {
     
      project.imagePath = `projects/${image.filename}`;
      
     
    
      
     
    }
    
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({
      order: {
        featured: 'DESC',
        startDate: 'DESC',
      },
    });
  }

  async findFeatured(): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { featured: true },
      order: { startDate: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, image?: Express.Multer.File): Promise<Project> {
    const project = await this.findOne(id);
    
   
    if (image) {
      if (project.imagePath) {
        try {
         
          const oldImagePath = path.join(process.cwd(), 'uploads', project.imagePath);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log(`Deleted old image: ${oldImagePath}`);
          }
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      
      
      project.imagePath = `projects/${image.filename}`;
      
    }
    

    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);

   
    if (project.imagePath) {
      try {
       
        const imagePath = path.join(process.cwd(), 'uploads', project.imagePath);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${imagePath}`);
        }
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
  
  
  async verifyImagePaths(): Promise<void> {
    const projects = await this.projectsRepository.find();
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    console.log('Verifying image paths for all projects...');
    
    for (const project of projects) {
      if (project.imagePath) {
        const fullPath = path.join(uploadsDir, project.imagePath);
        const exists = fs.existsSync(fullPath);
        
        console.log(`Project: ${project.id} - ${project.title}`);
        console.log(`Image path: ${project.imagePath}`);
        console.log(`Full path: ${fullPath}`);
        console.log(`Image exists: ${exists}`);
        
        if (!exists) {
          console.warn(`Missing image for project: ${project.id} - ${project.title}`);
        }
      } else {
        console.log(`Project: ${project.id} - ${project.title} has no image`);
      }
    }
    
    console.log('Image path verification complete');
  }
}
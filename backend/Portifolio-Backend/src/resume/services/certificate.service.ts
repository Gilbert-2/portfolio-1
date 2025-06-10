import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from '../entities/certificate.entity';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { UpdateCertificateDto } from '../dto/update-certificate.dto';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const copyFileAsync = promisify(fs.copyFile);
const unlinkAsync = promisify(fs.unlink);
const existsAsync = promisify(fs.exists);
const mkdirAsync = promisify(fs.mkdir);

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
  ) {}

  async create(
    createCertificateDto: CreateCertificateDto,
    file?: Express.Multer.File,
  ): Promise<Certificate> {
    const certificate = this.certificateRepository.create(createCertificateDto);
    
    if (file) {
      certificate.imagePath = file.filename;
      
      try {
       
        const backendDir = path.join(process.cwd(), 'public', 'images', 'certificates');
        const frontendDir = path.join(process.cwd(), '..', 'portfolio-gilbert-frontend', 'public', 'images', 'certificates');
        
      
        if (!fs.existsSync(backendDir)) {
          await mkdirAsync(backendDir, { recursive: true });
        }
        
        if (!fs.existsSync(frontendDir)) {
          await mkdirAsync(frontendDir, { recursive: true });
        }
        
     
        const source = path.join(process.cwd(), file.path);
        const backendDestination = path.join(backendDir, file.filename);
        
        await copyFileAsync(source, backendDestination);
        
       
        const frontendDestination = path.join(frontendDir, file.filename);
        await copyFileAsync(source, frontendDestination);
       
        console.log(`Certificate image saved to: ${backendDestination}`);
        console.log(`Certificate image copied to frontend: ${frontendDestination}`);
      } catch (err) {
        console.error('Error handling certificate image:', err);
      }
    }
    
    return this.certificateRepository.save(certificate);
  }

  async findAll(): Promise<Certificate[]> {
    return this.certificateRepository.find({
      order: {
        issueDate: 'DESC' 
      }
    });
  }

  async findOne(id: number): Promise<Certificate> {
    const certificate = await this.certificateRepository.findOne({ where: { id } });
    
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    
    return certificate;
  }

  async update(
    id: number,
    updateCertificateDto: UpdateCertificateDto,
    file?: Express.Multer.File,
  ): Promise<Certificate> {
    const certificate = await this.findOne(id);
    
  
    Object.assign(certificate, updateCertificateDto);
    

    if (file) {
     
      if (certificate.imagePath) {
        await this.deleteImageFile(certificate.imagePath);
      }
      
      certificate.imagePath = file.filename;
      
      try {
        
        const backendDir = path.join(process.cwd(), 'public', 'images', 'certificates');
        const frontendDir = path.join(process.cwd(), '..', 'portfolio-gilbert-frontend', 'public', 'images', 'certificates');
        
        if (!fs.existsSync(backendDir)) {
          await mkdirAsync(backendDir, { recursive: true });
        }
        
        if (!fs.existsSync(frontendDir)) {
          await mkdirAsync(frontendDir, { recursive: true });
        }
        
       
        const source = path.join(process.cwd(), file.path);
        const backendDestination = path.join(backendDir, file.filename);
        
        await copyFileAsync(source, backendDestination);
        
  
        const frontendDestination = path.join(frontendDir, file.filename);
        await copyFileAsync(source, frontendDestination);
      } catch (err) {
        console.error('Error updating certificate image:', err);
      }
    }
    
    return this.certificateRepository.save(certificate);
  }

  async remove(id: number): Promise<void> {
    const certificate = await this.findOne(id);
    
   
    if (certificate.imagePath) {
      await this.deleteImageFile(certificate.imagePath);
    }
    
    await this.certificateRepository.remove(certificate);
  }
  
  private async deleteImageFile(filename: string): Promise<void> {
    try {
     
      const backendPath = path.join(process.cwd(), 'public', 'images', 'certificates', filename);
      if (await existsAsync(backendPath)) {
        await unlinkAsync(backendPath);
        console.log(`Deleted file from backend: ${backendPath}`);
      }
      
   
      const frontendPath = path.join(process.cwd(), '..', 'portfolio-gilbert-frontend', 'public', 'images', 'certificates', filename);
      if (await existsAsync(frontendPath)) {
        await unlinkAsync(frontendPath);
        console.log(`Deleted file from frontend: ${frontendPath}`);
      }
      
     
      const uploadsPath = path.join(process.cwd(), 'uploads', 'resume', filename);
      if (await existsAsync(uploadsPath)) {
        await unlinkAsync(uploadsPath);
        console.log(`Deleted file from uploads: ${uploadsPath}`);
      }
    } catch (error) {
      console.error('Error deleting certificate image file:', error);
    }
  }
}
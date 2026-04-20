import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import * as fs from 'fs';
import { join } from 'path';

type AboutContent = {
  id: number;
  fullName: string;
  headline: string;
  summary: string;
  biography: string | null;
  databases: string[];
  languages: string[];
  frameworks: string[];
  yearsExperience: number;
  details: string[];
  homeTagline: string;
  homeDescription: string;
  resumePath: string;
};

const ABOUT_FALLBACK: AboutContent = {
  id: 1,
  fullName: 'Gilbert Mugabe',
  headline: 'Full Stack Developer',
  summary:
    'Hi! My name is Gilbert Mugabe and I find immense satisfaction in creating, designing, and implementing digital solutions. My venture into software development started with a profound passion for crafting innovative and scalable applications that effectively address real-world challenges.',
  biography:
    'I specialize in both frontend and backend development, with expertise in technologies like React, Redux, TypeScript, and Tailwind CSS for creating responsive user interfaces, as well as Node.js, Express, NestJS, MongoDB, and PostgreSQL for robust server-side solutions.',
  databases: ['MongoDB', 'PostgreSQL', 'MySQL'],
  languages: ['TypeScript', 'JavaScript'],
  frameworks: ['NestJS', 'NextJS', 'ExpressJS', 'React', 'Redux', 'Tailwind CSS'],
  yearsExperience: 2,
  details: [
    'I specialize in both frontend and backend development, with expertise in technologies like React, Redux, TypeScript, and Tailwind CSS for creating responsive user interfaces, as well as Node.js, Express, NestJS, MongoDB, and PostgreSQL for robust server-side solutions.',
    'I hold a Bachelor of Computer Engineering with Honours at the University of Rwanda (2021-2025), which provided me with a strong technical foundation in software engineering principles.',
    'From October 2023 to March 2024, I participated in the CSR Technical Program, which significantly enhanced my skills across various technologies and best practices in software development. This program allowed me to dive deep into both frontend and backend development, cementing my path as a Full Stack Engineer.',
    "Most recently, I worked at FHR Rwanda as a Frontend Developer, where I developed a scalable financial management tools using Next.js, JavaScript, and Ant Design. I also interned at MTN Rwanda as Software Developer, where I built a Y'ello care system using Spring Boot, Java, and PostgreSQL.",
  ],
  homeTagline:
    'Driven software engineer committed to building innovative, scalable solutions that power seamless digital experiences.',
  homeDescription:
    'Versatile and results-driven Full Stack Software Engineer with a proven track record of delivering robust, scalable, and innovative solutions across the software development lifecycle. Adept at leveraging both front-end and back-end technologies to create seamless, high-performance applications. Passionate about solving complex challenges through clean code, thoughtful architecture, and user-centric design.',
  resumePath: '/document/resume.pdf',
};

@Injectable()
export class AboutService {
  private readonly aboutFilePath = join(process.cwd(), 'uploads', 'about-content.json');

  private ensureStorage() {
    const dir = join(process.cwd(), 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private async readContent(): Promise<AboutContent> {
    this.ensureStorage();
    if (!fs.existsSync(this.aboutFilePath)) {
      return ABOUT_FALLBACK;
    }

    try {
      const raw = await fs.promises.readFile(this.aboutFilePath, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<AboutContent>;
      return {
        ...ABOUT_FALLBACK,
        ...parsed,
        details: parsed.details?.length ? parsed.details : ABOUT_FALLBACK.details,
        homeTagline: parsed.homeTagline || ABOUT_FALLBACK.homeTagline,
        homeDescription: parsed.homeDescription || ABOUT_FALLBACK.homeDescription,
        resumePath: parsed.resumePath || ABOUT_FALLBACK.resumePath,
      };
    } catch (_err) {
      return ABOUT_FALLBACK;
    }
  }

  private async writeContent(content: AboutContent): Promise<void> {
    this.ensureStorage();
    await fs.promises.writeFile(this.aboutFilePath, JSON.stringify(content, null, 2), 'utf-8');
  }

  async create(createAboutDto: CreateAboutDto): Promise<AboutContent> {
    const current = await this.readContent();
    const next: AboutContent = {
      ...current,
      ...createAboutDto,
      databases: createAboutDto.databases ?? current.databases,
      languages: createAboutDto.languages ?? current.languages,
      frameworks: createAboutDto.frameworks ?? current.frameworks,
      yearsExperience: createAboutDto.yearsExperience ?? current.yearsExperience,
      details: createAboutDto.details ?? current.details,
      homeTagline: createAboutDto.homeTagline ?? current.homeTagline,
      homeDescription: createAboutDto.homeDescription ?? current.homeDescription,
      resumePath: createAboutDto.resumePath ?? current.resumePath,
      id: 1,
    };
    await this.writeContent(next);
    return next;
  }

  async findAll(): Promise<AboutContent[]> {
    const content = await this.readContent();
    return [content];
  }

  async findLatest(): Promise<AboutContent> {
    return this.readContent();
  }

  async findOne(id: number): Promise<AboutContent> {
    if (id !== 1) {
      throw new NotFoundException(`About record with ID ${id} not found`);
    }
    return this.readContent();
  }

  async update(id: number, updateAboutDto: UpdateAboutDto): Promise<AboutContent> {
    const current = await this.findOne(id);
    const next: AboutContent = {
      ...current,
      ...updateAboutDto,
      databases: updateAboutDto.databases ?? current.databases,
      languages: updateAboutDto.languages ?? current.languages,
      frameworks: updateAboutDto.frameworks ?? current.frameworks,
      yearsExperience: updateAboutDto.yearsExperience ?? current.yearsExperience,
      details: updateAboutDto.details ?? current.details,
      homeTagline: updateAboutDto.homeTagline ?? current.homeTagline,
      homeDescription: updateAboutDto.homeDescription ?? current.homeDescription,
      resumePath: updateAboutDto.resumePath ?? current.resumePath,
      id: 1,
    };
    await this.writeContent(next);
    return next;
  }

  async remove(id: number): Promise<void> {
    if (id !== 1) {
      throw new NotFoundException(`About record with ID ${id} not found`);
    }
    await this.writeContent(ABOUT_FALLBACK);
  }

  async updateResumePath(path: string): Promise<AboutContent> {
    const current = await this.readContent();
    const next = { ...current, resumePath: path };
    await this.writeContent(next);
    return next;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@ApiTags('About-Management')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @ApiOperation({ summary: 'Get all about records' })
  @ApiResponse({ status: 200 })
  findAll(): Promise<Record<string, unknown>[]> {
    return this.aboutService.findAll();
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get latest about record' })
  @ApiResponse({ status: 200 })
  findLatest(): Promise<Record<string, unknown>> {
    return this.aboutService.findLatest();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get about record by id' })
  @ApiResponse({ status: 200 })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Record<string, unknown>> {
    return this.aboutService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create about record' })
  @ApiResponse({ status: 201 })
  create(@Body() createAboutDto: CreateAboutDto): Promise<Record<string, unknown>> {
    return this.aboutService.create(createAboutDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update about record' })
  @ApiResponse({ status: 200 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAboutDto: UpdateAboutDto,
  ): Promise<Record<string, unknown>> {
    return this.aboutService.update(id, updateAboutDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete about record' })
  @ApiResponse({ status: 200 })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.aboutService.remove(id);
  }

  @Post('resume')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload resume file' })
  @ApiResponse({ status: 201 })
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const destination = join(process.cwd(), 'uploads', 'document');
          if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
          }
          cb(null, destination);
        },
        filename: (_req, file, cb) => {
          const extension = extname(file.originalname || '').toLowerCase() || '.pdf';
          cb(null, `resume${extension}`);
        },
      }),
    }),
  )
  async uploadResume(@UploadedFile() file?: Express.Multer.File): Promise<Record<string, unknown>> {
    if (!file) {
      return { message: 'No file uploaded' };
    }
    const path = `/uploads/document/${file.filename}`;
    const about = await this.aboutService.updateResumePath(path);
    return { message: 'Resume uploaded successfully', resumePath: path, about };
  }
}

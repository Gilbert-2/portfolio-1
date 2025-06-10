import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiResponse, 
  ApiTags, 
  ApiConsumes,
  ApiBody
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Projects-Management')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully', type: Project })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: (req, file, cb) => {
         
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
 
        const acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const acceptedExtensions = /\.(jpg|jpeg|png|gif)$/i;
        
        if (!acceptedMimeTypes.includes(file.mimetype) || 
            !acceptedExtensions.test(file.originalname)) {
          return cb(new Error('Only image files (JPG, JPEG, PNG, GIF) are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
        ],
        fileIsRequired: false,
        errorHttpStatusCode: 400,
      }),
    )
    image?: Express.Multer.File,
  ) {
    
    if (typeof createProjectDto.technologies === 'string') {
      createProjectDto.technologies = (createProjectDto.technologies as string).split(',').map(tech => tech.trim());
    }
    
   
    if (createProjectDto.featured !== undefined) {
      createProjectDto.featured = 
        createProjectDto.featured === true || 
        String(createProjectDto.featured) === 'true' || 
        String(createProjectDto.featured) === '1';
    }

    return this.projectsService.create(createProjectDto, image);
  }

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Return all projects', type: [Project] })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Get featured projects' })
  @ApiResponse({ status: 200, description: 'Return featured projects', type: [Project] })
  @Get('featured')
  findFeatured() {
    return this.projectsService.findFeatured();
  }

  @ApiOperation({ summary: 'Get a specific project' })
  @ApiResponse({ status: 200, description: 'Return a project', type: Project })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project updated successfully', type: Project })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
       
        const acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const acceptedExtensions = /\.(jpg|jpeg|png|gif)$/i;
        
        if (!acceptedMimeTypes.includes(file.mimetype) || 
            !acceptedExtensions.test(file.originalname)) {
          return cb(new Error('Only image files (JPG, JPEG, PNG, GIF) are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param('id') id: string, 
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }), 
        ],
        fileIsRequired: false,
        errorHttpStatusCode: 400,
      }),
    )
    image?: Express.Multer.File,
  ) {
   
    if (typeof updateProjectDto.technologies === 'string') {
      updateProjectDto.technologies = (updateProjectDto.technologies as string).split(',').map(tech => tech.trim());
    }
    
   
    if (updateProjectDto.featured !== undefined) {
      updateProjectDto.featured = 
        updateProjectDto.featured === true || 
        String(updateProjectDto.featured) === 'true' || 
        String(updateProjectDto.featured) === '1';
    }

    return this.projectsService.update(+id, updateProjectDto, image);
  }

  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
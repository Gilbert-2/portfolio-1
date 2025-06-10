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
  
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiConsumes, 
  ApiBody 
} from '@nestjs/swagger';
import { CertificateService } from '../services/certificate.service';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { UpdateCertificateDto } from '../dto/update-certificate.dto';
import { Certificate } from '../entities/certificate.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { multerConfig } from '../../common/configs/multer.config';

@ApiTags('Certificates-Management')
@Controller('resume/certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new certificate entry with image/pdf upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        issuer: { type: 'string' },
        issueDate: { type: 'string', format: 'date' },
        description: { type: 'string' },
        credentialUrl: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Certificate image or PDF (png, jpeg, jpg, gif, pdf)'
        },
      },
      required: ['title', 'issuer'],
    },
  })
  @ApiResponse({ 
    status: 201, 
    description: 'The certificate entry has been created successfully.', 
    type: Certificate 
  })
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(
    @Body() createCertificateDto: CreateCertificateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), 
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ): Promise<Certificate> {
    return this.certificateService.create(createCertificateDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all certificate entries' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all certificate entries.', 
    type: [Certificate] 
  })
  findAll(): Promise<Certificate[]> {
    return this.certificateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a certificate entry by id' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return the found certificate entry.', 
    type: Certificate 
  })
  findOne(@Param('id') id: string): Promise<Certificate> {
    return this.certificateService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a certificate entry with optional image/pdf upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        issuer: { type: 'string' },
        issueDate: { type: 'string', format: 'date' },
        description: { type: 'string' },
        credentialUrl: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Certificate image or PDF (png, jpeg, jpg, gif, pdf)'
        },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'The certificate entry has been updated successfully.', 
    type: Certificate 
  })
  @UseInterceptors(FileInterceptor('image', multerConfig))
  update(
    @Param('id') id: string, 
    @Body() updateCertificateDto: UpdateCertificateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), 
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ): Promise<Certificate> {
    return this.certificateService.update(+id, updateCertificateDto, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a certificate entry' })
  @ApiResponse({ 
    status: 200, 
    description: 'The certificate entry has been deleted successfully.' 
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.certificateService.remove(+id);
  }
}
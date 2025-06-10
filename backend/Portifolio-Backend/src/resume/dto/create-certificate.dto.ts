import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsUrl } from 'class-validator';

export class CreateCertificateDto {
  @ApiProperty({ example: 'AWS Certified Solutions Architect', description: 'Certificate title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Amazon Web Services', description: 'Issuing organization' })
  @IsNotEmpty()
  @IsString()
  issuer: string;

  @ApiProperty({ example: '2023-01-01', description: 'Issue date', required: false })
  @IsOptional()
  @IsDateString()
  issueDate?: Date;


  @ApiProperty({ 
    example: 'Validates expertise in designing distributed applications and systems on AWS',
    description: 'Certificate description',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    example: 'https://www.credly.com/badges/example-credential',
    description: 'Credential URL',
    required: false
  })
  @IsOptional()
  @IsUrl()
  credentialUrl?: string;
}
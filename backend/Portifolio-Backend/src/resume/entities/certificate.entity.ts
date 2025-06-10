import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('certificates')
export class Certificate extends BaseEntity {
  @ApiProperty({ example: 'IT Essentials: PC Hardware and Software', description: 'Certificate title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'CISCO Networking Academy', description: 'Issuing organization' })
  @Column()
  issuer: string;

  @ApiProperty({ example: '2023-01-01', description: 'Issue date' })
  @Column({ name: 'issue_date', type: 'date', nullable: true })
  issueDate: Date | null;


  @ApiProperty({ example: 'Configure switches and end devices...', description: 'Certificate description' })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({ example: 'https://example.com/credential', description: 'Credential URL' })
  @Column({ name: 'credential_url', nullable: true, type: 'varchar' })
  credentialUrl: string | null;
  
  @ApiProperty({ example: 'certificate-123.jpg', description: 'Certificate image filename' })
  @Column({ name: 'image_path', nullable: true, type: 'varchar' })
  imagePath: string | null;
}
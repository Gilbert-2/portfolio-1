// src/contact/entities/contact.entity.ts

import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contact_messages')
export class ContactMessage extends BaseEntity {
  @ApiProperty({ example: 'John Doe', description: 'Sender name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Sender email' })
  @Column()
  email: string;

  @ApiProperty({ example: 'Job Opportunity', description: 'Message subject' })
  @Column()
  subject: string;

  @ApiProperty({ example: 'I would like to discuss a job opportunity...', description: 'Message content' })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({ example: false, description: 'Has the message been read?' })
  @Column({ default: false })
  read: boolean;

  @ApiProperty({ example: false, description: 'Has the message been replied to?' })
  @Column({ default: false })
  replied: boolean;
}
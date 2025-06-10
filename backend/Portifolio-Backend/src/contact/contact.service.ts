// src/contact/contact.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private contactMessageRepository: Repository<ContactMessage>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<ContactMessage> {
    const message = this.contactMessageRepository.create(createContactDto);
    const savedMessage = await this.contactMessageRepository.save(message);
    
    return savedMessage;
  }

  findAll(): Promise<ContactMessage[]> {
    return this.contactMessageRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ContactMessage> {
    const message = await this.contactMessageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Contact message with ID ${id} not found`);
    }
    return message;
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<ContactMessage> {
    await this.contactMessageRepository.update(id, updateContactDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contactMessageRepository.delete(id);
  }

  async markAsRead(id: number): Promise<ContactMessage> {
    return this.update(id, { read: true });
  }

  async markAsReplied(id: number): Promise<ContactMessage> {
    return this.update(id, { replied: true });
  }

  async getUnreadCount(): Promise<number> {
    return this.contactMessageRepository.count({ where: { read: false } });
  }
}
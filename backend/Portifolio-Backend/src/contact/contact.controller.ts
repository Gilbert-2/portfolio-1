// src/contact/contact.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactMessage } from './entities/contact.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Contact-Management')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Submit a contact message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully', type: ContactMessage })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiOperation({ summary: 'Get all contact messages' })
  @ApiResponse({ status: 200, description: 'Return all messages', type: [ContactMessage] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @ApiOperation({ summary: 'Get unread messages count' })
  @ApiResponse({ status: 200, description: 'Return unread count' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('unread-count')
  getUnreadCount() {
    return this.contactService.getUnreadCount();
  }

  @ApiOperation({ summary: 'Get a specific contact message' })
  @ApiResponse({ status: 200, description: 'Return a message', type: ContactMessage })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a contact message' })
  @ApiResponse({ status: 200, description: 'Message updated successfully', type: ContactMessage })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiResponse({ status: 200, description: 'Message marked as read', type: ContactMessage })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(+id);
  }

  @ApiOperation({ summary: 'Mark a message as replied' })
  @ApiResponse({ status: 200, description: 'Message marked as replied', type: ContactMessage })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/replied')
  markAsReplied(@Param('id') id: string) {
    return this.contactService.markAsReplied(+id);
  }

  @ApiOperation({ summary: 'Delete a contact message' })
  @ApiResponse({ status: 200, description: 'Message deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
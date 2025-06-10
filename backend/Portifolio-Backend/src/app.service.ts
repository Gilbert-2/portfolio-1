// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Gilbert Mugabe Portfolio API!';
  }

  healthCheck(): { status: string; timestamp: string } {
    return {
      status: 'Active',
      timestamp: new Date().toISOString(),
    };
  }
}
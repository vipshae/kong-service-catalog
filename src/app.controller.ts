import { Controller, Get } from '@nestjs/common';

interface HomeResponse {
  message: string;
  routes: string[];
  timestamp: string;
}

@Controller()
export class AppController {
  @Get()
  getRoot(): HomeResponse {
    const message = {
      message: 'Kong Service Catalog API is running!',
      routes: [
        '/services - List all services (with optional query parameters: limit, page, sortBy, sortOrder, name, description)',
        '/services/:id - Get service by ID',
        '/services/:id/versions - Get versions of a service',
      ],
      timestamp: new Date().toISOString(),
    };
    return message;
  }
}

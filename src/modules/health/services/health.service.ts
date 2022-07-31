import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      name: 'Novelcool API',
      version: '1.0.0',
    };
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      name: 'Novelcool API',
      version: '1.0.0',
    };
  }
}

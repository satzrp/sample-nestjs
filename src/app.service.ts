import { Injectable } from '@nestjs/common';

export interface HealthResponse {
  status: string;
  message: string;
}

@Injectable()
export class AppService {
  welcome(): string {
    return 'Sample Nest API using Hexagonal Architecture!';
  }

  health(): HealthResponse {
    const response: HealthResponse = {
      status: 'OK',
      message: 'App is Up and Running',
    };
    return response;
  }
}

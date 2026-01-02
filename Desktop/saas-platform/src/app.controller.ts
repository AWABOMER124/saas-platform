import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  root() {
    return { ok: true, service: 'Perfect Team - Ideal Agent API' };
  }

  @Get('/health')
  health() {
    return { status: 'ok' };
  }
}

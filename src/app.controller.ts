import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('buy')
  getHello() {
    return this.appService.getBuyOrders();
  }

  @Get('sell')
  getsellOrders() {
    return this.appService.getSellOrders();
  }
}

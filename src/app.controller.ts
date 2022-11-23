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

  @Get('deposits')
  getDepositsHistory() {
    return this.appService.getDepositHistory();
  }

  @Get('withdraws')
  getWithdrawHistory() {
    return this.appService.getWithdrawHistory();
  }

  @Get('transactions')
  getTransactionHistory() {
    return this.appService.getTransactionHistory();
  }
}

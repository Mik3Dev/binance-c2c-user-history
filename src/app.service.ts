import { createHmac } from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { UserTradeHistoryResponse } from './interface/user-trade-history';
import { OrderType } from './enums/order-type.enum';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly c2cPath = '/sapi/v1/c2c/orderMatch/listUserOrderHistory';
  private readonly deposityHistoryPath = '/sapi/v1/capital/deposit/hisrec';
  private readonly withdrawHistoryPath = '/sapi/v1/capital/withdraw/history';
  private readonly transactionHistoryPath = '/sapi/v1/pay/transactions';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getBuyOrders() {
    return await this.getOrders(OrderType.BUY);
  }

  async getSellOrders() {
    return await this.getOrders(OrderType.SELL);
  }

  private async getOrders(orderType: OrderType) {
    const query = `tradeType=${orderType}&recvWindow=5000&timestamp=${Date.now()}`;
    const signature = this.getSignature(query);

    this.logger.debug(
      'Url',
      `${this.configService.get('BINANCE_URL')}${
        this.c2cPath
      }${query}&signature=${signature}`,
    );

    try {
      return await firstValueFrom(
        this.httpService
          .get<UserTradeHistoryResponse>(
            `${this.configService.get('BINANCE_URL')}${
              this.c2cPath
            }?${query}&signature=${signature}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': this.configService.get<string>('API_KEY'),
              },
            },
          )
          .pipe(
            tap((response) => console.log(response)),
            map((response) => response.data),
          ),
      );
    } catch (error) {
      this.logger.error(Object.keys(error));
      this.logger.error(
        'Response',
        JSON.stringify(error.response.data, null, 2),
      );
    }
  }

  async getDepositHistory() {
    const query = `timestamp=${Date.now()}`;
    const signature = this.getSignature(query);

    try {
      return await firstValueFrom(
        this.httpService
          .get<UserTradeHistoryResponse>(
            `${this.configService.get('BINANCE_URL')}${
              this.deposityHistoryPath
            }?${query}&signature=${signature}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': this.configService.get<string>('API_KEY'),
              },
            },
          )
          .pipe(
            tap((response) => console.log(response)),
            map((response) => response.data),
          ),
      );
    } catch (error) {
      this.logger.error(Object.keys(error));
      this.logger.error(
        'Response',
        JSON.stringify(error.response.data, null, 2),
      );
    }
  }

  async getWithdrawHistory() {
    const query = `timestamp=${Date.now()}`;
    const signature = this.getSignature(query);

    try {
      return await firstValueFrom(
        this.httpService
          .get<UserTradeHistoryResponse>(
            `${this.configService.get('BINANCE_URL')}${
              this.withdrawHistoryPath
            }?${query}&signature=${signature}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': this.configService.get<string>('API_KEY'),
              },
            },
          )
          .pipe(
            tap((response) => console.log(response)),
            map((response) => response.data),
          ),
      );
    } catch (error) {
      this.logger.error(Object.keys(error));
      this.logger.error(
        'Response',
        JSON.stringify(error.response.data, null, 2),
      );
    }
  }

  async getTransactionHistory() {
    const query = `timestamp=${Date.now()}`;
    const signature = this.getSignature(query);

    try {
      return await firstValueFrom(
        this.httpService
          .get<UserTradeHistoryResponse>(
            `${this.configService.get('BINANCE_URL')}${
              this.transactionHistoryPath
            }?${query}&signature=${signature}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': this.configService.get<string>('API_KEY'),
              },
            },
          )
          .pipe(
            tap((response) => console.log(response)),
            map((response) => response.data),
          ),
      );
    } catch (error) {
      this.logger.error(Object.keys(error));
      this.logger.error(
        'Response',
        JSON.stringify(error.response.data, null, 2),
      );
    }
  }

  private getSignature(message: string): string {
    return createHmac('sha256', this.configService.get<string>('SECRET_KEY'))
      .update(message)
      .digest('hex');
  }
}

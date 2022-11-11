export interface UserTradeHistory {
  code: string;
  message: string;
  data: Datum[];
  total: number;
  success: boolean;
}

export interface Datum {
  orderNumber: string;
  advNo: string;
  tradeType: string;
  asset: string;
  fiat: string;
  fiatSymbol: string;
  amount: string;
  totalPrice: string;
  unitPrice: string;
  orderStatus: string;
  createTime: number;
  commission: string;
  counterPartNickName: string;
  advertisementRole: string;
}

export interface UserTradeHistoryResponse {
  data: UserTradeHistory;
}

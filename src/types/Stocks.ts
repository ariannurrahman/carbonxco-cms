export interface StockParams {
  pagination: {
    limit: number;
    page: number;
  };
  id: string;
}

export interface GetStocksResponse {
  data: Stock[];
  metadata: { total_items: number };
  trace_id: string;
}

export interface Stock {
  buy_price: number;
  created_at: number;
  expired_date: number | null;
  id: string;
  lot_number: string;
  quantity: number;
  quantity_type: string;
}

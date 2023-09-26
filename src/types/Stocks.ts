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
  expired_date: null | number;
  id: string;
  item: StockItem;
  lot_number: string;
  quantity: number;
}

export interface StockItem {
  id: string;
  name: string;
  packaging_type: string;
  packaging_volume: number;
  serial_number: string;
  supplier_name: string;
}

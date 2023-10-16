export interface StockItemParams {
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
  exchange_rate?: number;
}

export interface UpdateStock {
  expired_date: number;
  quantity: number;
  id: string;
  exchange_rate?: number;
}

export interface StockItem {
  id: string;
  name: string;
  packaging_type: string;
  packaging_volume: number;
  serial_number: string;
  supplier_name: string;
}

export interface StocksParams {
  pagination: {
    limit: number;
    page: number;
  };
  query: StockSearchQuery;
}

export interface StockSearchQuery {
  query_item_name: string;
  query_item_supplier_name: string;
}

export interface StockModalProps {
  isLoadingSubmit?: boolean;
  type: StockModalType;
  onSubmit: (value: Stock) => void;
  onCancel: () => void;
  isOpen: boolean;
  selectedStockModal?: Stock;
}

export type StockModalType = 'create' | 'update' | 'delete' | undefined;

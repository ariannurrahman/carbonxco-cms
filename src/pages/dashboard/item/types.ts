export interface TableDataProps {
  item_name?: string;
  serial_number?: string;
  supplier_name?: string;
  id?: string;
}

export interface SearchQuery {
  item_name?: string;
  item_supplier_name?: string;
}

export interface ItemTableParams {
  pagination: {
    page: number;
    limit: number;
  };
  query: SearchQuery;
}

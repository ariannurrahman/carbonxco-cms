export interface SearchQuery {
  item_supplier_name?: string;
  item_name?: string;
}

export interface QueryParams {
  pagination: {
    page: number;
    limit: number;
  };
  query: SearchQuery;
}

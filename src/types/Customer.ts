export interface CustomerGetAllResponse {
  data: Customer[];
  metadata: Metadata;
  trace_id: string;
}

export interface Customer {
  id: string;
  name: string;
  payment_term: string;
  address: string;
  invoice_address: string;
  block_status: string;
}

export interface UpdateCustomerModal {
  id: string;
  value: Customer;
}

export interface Metadata {
  current_page: number;
  item_from: number;
  item_to: number;
  limit: number;
  next_page: null;
  previous_page: null;
  total_items: number;
  total_pages: number;
}

export interface CustomerQueryParams {
  pagination: {
    page: number;
    limit: number;
  };
  query: CustomerSearchQuery;
}

export interface CustomerSearchQuery {
  query_customer_name: string;
}

export interface CreateCustomerPayload {
  address: string;
  invoice_address: string;
  name: string;
  payment_term: number;
}

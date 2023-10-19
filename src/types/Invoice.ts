export interface InvoiceParams {
  pagination: {
    limit: number;
    page: number;
  };
  query: InvoiceSearchQuery;
}

export interface InvoiceSearchQuery {
  query_customer_name: string;
  query_po_number: string;
}

export interface InvoiceResponse {
  data: Invoice[];
  metadata: Metadata;
  trace_id: string;
}

export interface InvoicePayload {
  invoice_po_item_id: string;
  quantity: number;
}

export interface CreateInvoicePayload {
  id?: string;
  invoice_items: InvoicePayload[];
}

export interface Invoice {
  id: string;
  customer: Customer;
  exchange_rate: number;
  po_number: string;
  total_price: number;
}

export interface Customer {
  id: string;
  name: string;
  payment_term: number;
  address: string;
  invoice_address: string;
  block_status: boolean;
  pic: string;
}

export interface Metadata {
  total_items: number;
  total_pages: number;
  item_from: number;
  item_to: number;
  current_page: number;
  limit: number;
  next_page: null;
  previous_page: null;
}

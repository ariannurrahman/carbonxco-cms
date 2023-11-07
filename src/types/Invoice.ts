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

export interface UpdateInvoicePayload {
  exchange_rate: number;
}

export interface UpdateInvoiceItemPayload {
  quantity: number;
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

export interface InvoiceDetailResponseRoot {
  data: Data;
  trace_id: string;
}

export interface Data {
  invoice: InvoiceDetail;
  invoice_items: InvoiceItem[];
}

export interface InvoiceDetail {
  customer: Customer;
  due_date: number;
  exchange_rate: number;
  id: string;
  invoice_po: InvoicePo;
  paid_date: null;
  po_number: string;
  print_date: null;
  status: string;
  total_price: number;
  travel_permit_number: string;
}

export interface InvoicePo {
  customer: Customer;
  exchange_rate: number;
  id: string;
  po_number: string;
  total_price: number;
}

export interface InvoiceItem {
  id: string;
  invoice_po_item?: InvoiceItem;
  item: Item;
  price: number;
  quantity: number;
}

export interface Item {
  id: string;
  name: string;
  packaging_type: string;
  packaging_volume: number;
  serial_number: string;
  supplier_name: string;
}

export interface CheckInvoiceResponse {
  data: {
    total_price: number;
    total_due: number;
  };
}

export interface InvoicePoUpdatePayload {
  exchange_rate: number;
  po_number: string;
  id?: string;
}

export interface InvoicePoCreatePayload {
  customer_id: string;
  exchange_rate: number;
  po_number: string;
  invoice_po_items: InvoicePoItems[];
}

export interface InvoicePoItems {
  price: number;
  item_id: string;
  quantity: number;
  id?: string;
}

export interface InvoicePoItemsDetail {
  id: string;
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

export interface InvoicePoResponse {
  data: Invoice[];
  metadata: Metadata;
  trace_id: string;
}

export interface InvoicePoDetailResponse {
  data: InvoiceDetail;
  trace_id: string;
}

export interface InvoiceDetail {
  invoice_po: Invoice;
  invoice_po_items: InvoicePoItemsDetail[];
}

export interface Invoice {
  customer: Customer;
  exchange_rate: number;
  id: string;
  po_number: string;
  total_price: number;
}

export interface Customer {
  address: string;
  block_status: boolean;
  id: string;
  invoice_address: string;
  name: string;
  payment_term: number;
  pic: string;
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

export interface InvoicePoParams {
  pagination: {
    limit: number;
    page: number;
  };
  query: InvoicePoSearchQuery;
}

export interface InvoicePoSearchQuery {
  query_customer_name: string;
  query_po_number: string;
}

export type InvoicePoModalType = 'create' | 'update' | 'delete' | undefined;

export interface InvoicePoUpdateModalProps {
  isLoadingSubmit?: boolean;
  type: string;
  onSubmit: (value: InvoicePoUpdatePayload) => void;
  onCancel: () => void;
  isOpen: boolean;
}

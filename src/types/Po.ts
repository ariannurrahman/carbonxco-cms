import { SearchQuery } from './types';

export type currencyType = 'IDR' | 'USD';
export interface PoPayload {
  supplier_name: string;
  supplier_address_id: string;
  currency_type: currencyType;
  exchange_rate: number;
  po_number: string;
  po_items: PoItems[];
}

export interface PoDetail {
  data: {
    po_order: POTableDataProps;
    po_items: {
      buy_price: number;
      id: string;
      item: { id: string; name: string; serial_number: string; supplier_name: string };
      lot_number: string;
      quantity: number;
      packaging_type: string;
    }[];
  };
  trace_id: string;
}

export interface PoItems {
  buy_price: number;
  item_id: string;
  lot_number: string;
  quantity: number;
  quantity_type: number | string;
  id: string;
}

export interface ChangeStatusPoPayload {
  eta?: number;
  etd?: number;
  id: string;
  exchange_rate?: number;
  type: ModalType;
}

export interface ResponseDetailPo {
  data: {
    po_items: {
      lot_number: string;
      quantity: number;
      buy_price: number;
      quantity_type: string;
      id: string;
      item: {
        id: string;
        name: string;
        serial_number: string;
        supplier_name: string;
      };
    }[];
    po_orders: {
      eta: number | null;
      etd: number | null;
      id: string;
      status: string;
      supplier_name: string;
    };
  };
}

export interface POTableDataProps {
  eta: string;
  etd: string;
  status: string;
  supplier_name: string;
  id: string;
  po_number: string;
  currency_type: string;
  exchange_rate: number;
  supplier_address: {
    address: string;
    fax: string;
    id: string;
    phone: string;
    pic: string;
    supplier_name: string;
  };
}

export interface PoResponse {
  data: POTableDataProps[];
  metadata?: { total_items: number };
}

export interface PoTableParams {
  pagination: {
    page: number;
    limit: number;
  };
  query: SearchQuery;
}

export interface ConfirmFormProps {
  eta?: number;
  etd?: number;
}
export interface PaidForm {
  exchange_rate?: number;
}

export interface ChangeModalStatusProps {
  isOpen: boolean;
  type: ModalType;
  onCancelModal: () => void;
  onSubmit: (form: ConfirmFormProps & PaidForm, str: ModalType) => void;
  isLoadingSubmit: boolean;
  currentExchangeRate?: number;
}

export type ModalType = 'confirm' | 'cancel' | 'complete' | 'paid';

export type Status = 'draft' | 'canceled' | 'confirm' | 'completed' | 'paid';

export type PoState = 'create' | 'edit' | 'view';

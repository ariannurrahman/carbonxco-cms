import { SearchQuery } from './types';

export interface PoPayload {
  supplier_name: string;
  po_items: {
    buy_price: number;
    item_id: string;
    lot_number: string;
    quantity: number;
    quantity_type: number | string;
  }[];
}

export interface ChangeStatusPoPayload {
  eta?: number;
  etd?: number;
  id: string;
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
  eta: number;
  etd: number;
}

export interface ChangeModalStatusProps {
  isOpen: boolean;
  type: ModalType;
  onCancelModal: () => void;
  onSubmit: (form: ConfirmFormProps, str: ModalType) => void;
  isLoadingSubmit: boolean;
}

export type ModalType = 'confirm' | 'cancel' | 'complete';

export type Status = 'draft' | 'canceled' | 'confirm' | 'completed';

export type PoState = 'create' | 'edit';

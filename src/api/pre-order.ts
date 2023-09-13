import VIPApi from 'api';
import { ItemTableParams } from 'pages/dashboard/item/types';
import { ModalType, PoResponse } from 'pages/dashboard/pre-order/types';

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

export const getPreOrder = async ({ pagination, query }: ItemTableParams) => {
  const { page = 1, limit = 5 } = pagination;
  const { item_name = '', item_supplier_name = '' } = query;
  const response = await VIPApi.get<PoResponse>(
    `po_orders?page=${page}&limit=${limit}&query_item_name=${item_name}&query_item_supplier_name=${item_supplier_name}`,
  );
  return response.data;
};

export const createPO = async (payload: PoPayload) => {
  const response = await VIPApi.post('/po_orders', payload);
  return response.data;
};

export const changeStatusPO = async ({ eta, etd, id, type }: ChangeStatusPoPayload) => {
  const response = await VIPApi.post(`/po_orders/${id}/${type}`, { eta, etd });
  return response.data;
};

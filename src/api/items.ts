import VIPApi from 'api';
import { ItemTableParams } from 'pages/dashboard/item/types';

export interface ResponseItem {
  data: Item[];
  metadata?: { total_items: number };
}

export interface ItemDetail {
  data: Item;
}

export interface Item {
  name: string;
  supplier_name: string;
  serial_number: string;
  id?: string;
}

export const getAllItem = async ({ pagination, query }: ItemTableParams) => {
  const { page = 1, limit = 15 } = pagination;
  const { item_name = '', item_supplier_name = '' } = query;
  const response = await VIPApi.get<ResponseItem>(
    `items?page=${page}&limit=${limit}&query_item_name=${item_name}&query_item_supplier_name=${item_supplier_name}`,
  );
  return response.data;
};

export const getItem = async (id: string) => {
  const response = await VIPApi.get<ItemDetail>(`items/${id}`);
  return response.data;
};

export const createItem = async (payload: Item) => {
  const response = await VIPApi.post<Item>('items', payload);
  return response.data;
};
export const updateItem = async (payload: Item) => {
  const response = await VIPApi.put(`/items/${payload.id}`, payload);
  return response.data;
};

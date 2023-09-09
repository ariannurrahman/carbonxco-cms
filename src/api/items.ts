import VIPApi from 'api';

interface ItemsProps {
  pagination: {
    page: number;
    limit: number;
  };
  query: {
    query_item_name: string;
    query_item_supplier_name: string;
  };
}

export interface CreateItemPayload {
  name: string;
  supplier_name: string;
  serial_number: string;
}

export const getAllItem = async ({ pagination, query }: ItemsProps) => {
  const { page = 1, limit = 15 } = pagination;
  const { query_item_name = '', query_item_supplier_name = '' } = query;
  const response = await VIPApi.get(
    `items?page=${page}&limit=${limit}&query_item_name=${query_item_name}&query_item_supplier_name=${query_item_supplier_name}`,
  );
  return response.data;
};

export const getItem = async (id: string) => {
  const response = await VIPApi.get(`items/${id}`);
  return response.data;
};

export const createItem = async (payload: CreateItemPayload) => {
  const response = await VIPApi.post('items', payload);
  return response.data;
};
export const updateItem = async (payload: CreateItemPayload) => {
  const response = await VIPApi.put('items', payload);
  return response.data;
};

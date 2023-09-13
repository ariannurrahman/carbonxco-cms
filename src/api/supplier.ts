import VIPApi from 'api';
import { ItemTableParams } from 'pages/dashboard/item/types';

export interface Supplier {
  data: string[];
}

export const getSuppliers = async ({ pagination, query }: ItemTableParams) => {
  const { page = 1, limit = 99 } = pagination;
  const { item_name = '', item_supplier_name = '' } = query;
  const response = await VIPApi.get<Supplier>(
    `items/suppliers?page=${page}&limit=${limit}&query_item_name=${item_name}&query_item_supplier_name=${item_supplier_name}`,
  );
  return response.data;
};

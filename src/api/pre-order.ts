import VIPApi from 'api';
import { ChangeStatusPoPayload, PoDetail, PoItems, PoPayload, PoResponse, PoTableParams } from 'types/Po';

export const getPreOrder = async ({ pagination, query }: PoTableParams) => {
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

export const changeStatusPO = async ({ exchange_rate, eta, etd, id, type }: ChangeStatusPoPayload) => {
  if (type === 'paid') {
    const response = await VIPApi.post(`/po_orders/${id}/paid`, { exchange_rate });
    return response.data;
  } else {
    const response = await VIPApi.post(`/po_orders/${id}/${type}`, { eta, etd });
    return response.data;
  }
};

export const getDetailPreOrder = async (id: string) => {
  const response = await VIPApi.get<PoDetail>(`/po_orders/${id}`);
  return response.data;
};

export const updatePoItem = async (id: string, payload: PoItems) => {
  const response = await VIPApi.put(`/po_items/${id}`, payload);
  return response.data;
};

export const createItemPo = async (preOrderId: string, payload: PoItems) => {
  const response = await VIPApi.post(`po_orders/${preOrderId}/po_items`, payload);
  return response.data;
};

export const deletePoItem = async (id: string) => {
  const response = await VIPApi.delete(`/po_items/${id}`);
  return response.data;
};

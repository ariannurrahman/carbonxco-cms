import VIPApi from 'api';
import {
  InvoicePoCreatePayload,
  InvoicePoDetailResponse,
  InvoicePoItems,
  InvoicePoParams,
  InvoicePoResponse,
  InvoicePoUpdatePayload,
} from 'types/InvoicePo';

export const getInvoicePo = async ({ pagination, query }: InvoicePoParams) => {
  const { page = 1, limit = 5 } = pagination;
  const { query_customer_name = '', query_po_number = '' } = query;
  const response = await VIPApi.get<InvoicePoResponse>(
    `invoice_pos?limit=${limit}&page=${page}&query_customer_name=${query_customer_name}&query_po_number=${query_po_number}`,
  );
  return response.data;
};

export const createInvoicePo = async (payload: InvoicePoCreatePayload) => {
  const response = await VIPApi.post('invoice_pos', payload);
  return response.data;
};

export const updateInvoicePo = async (id: string, payload: InvoicePoUpdatePayload) => {
  const response = await VIPApi.put(`invoice_pos/${id}`, payload);
  return response.data;
};

export const updateInvoicePoItem = async (id: string, payload: InvoicePoItems) => {
  if (payload.id) {
    delete payload.id;
  }
  const response = await VIPApi.put(`invoice_po_items/${id}`, payload);
  return response.data;
};

export const getInvoicePoDetail = async (id: string) => {
  const response = await VIPApi.get<InvoicePoDetailResponse>(`invoice_pos/${id}`);
  return response.data;
};

export const createItemInvoicePo = async (id: string, payload: InvoicePoUpdatePayload) => {
  const response = await VIPApi.post(`/invoice_pos/${id}/invoice_po_items`, payload);
  return response.data;
};

export const removeItemInvoicePo = async (id: string) => {
  const response = await VIPApi.delete(`/invoice_po_items/${id}`);
  return response.data;
};

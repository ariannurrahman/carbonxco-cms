import VIPApi from 'api';
import { InvoiceDetailResponseRoot, InvoiceParams, InvoiceResponse, UpdateInvoicePayload } from 'types/Invoice';

export const getInvoice = async ({ pagination, query }: InvoiceParams) => {
  const { page = 1, limit = 5 } = pagination;
  const { query_customer_name = '', query_po_number = '' } = query;
  const response = await VIPApi.get<InvoiceResponse>(
    `/invoices?limit=${limit}&page=${page}&query_customer_name=${query_customer_name}&query_po_number=${query_po_number}`,
  );
  return response.data;
};

export const updateInvoice = async (id: string, payload: UpdateInvoicePayload) => {
  const response = await VIPApi.put(`invoices/${id}`, payload);
  return response.data;
};

export const createInvoiceItem = async (invId: string, id: string, payload: number) => {
  const response = await VIPApi.post(`invoices/${invId}/invoice_items`, { invoice_po_item_id: id, quantity: payload });
  return response.data;
};

export const updateInvoiceItem = async (id: string, payload: number) => {
  const response = await VIPApi.put(`invoice_items/${id}`, { quantity: payload });
  return response.data;
};

export const deleteInvoiceItem = async (id: string) => {
  const response = await VIPApi.delete(`invoice_items/${id}`);
  return response.data;
};

export const getInvoiceDetail = async (id: string) => {
  const response = await VIPApi.get<InvoiceDetailResponseRoot>(`/invoices/${id}`);
  return response.data;
};

export const createInvoice = async (id: string, payload: any) => {
  const response = await VIPApi.post(`/invoice_pos/${id}/invoices`, payload);
  return response.data;
};

export const payInvoice = async (id: string) => {
  const response = await VIPApi.post(`invoices/${id}/pay`);
  return response.data;
};

export const printInvoice = async (id: string, force: boolean) => {
  const isForce = force ? '?force_print_invoice=true' : '';
  const response = await VIPApi.post(`invoices/${id}/print${isForce}`);
  return response.data;
};

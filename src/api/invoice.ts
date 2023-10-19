import VIPApi from 'api';
import { InvoiceParams, InvoiceResponse } from 'types/Invoice';

export const getInvoice = async ({ pagination, query }: InvoiceParams) => {
  const { page = 1, limit = 5 } = pagination;
  const { query_customer_name = '', query_po_number = '' } = query;
  const response = await VIPApi.get<InvoiceResponse>(
    `/invoices?limit=${limit}&page=${page}&query_customer_name=${query_customer_name}&query_po_number=${query_po_number}`,
  );
  return response.data;
};

export const createInvoice = async (id: string, payload: any) => {
  const response = await VIPApi.post(`/invoice_pos/${id}/invoices`, payload);
  return response.data;
};

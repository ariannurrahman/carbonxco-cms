import VIPApi from 'api';
import { GetStocksResponse, Stock, StockItemParams, StocksParams, UpdateStock } from 'types/Stocks';

export const getItemStocks = async ({ pagination, id }: StockItemParams) => {
  const { page = 1, limit = 5 } = pagination;
  const response = await VIPApi.get<GetStocksResponse>(`/items/${id}/stocks?page=${page}&limit=${limit}`);
  return response.data;
};

export const createStock = async (payload: Stock) => {
  const response = await VIPApi.post(`/stocks`, payload);
  return response.data;
};
export const updateStock = async (id: string, payload: UpdateStock) => {
  const modifiedPayload = {
    expired_date: payload.expired_date ?? 0,
    quantity: payload.quantity,
  };
  const response = await VIPApi.put(`/stocks/${id}`, modifiedPayload);
  return response.data;
};
export const deleteStock = async (id: string) => {
  const response = await VIPApi.delete(`/stocks/${id}`);
  return response.data;
};
export const getStocks = async ({ pagination, query }: StocksParams) => {
  const { page = 1, limit = 5 } = pagination;
  const { query_item_name = '', query_item_supplier_name = '' } = query;
  const response = await VIPApi.get<GetStocksResponse>(
    `stocks?page=${page}&limit=${limit}&query_item_name=${query_item_name}&query_item_supplier_name=${query_item_supplier_name}`,
  );
  return response.data;
};

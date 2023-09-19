import VIPApi from 'api';
import { GetStocksResponse, StockParams } from 'types/Stocks';

export const getStocks = async ({ pagination, id }: StockParams) => {
  const { page = 1, limit = 5 } = pagination;
  const response = await VIPApi.get<GetStocksResponse>(`/items/${id}/stocks?page=${page}&limit=${limit}`);
  return response.data;
};

export const updateStock = async (id: string, payload: any) => {
  const response = await VIPApi.put(`/stocks/${id}`, payload);
  return response.data;
};
export const deleteStock = async (id: string) => {
  const response = await VIPApi.delete(`/stocks/${id}`);
  return response.data;
};

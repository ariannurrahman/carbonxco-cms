import { CarbonxApi } from 'api';
import { FaqPayload } from 'pages/dashboard/faq/types';
import { Pagination } from 'types/Pagination';

export const getFaqs = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/faqs?page=${page}&limit=${limit}`);
};

export const getFaqDetail = async (id: string) => {
  return await CarbonxApi.get(`/faqs/${id}`);
};

export const postFaq = (payload: FaqPayload) => {
  return CarbonxApi.post('/faqs', payload);
};

export const updateFaq = (id: string, payload: FaqPayload) => {
  return CarbonxApi.put(`/faqs/${id}`, payload);
};

export const deleteFaq = (id: string) => {
  return CarbonxApi.delete(`/faqs/${id}`);
};

import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';

export const getFaqs = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/faqs?page=${page}&limit=${limit}`);
};

import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';

export const getContactUs = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/contact-us?page=${page}&limit=${limit}`);
};

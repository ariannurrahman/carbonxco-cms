import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';

export const getNews = (pagination: Pagination) => {
  const { limit, page } = pagination;

  return CarbonxApi.get(`/blogs?page=${page}&limit=${limit}`);
};

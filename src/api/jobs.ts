import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';

export const getJobs = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/jobs?page=${page}&limit=${limit}`);
};

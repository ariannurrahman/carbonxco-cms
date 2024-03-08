import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';

export const getProjects = (pagination: Pagination) => {
  const { limit, page } = pagination;

  return CarbonxApi.get(`/projects?page=${page}&limit=${limit}`);
};

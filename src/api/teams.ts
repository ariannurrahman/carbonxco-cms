import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';

export const getTeams = (pagination: Pagination) => {
  const { limit, page } = pagination;

  return CarbonxApi.get(`/teams?page=${page}&limit=${limit}`);
};

import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';

export const getApplicants = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/applicants?page=${page}&limit=${limit}`);
};

export const deleteApplicant = (id: string) => {
  return CarbonxApi.delete(`/applicants/${id}`);
};

import { CarbonxApi } from 'api';
import { Job } from 'pages/dashboard/opportunity/types';
import { Pagination } from 'types/Pagination';

export const getJobs = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/jobs?page=${page}&limit=${limit}`);
};

export const getJobDetail = (id: string) => {
  return CarbonxApi.get(`/jobs/${id}`);
};

export const postJob = (payload: Job) => {
  return CarbonxApi.post('/jobs', payload);
};

export const updateJob = (id: string, payload: Job) => {
  return CarbonxApi.put(`/jobs/${id}`, payload);
};

export const deleteJob = (id: string) => {
  return CarbonxApi.delete(`/jobs/${id}`);
};

import { CarbonxApi } from 'api';
import { Project } from 'pages/dashboard/projects/types';
import { Pagination } from 'types/Pagination';

export const getProjects = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/projects?page=${page}&limit=${limit}`);
};

export const getProjectDetail = (id: string) => {
  return CarbonxApi.get(`/projects/${id}`);
};

export const postProject = (payload: Project) => {
  return CarbonxApi.post('/projects', payload);
};

export const updateProject = (id: string, payload: Project) => {
  return CarbonxApi.put(`/projects/${id}`, payload);
};

export const deleteProject = (id: string) => {
  return CarbonxApi.delete(`/projects/${id}`);
};

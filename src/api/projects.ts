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
  const updatePayload = { ...payload };
  delete updatePayload.featuredImage;
  delete updatePayload.gallery;
  delete updatePayload.projectMap;

  return CarbonxApi.post('/projects', updatePayload);
};

export const updateProject = (id: string, payload: Project) => {
  return CarbonxApi.put(`/projects/${id}`, payload);
};

export const deleteProject = (id: string) => {
  return CarbonxApi.delete(`/projects/${id}`);
};

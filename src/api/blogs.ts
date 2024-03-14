import { CarbonxApi } from 'api';
import { Pagination } from 'types/Pagination';
import { News } from 'pages/dashboard/news/types';

export const getBlogs = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/blogs?page=${page}&limit=${limit}`);
};

export const getBlogDetail = (id: string) => {
  return CarbonxApi.get(`/blogs/${id}`);
};

export const postBlog = (payload: News) => {
  return CarbonxApi.post('/blogs', payload);
};

export const updateBlog = (id: string, payload: News) => {
  return CarbonxApi.put(`/blogs/${id}`, payload);
};

export const deleteBlog = (id: string) => {
  return CarbonxApi.delete(`/blogs/${id}`);
};

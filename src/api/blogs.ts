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
  const updatedPayload = { ...payload };
  const documents = updatedPayload.featuredImage?.map((eachDoc) => {
    return {
      ...eachDoc,
      document_type: 'blog_thumbnail',
      // @ts-expect-error: id does exist (?)
      id: eachDoc.id ?? '',
    };
  });
  delete updatedPayload.featuredImage;
  return CarbonxApi.post('/blogs', { ...updatedPayload, documents });
};

export const updateBlog = (id: string, payload: News) => {
  const updatedPayload = { ...payload };
  const documents = updatedPayload.featuredImage?.map((eachDoc) => {
    return {
      ...eachDoc,
      document_type: 'blog_thumbnail',
      // @ts-expect-error: id does exist (?)
      id: eachDoc.id ?? '',
    };
  });
  delete updatedPayload.featuredImage;
  console.log('{ ...updatedPayload, documents }', { ...updatedPayload, documents });
  return CarbonxApi.put(`/blogs/${id}`, { ...updatedPayload, documents });
};

export const deleteBlog = (id: string) => {
  return CarbonxApi.delete(`/blogs/${id}`);
};

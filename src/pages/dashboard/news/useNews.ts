import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBlog, getBlogDetail, getBlogs, postBlog, updateBlog } from 'api/blogs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'types/Pagination';
import { ActionType } from 'types/types';
import { News } from './types';
import { message } from 'antd';

interface useNewsProps {
  id?: string | undefined;
  action?: ActionType;
}

export const useNews = (props: useNewsProps) => {
  const id = props?.id ?? '';
  const action = props?.action ?? 'view';

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
  });

  const { isLoading: isLoadingNews, data: news } = useQuery({
    queryFn: () => getBlogs(params),
    queryKey: ['news', params],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: action === 'view',
  });

  const { isLoading: isLoadingNewsDetail, data: newsDetail } = useQuery({
    queryFn: () => getBlogDetail(id ?? ''),
    queryKey: ['news-detail', id],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: action === 'edit',
  });

  const createNewsMutation = useMutation({
    mutationKey: ['create-news'],
    mutationFn: (payload: News) => {
      return postBlog(payload);
    },
    onSuccess: () => {
      message.success('Create news success!');
      queryClient.invalidateQueries(['news']);
      // navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const updateNewsMutation = useMutation({
    mutationKey: ['update-news'],
    mutationFn: ({ id, payload }: { id: string; payload: News }) => {
      return updateBlog(id, payload);
    },
    onSuccess: () => {
      message.success('Update news success!');
      queryClient.invalidateQueries(['news']);
      navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const deleteNewsMutation = useMutation({
    mutationKey: ['delete-news'],
    mutationFn: (id: string) => {
      return deleteBlog(id);
    },
    onSuccess: () => {
      message.success('Delete news success!');
      queryClient.invalidateQueries(['news']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onTableChange = (event: any) => {
    let paginationPayload = { ...params };
    paginationPayload = {
      page: event.current,
      limit: 15,
    };
    setParams(paginationPayload);
    queryClient.invalidateQueries();
  };

  return {
    news,
    isLoadingNews,
    setParams,
    onTableChange,
    isLoadingNewsDetail,
    newsDetail,
    createNewsMutation,
    updateNewsMutation,
    deleteNewsMutation,
  };
};

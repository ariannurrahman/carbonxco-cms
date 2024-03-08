import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getNews } from 'api/news';
import { useState } from 'react';
import { Pagination } from 'types/Pagination';

export const useNews = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
  });

  const { isLoading: isLoadingNews, data: news } = useQuery({
    queryFn: () => getNews(params),
    queryKey: ['news', params],
    refetchOnWindowFocus: false,
    retry: false,
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

  return { news, isLoadingNews, setParams, onTableChange };
};

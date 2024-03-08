import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFaqs } from 'api/faqs';
import { useState } from 'react';
import { Pagination } from 'types/Pagination';

export const useFaqs = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
  });

  const { isLoading: isLoadingFaqs, data: faqs } = useQuery({
    queryFn: () => getFaqs(params),
    queryKey: ['faqs', params],
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

  return { faqs, isLoadingFaqs, onTableChange };
};

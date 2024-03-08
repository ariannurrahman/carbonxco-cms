import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getJobs } from 'api/jobs';
import { useState } from 'react';
import { Pagination } from 'types/Pagination';

export const useJobs = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
  });

  const { isLoading: isLoadingJobs, data: jobs } = useQuery({
    queryFn: () => getJobs(params),
    queryKey: ['jobs', params],
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

  return { jobs, isLoadingJobs, onTableChange };
};

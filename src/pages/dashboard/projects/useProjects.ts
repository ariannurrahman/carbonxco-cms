import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects } from 'api/projects';
import { useState } from 'react';
import { Pagination } from 'types/Pagination';

export const useProjects = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
  });

  const { isLoading: isLoadingProjects, data: projects } = useQuery({
    queryFn: () => getProjects(params),
    queryKey: ['projects', params],
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

  return { projects, isLoadingProjects, onTableChange };
};

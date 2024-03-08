import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTeams } from 'api/teams';
import { useState } from 'react';
import { Pagination } from 'types/Pagination';

export const useTeams = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
  });

  const { isLoading: isLoadingTeams, data: teams } = useQuery({
    queryFn: () => getTeams(params),
    queryKey: ['teams', params],
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

  return { teams, isLoadingTeams, onTableChange };
};

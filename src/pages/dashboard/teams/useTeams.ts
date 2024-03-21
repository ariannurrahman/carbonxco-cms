import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTeam, getTeamDetail, getTeams, postTeam, updateTeam } from 'api/teams';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'types/Pagination';
import { ActionType } from 'types/types';
import { Team } from './types';
import { message } from 'antd';

interface useTeamsProps {
  id?: string | undefined;
  action?: ActionType;
}

export const useTeams = (props: useTeamsProps) => {
  const id = props?.id ?? '';
  const action = props?.action ?? 'view';
  const navigate = useNavigate();
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
    enabled: action === 'view',
  });

  const { isLoading: isLoadingTeamDetail, data: teamDetail } = useQuery({
    queryFn: () => getTeamDetail(id ?? ''),
    queryKey: ['team-detail', id],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: action === 'edit',
  });

  const createTeamMutation = useMutation({
    mutationKey: ['create-team'],
    mutationFn: (payload: Team) => {
      return postTeam(payload);
    },
    onSuccess: () => {
      message.success('Create team success!');
      queryClient.invalidateQueries(['teams']);
      navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const updateTeamMutation = useMutation({
    mutationKey: ['update-team'],
    mutationFn: ({ id, payload }: { id: string; payload: Team }) => {
      return updateTeam(id, payload);
    },
    onSuccess: () => {
      message.success('Update team success!');
      queryClient.invalidateQueries(['teams']);
      navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const deleteTeamMutation = useMutation({
    mutationKey: ['delete-team'],
    mutationFn: (id: string) => {
      return deleteTeam(id);
    },
    onSuccess: () => {
      message.success('Delete team success!');
      queryClient.invalidateQueries(['teams']);
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
    teams,
    isLoadingTeams,
    onTableChange,
    isLoadingTeamDetail,
    teamDetail,
    createTeamMutation,
    updateTeamMutation,
    deleteTeamMutation,
  };
};

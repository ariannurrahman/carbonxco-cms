import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProject, getProjectDetail, getProjects, postProject, updateProject } from 'api/projects';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'types/Pagination';
import { ActionType } from 'types/types';
import { Project } from './types';
import { message } from 'antd';

interface useProjectProps {
  id?: string | undefined;
  action?: ActionType;
}

export const useProjects = (props: useProjectProps) => {
  const id = props?.id ?? '';
  const action = props?.action ?? 'view';
  const navigate = useNavigate();
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
    enabled: action === 'view',
  });

  const { isLoading: isLoadingProjectDetail, data: projectDetail } = useQuery({
    queryFn: () => getProjectDetail(id ?? ''),
    queryKey: ['project-detail', id],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: action === 'edit',
  });

  const createProjectMutation = useMutation({
    mutationKey: ['create-project'],
    mutationFn: (payload: Project) => {
      return postProject(payload);
    },
    onSuccess: () => {
      message.success('Create project success!');
      // queryClient.invalidateQueries(['projects']);
      // navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const updateProjectMutation = useMutation({
    mutationKey: ['update-project'],
    mutationFn: ({ id, payload }: { id: string; payload: Project }) => {
      return updateProject(id, payload);
    },
    onSuccess: () => {
      message.success('Update project success!');
      queryClient.invalidateQueries(['projects']);
      navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationKey: ['delete-faq'],
    mutationFn: (id: string) => {
      return deleteProject(id);
    },
    onSuccess: () => {
      message.success('Delete project success!');
      queryClient.invalidateQueries(['projects']);
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
    projects,
    isLoadingProjects,
    onTableChange,
    isLoadingProjectDetail,
    projectDetail,
    createProjectMutation,
    updateProjectMutation,
    deleteProjectMutation,
  };
};

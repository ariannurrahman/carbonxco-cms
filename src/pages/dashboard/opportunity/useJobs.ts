import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteJob, getJobDetail, getJobs, postJob, updateJob } from 'api/jobs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'types/Pagination';
import { ActionType } from 'types/types';
import { Job } from './types';
import { message } from 'antd';

interface useJobsProps {
  id?: string | undefined;
  action?: ActionType;
}

export const useJobs = (props: useJobsProps) => {
  const id = props?.id ?? '';
  const action = props?.action ?? 'view';
  const navigate = useNavigate();
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

  const { isLoading: isLoadingJobDetail, data: jobDetail } = useQuery({
    queryFn: () => getJobDetail(id ?? ''),
    queryKey: ['job-detail', id],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: action === 'edit',
  });

  const createJobMutation = useMutation({
    mutationKey: ['create-job'],
    mutationFn: (payload: Job) => {
      return postJob(payload);
    },
    onSuccess: () => {
      message.success('Create job success!');
      queryClient.invalidateQueries(['jobs']);
      navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const updateJobMutation = useMutation({
    mutationKey: ['update-job'],
    mutationFn: ({ id, payload }: { id: string; payload: Job }) => {
      return updateJob(id, payload);
    },
    onSuccess: () => {
      message.success('Update job success!');
      queryClient.invalidateQueries(['jobs']);
      navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const deleteJobMutation = useMutation({
    mutationKey: ['delete-job'],
    mutationFn: (id: string) => {
      return deleteJob(id);
    },
    onSuccess: () => {
      message.success('Delete job success!');
      queryClient.invalidateQueries(['jobs']);
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
    jobs,
    isLoadingJobs,
    onTableChange,
    isLoadingJobDetail,
    jobDetail,
    createJobMutation,
    updateJobMutation,
    deleteJobMutation,
  };
};

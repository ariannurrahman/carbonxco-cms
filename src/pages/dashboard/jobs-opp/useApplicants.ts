import { useState } from 'react';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Pagination } from 'types/Pagination';
import { ActionType } from 'types/types';
import { deleteApplicant, getApplicants } from 'api/applicant';

interface useApplicantsProps {
  action?: ActionType;
}

export const useApplicants = (props: useApplicantsProps) => {
  const action = props?.action ?? 'view';
  const queryClient = useQueryClient();

  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
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

  const { isLoading: isLoadingApplicants, data: applicants } = useQuery({
    queryFn: () => getApplicants(params),
    queryKey: ['applicants', params],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: action === 'view',
  });

  const deleteApplicantMutation = useMutation({
    mutationKey: ['delete-applicant'],
    mutationFn: (id: string) => {
      return deleteApplicant(id);
    },
    onSuccess: () => {
      message.success('Delete applicant success!');
      queryClient.invalidateQueries(['applicants']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  return {
    onTableChange,
    isLoadingApplicants,
    applicants,
    deleteApplicantMutation,
  };
};

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { deleteContactUs, getContactUs } from 'api/contact-us';
import { useState } from 'react';
import { Pagination } from 'types/Pagination';

export const useContactUs = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
  });

  const { isLoading: isLoadingContactUs, data: contactUs } = useQuery({
    queryFn: () => getContactUs(params),
    queryKey: ['contact-us', params],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const deleteNewsMutation = useMutation({
    mutationKey: ['delete-news'],
    mutationFn: (id: string) => {
      return deleteContactUs(id);
    },
    onSuccess: () => {
      message.success('Delete message success!');
      queryClient.invalidateQueries(['contact-us']);
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

  return { contactUs, isLoadingContactUs, onTableChange, deleteNewsMutation };
};

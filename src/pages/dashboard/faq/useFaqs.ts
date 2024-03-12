import { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteFaq, getFaqDetail, getFaqs, postFaq, updateFaq } from 'api/faqs';
import { Pagination } from 'types/Pagination';
import { FaqPayload } from './types';
import { ActionType } from 'types/types';

interface useFaqsProps {
  id?: string | undefined;
  action?: ActionType;
}

export const useFaqs = (props: useFaqsProps) => {
  const id = props?.id ?? '';
  const action = props?.action ?? 'view';

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [params, setParams] = useState<Pagination>({
    limit: 15,
    page: 1,
  });

  const { isLoading: isLoadingFaqs, data: faqs } = useQuery({
    queryFn: () => getFaqs(params),
    queryKey: ['faqs', params],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: action === 'view',
  });

  const { isLoading: isLoadingFaqsDetail, data: faqsDetail } = useQuery({
    queryFn: () => getFaqDetail(id ?? ''),
    queryKey: ['faq-detail', id],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: action === 'edit',
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

  const createFaqMutation = useMutation({
    mutationKey: ['create-faq'],
    mutationFn: (value: FaqPayload) => {
      return postFaq(value);
    },
    onSuccess: () => {
      message.success('Create Faq success!');
      queryClient.invalidateQueries(['faqs']);
      navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const updateFaqMutation = useMutation({
    mutationKey: ['update-faq'],
    mutationFn: ({ id, payload }: { id: string; payload: FaqPayload }) => {
      return updateFaq(id, payload);
    },
    onSuccess: () => {
      message.success('Update Faq success!');
      queryClient.invalidateQueries(['faqs']);
      navigate(-1);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const deleteFaqMutation = useMutation({
    mutationKey: ['delete-faq'],
    mutationFn: (id: string) => {
      return deleteFaq(id);
    },
    onSuccess: () => {
      message.success('Delete Faq success!');
      queryClient.invalidateQueries(['faqs']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });
  return {
    faqs,
    isLoadingFaqs,
    onTableChange,
    createFaqMutation,
    isLoadingFaqsDetail,
    faqsDetail,
    updateFaqMutation,
    deleteFaqMutation,
  };
};

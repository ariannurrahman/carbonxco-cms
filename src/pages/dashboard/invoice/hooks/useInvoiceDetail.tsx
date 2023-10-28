// import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { deleteInvoiceItem, getInvoiceDetail } from 'api/invoice';

export const useInvoiceDetail = (id: string) => {
  const queryClient = useQueryClient();

  const { data: invoiceDetail, isLoading: isLoadingDetail } = useQuery({
    queryFn: () => getInvoiceDetail(id ?? ''),
    queryKey: ['invoiceDetail', id],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const mutationDeleteItemInvoice = useMutation({
    mutationKey: ['deleteItemPo'],
    mutationFn: (itemId: string) => {
      return deleteInvoiceItem(itemId ?? '');
    },
    onSuccess: () => {
      message.success('Invoice item deleted!');
      queryClient.invalidateQueries(['invoiceDetail']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitDeleteItemInvoice = (itemId: string) => {
    mutationDeleteItemInvoice.mutate(itemId);
  };

  return {
    invoiceDetail,
    isLoadingDetail,
    onSubmitDeleteItemInvoice,
    isLoadingDelete: mutationDeleteItemInvoice.isLoading,
  };
};

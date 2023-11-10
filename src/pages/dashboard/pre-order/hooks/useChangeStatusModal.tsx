import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { changeStatusPO } from 'api/pre-order';
import { ChangeStatusPoPayload, ConfirmFormProps, ModalType, PaidForm } from 'types/Po';

export const useChangeStatusModal = () => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState({
    cancel: false,
    confirm: false,
    complete: false,
    paid: false,
    id: '',
  });

  const mutation = useMutation({
    mutationKey: ['updatePO'],
    mutationFn: (payload: ChangeStatusPoPayload) => {
      return changeStatusPO(payload);
    },
    onSuccess: () => {
      message.success('PO updated!');
      onCancelModal();
      queryClient.invalidateQueries(['poList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onOpenConfirmModal = (id: string) => {
    setIsModalOpen((prevState) => ({ ...prevState, confirm: true, id }));
  };

  const onOpenCancelModal = (id: string) => {
    setIsModalOpen((prevState) => ({ ...prevState, cancel: true, id }));
  };

  const onOpenCompleteModal = (id: string) => {
    setIsModalOpen((prevState) => ({ ...prevState, complete: true, id }));
  };

  const onOpenExchangeRateModal = (id: string) => {
    setIsModalOpen((prevState) => ({ ...prevState, paid: true, id }));
  };

  const onCancelModal = () => {
    setIsModalOpen({ paid: false, cancel: false, confirm: false, complete: false, id: '' });
  };

  const onSubmitChangeStatusModal = (confirmForm: ConfirmFormProps & PaidForm, type: ModalType) => {
    if (type === 'confirm') {
      const payload = {
        eta: confirmForm.eta,
        etd: confirmForm.etd,
        type,
        id: isModalOpen.id,
      };
      mutation.mutate(payload);
    }
    if (type === 'complete') {
      mutation.mutate({ id: isModalOpen.id, type });
    }
    if (type === 'cancel') {
      mutation.mutate({ id: isModalOpen.id, type });
    }

    if (type === 'paid') {
      const payload = {
        type,
        exchange_rate: confirmForm.exchange_rate,
        id: isModalOpen.id,
      };
      mutation.mutate(payload);
    }
  };
  return {
    isLoadingSubmit: mutation.isLoading,
    isModalOpen,
    onOpenConfirmModal,
    onOpenCancelModal,
    onOpenCompleteModal,
    onOpenExchangeRateModal,
    onSubmitChangeStatusModal,
    onCancelModal,
  };
};

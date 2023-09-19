import { Col, Modal, Row, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteStock } from 'api/stocks';
import { VIPButton } from 'components/button';
import { Stock } from 'types/Stocks';

interface DeleteStockModalProps {
  onClose: () => void;
  data: Stock | undefined;
  isOpen: boolean;
}

export const DeleteStockModal = ({ onClose, data, isOpen }: DeleteStockModalProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['deleteStock'],
    mutationFn: () => {
      return deleteStock(data?.id ?? '-');
    },
    onSuccess: () => {
      message.success('Stock updated!');
      onClose();
      queryClient.invalidateQueries(['stocksList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitDeleteStock = () => {
    mutation.mutate();
  };

  return (
    <Modal footer={false} open={isOpen} onCancel={onClose} title='Delete Stock'>
      <Row justify='center' gutter={[12, 12]} align='middle'>
        <Col>
          <VIPButton onClick={onSubmitDeleteStock} loading={mutation.isLoading}>
            Yes
          </VIPButton>
        </Col>
        <Col>
          <VIPButton onClick={onClose} danger>
            No
          </VIPButton>
        </Col>
      </Row>
    </Modal>
  );
};

import { useEffect } from 'react';
import { DatePicker, Form, InputNumber, Modal, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { fromUnixTime, getUnixTime } from 'date-fns';

import { VIPButton } from 'components/button';
import { Stock } from 'types/Stocks';
import { updateStock } from 'api/stocks';
import { thousandFormatter } from 'utils';

interface UpdateStockModalProps {
  onClose: () => void;
  data: Stock | undefined;
  isOpen: boolean;
}
const dateFormat = 'DD-MM-YYYY';

export const UpdateStockModal = ({ onClose, isOpen, data }: UpdateStockModalProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  useEffect(() => {
    const initStockData = () => {
      const expiredDate =
        typeof data?.expired_date === 'number' ? dayjs(new Date(fromUnixTime(data?.expired_date))) : '';
      form.setFieldsValue({
        quantity: data?.quantity,
        // quantity_type: data?.quantity_type,
        expired_date: expiredDate,
      });
    };
    initStockData();
  }, [form, data]);

  const mutation = useMutation({
    mutationKey: ['stocksList'],
    mutationFn: (value: Stock) => {
      return updateStock(data?.id ?? '-', value);
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

  const onSubmitUpdateStock = (value: Stock) => {
    const modifiedPayload = {
      ...value,
      expired_date: getUnixTime(new Date(value?.expired_date ?? new Date())),
    };
    mutation.mutate(modifiedPayload);
  };

  return (
    <Modal title='Update Stock' footer={false} onCancel={onClose} open={isOpen}>
      <Form form={form} name='update-stock-form' requiredMark={false} onFinish={onSubmitUpdateStock} layout='vertical'>
        <Form.Item
          className='mb-5'
          label='Packaging Volume'
          name='packaging_volume'
          rules={[{ required: true, message: 'Input packaging volume!' }]}
        >
          <InputNumber
            formatter={(value: number | undefined) => thousandFormatter(value?.toString())}
            className='w-full'
            placeholder='Input Quantity'
            size='large'
          />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Packaging Type'
          name='packaging_type'
          rules={[{ required: true, message: 'Input item packaging type!' }]}
        >
          <InputNumber className='w-full' placeholder='Input Quantity' size='large' />
        </Form.Item>
        <Form.Item className='mb-5' label='Expired Date' name='expired_date'>
          <DatePicker format={dateFormat} className='w-full mb-3' name='eta' placeholder='Expired Date' size='large' />
        </Form.Item>
        <Form.Item>
          <VIPButton size='large' className='w-full' htmlType='submit'>
            Submit
          </VIPButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

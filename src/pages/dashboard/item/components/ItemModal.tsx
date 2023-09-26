import { Form, Input, InputNumber, Modal } from 'antd';
import { VIPButton } from 'components/button';
import { Item } from 'types/Item';
import { thousandFormatter } from 'utils';

interface ItemModalProps {
  isOpen: boolean;
  onSubmit: (value: Item) => void;
  onCancel: () => void;
}

export const ItemModal = ({ isOpen, onSubmit, onCancel }: ItemModalProps) => {
  return (
    <Modal width={300} footer={false} title='Add Item' open={isOpen} onCancel={onCancel}>
      <Form name='add-item-form' requiredMark={false} onFinish={onSubmit} className='mt-3' layout='vertical'>
        <Form.Item
          className='mb-5'
          label='Item Name'
          name='name'
          rules={[{ required: true, message: 'Input item name!' }]}
        >
          <Input size='large' placeholder='Input item name' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Supplier Name'
          name='supplier_name'
          rules={[{ required: true, message: 'Input supplier name!' }]}
        >
          <Input size='large' placeholder='Input supplier name' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Serial Number'
          name='serial_number'
          rules={[{ required: true, message: 'Input serial number!' }]}
        >
          <Input size='large' placeholder='Input serial number' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Packaging Type'
          name='packaging_type'
          rules={[{ required: true, message: 'Input packaging type!' }]}
        >
          <Input size='large' placeholder='Input packaging type' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Packaging Volume'
          name='packaging_volume'
          rules={[{ required: true, message: 'Input packaging volume!' }]}
        >
          <InputNumber
            formatter={(value: number | undefined) => thousandFormatter(value?.toString())}
            className='w-full'
            type='tel'
            size='large'
            placeholder='Input packaging volume'
          />
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

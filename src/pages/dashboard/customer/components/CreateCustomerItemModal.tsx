import { Form, InputNumber, Modal, Select } from 'antd';

import { VIPButton } from 'components/button';
import { CreateCustomerItemPayload } from 'types/Customer';
import { dollarFormatter } from 'utils';

interface ItemSelectList {
  label: string;
  value: string;
}
interface CreateCustomerItemModalProps {
  isOpen: boolean;
  onSubmit: (value: CreateCustomerItemPayload) => void;
  onCancel: () => void;
  itemDataSource: ItemSelectList[];
  supplierList: any;
  onChangeSupplier: (supplier: string) => void;
}

export const CreateCustomerItemModal = ({
  isOpen,
  onSubmit,
  onCancel,
  itemDataSource,
  supplierList,
  onChangeSupplier,
}: CreateCustomerItemModalProps) => {
  return (
    <Modal width={300} footer={false} title='Add Customer' open={isOpen} onCancel={onCancel}>
      <Form
        name='create-customer-item-form'
        requiredMark={false}
        onFinish={onSubmit}
        className='mt-3'
        layout='vertical'
      >
        <Form.Item
          className='mb-5'
          label='Supplier Name'
          name='supplier_name'
          rules={[{ required: true, message: 'Select supplier!' }]}
        >
          <Select options={supplierList ?? []} size='large' onChange={onChangeSupplier} />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Item Name'
          name='item_id'
          rules={[{ required: true, message: 'Select item!' }]}
        >
          <Select options={itemDataSource} size='large' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Price'
          name='bind_price'
          rules={[{ required: true, message: 'Input price!' }]}
        >
          <InputNumber
            formatter={dollarFormatter}
            type='tel'
            className='w-full'
            size='large'
            placeholder='Input price'
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

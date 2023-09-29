import { Form, InputNumber, Modal, Select } from 'antd';

import { VIPButton } from 'components/button';
import { useEffect } from 'react';
import { CustomerItem, UpdateCustomerItemPayload } from 'types/Customer';
import { Item } from 'types/Item';
import { dollarFormatter } from 'utils';

interface UpdateCustomerItemModalProps {
  isOpen: boolean;
  onSubmit: (value: UpdateCustomerItemPayload) => void;
  onCancel: () => void;
  itemDataSource: Item[];
  selectedCustomerItem: CustomerItem;
}

export const UpdateCustomerItemModal = ({
  isOpen,
  onSubmit,
  onCancel,
  itemDataSource,
  selectedCustomerItem,
}: UpdateCustomerItemModalProps) => {
  const [form] = Form.useForm();

  const selectItemList = itemDataSource.map((eachItem) => {
    return {
      label: eachItem.name,
      value: eachItem.id,
    };
  });

  useEffect(() => {
    const initData = () => {
      form.setFieldsValue(selectedCustomerItem);
    };

    initData();
  }, [form, selectedCustomerItem]);

  const defaultValue = {
    customer_id: selectedCustomerItem.id,
    label: selectedCustomerItem.item.name,
    value: selectedCustomerItem.item.id,
  };

  return (
    <Modal width={300} footer={false} title='Edit Customer' open={isOpen} onCancel={onCancel}>
      <Form
        initialValues={{
          item_id: defaultValue.value,
          customer_id: defaultValue.customer_id,
        }}
        form={form}
        name='edit-customer-item-form'
        requiredMark={false}
        onFinish={onSubmit}
        className='mt-3'
        layout='vertical'
      >
        <Form.Item name='customer_id' className='hidden'>
          <InputNumber />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Item Name'
          name='item_id'
          rules={[{ required: true, message: 'Select item!' }]}
        >
          <Select options={selectItemList} size='large' />
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

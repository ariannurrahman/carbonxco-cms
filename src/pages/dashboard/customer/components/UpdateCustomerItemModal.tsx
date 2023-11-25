import { Form, InputNumber, Modal, Select } from 'antd';

import { VIPButton } from 'components/button';
import { useEffect } from 'react';
import { CustomerItem, UpdateCustomerItemPayload } from 'types/Customer';
import { dollarFormatter, thousandFormatter } from 'utils';

interface ItemSelectList {
  label: string;
  value: string;
}

interface UpdateCustomerItemModalProps {
  isOpen: boolean;
  onSubmit: (value: UpdateCustomerItemPayload) => void;
  onCancel: () => void;
  itemDataSource: ItemSelectList[];
  selectedCustomerItem: CustomerItem;
  supplierList: any;
  onChangeSupplier: (supplier: string) => void;
}

export const UpdateCustomerItemModal = ({
  isOpen,
  onSubmit,
  onCancel,
  itemDataSource,
  selectedCustomerItem,
  supplierList,
  onChangeSupplier,
}: UpdateCustomerItemModalProps) => {
  const [form] = Form.useForm();

  console.log('selectedCustomerItem', selectedCustomerItem);
  console.log('itemDataSource', itemDataSource);

  useEffect(() => {
    const initData = () => {
      form.setFieldsValue({
        supplier_name: selectedCustomerItem?.item?.supplier_name,
        item: {
          label: `${selectedCustomerItem?.item?.name} - ${
            selectedCustomerItem?.item?.packaging_type
          } - ${thousandFormatter(selectedCustomerItem?.item?.packaging_volume.toString() ?? '')}`,
          value: selectedCustomerItem?.item?.id,
        },
        // item_id: selectedCustomerItem?.item?.id,
        bind_price: selectedCustomerItem?.bind_price,
      });
    };

    initData();
  }, [form, selectedCustomerItem]);

  const defaultValue = {
    customer_id: selectedCustomerItem.id,
    label: selectedCustomerItem.item.name,
    value: selectedCustomerItem.item.id,
  };

  return (
    <Modal width={300} footer={false} title='Edit Customer Item' open={isOpen} onCancel={onCancel}>
      <Form
        initialValues={{
          item_id: defaultValue.label,
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

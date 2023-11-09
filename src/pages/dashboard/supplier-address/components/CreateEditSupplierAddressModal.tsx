import { UseMutationResult } from '@tanstack/react-query';
import { Form, Input, Modal, Select } from 'antd';

import { VIPButton } from 'components/button';
import { useEffect } from 'react';
import { Supplier, SupplierAction } from 'types/SupplierAddress';
import { capitalizeFirstLetter } from 'utils';

interface SupplierList {
  label: string;
  value: string;
}

interface UpdatePayload {
  payload: Supplier;
  id: string;
}

interface CreateEditSupplierAddressModalProps {
  isLoadingSubmit: boolean;
  isOpen: boolean;
  isSupplierLoading?: boolean;
  modifiedSupplier?: SupplierList[] | undefined;
  onCancel: () => void;
  onSubmitCreate?: UseMutationResult<any, any, Supplier, unknown>;
  onSubmitUpdate?: UseMutationResult<any, any, UpdatePayload, unknown>;
  onSubmitDelete?: UseMutationResult<any, any, string, unknown>;
  selectedSupplier?: Supplier;
  status: SupplierAction;
}

export const CreateEditSupplierAddressModal = ({
  isLoadingSubmit,
  isOpen,
  isSupplierLoading,
  modifiedSupplier,
  onCancel,
  onSubmitCreate,
  onSubmitDelete,
  onSubmitUpdate,
  selectedSupplier,
  status,
}: CreateEditSupplierAddressModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (status === 'create') return;

    const initData = () => {
      form.setFieldsValue(selectedSupplier);
    };
    initData();
  }, [form, status, selectedSupplier]);

  const modalTitle = capitalizeFirstLetter(status) + ' Supplier Address';

  const onSubmitForm = () => {
    if (status === 'create') {
      const payload: Supplier = form.getFieldsValue();
      onSubmitCreate?.mutate(payload);
    }

    if (status === 'edit') {
      const payload: Supplier = form.getFieldsValue();
      onSubmitUpdate?.mutate({
        payload,
        id: payload.id ?? '',
      });
    }

    if (status === 'delete') {
      const payload: Supplier = form.getFieldsValue();
      onSubmitDelete?.mutate(payload.id ?? '');
    }
  };

  return (
    <Modal width={300} footer={false} title={modalTitle} open={isOpen} onCancel={onCancel}>
      <Form
        form={form}
        name={`${status}-supplier-address-form`}
        requiredMark={false}
        onFinish={onSubmitForm}
        className='mt-3'
        layout='vertical'
      >
        <Form.Item name='id' className='hidden'>
          <Input />
        </Form.Item>

        {status === 'delete' ? (
          <Form.Item>
            <VIPButton
              loading={isLoadingSubmit}
              disabled={isLoadingSubmit}
              size='large'
              className='w-full'
              htmlType='submit'
            >
              Submit
            </VIPButton>
          </Form.Item>
        ) : (
          <>
            {' '}
            <Form.Item
              className='mb-5'
              label='Supplier Name'
              name='supplier_name'
              rules={[{ required: true, message: 'Input supplier name!' }]}
            >
              <Select
                disabled={isSupplierLoading}
                loading={isSupplierLoading}
                size='large'
                placeholder='Choose customer'
                style={{ width: '100%' }}
                options={modifiedSupplier}
              />
            </Form.Item>
            <Form.Item
              className='mb-5'
              label='Address'
              name='address'
              rules={[{ required: true, message: 'Input supplier address!' }]}
            >
              <Input size='large' placeholder='Input supplier address' />
            </Form.Item>
            <Form.Item
              className='mb-5'
              label='Fax'
              name='fax'
              rules={[{ required: true, message: 'Input supplier fax!' }]}
            >
              <Input size='large' placeholder='Input supplier fax' />
            </Form.Item>
            <Form.Item
              className='mb-5'
              label='Phone Number'
              name='phone'
              rules={[{ required: true, message: 'Input supplier phone number!' }]}
            >
              <Input type='tel' size='large' placeholder='Input supplier phone number' />
            </Form.Item>
            <Form.Item className='mb-5' label='PIC' name='pic' rules={[{ required: true, message: 'Input pic!' }]}>
              <Input size='large' placeholder='Input pic' />
            </Form.Item>
            <Form.Item>
              <VIPButton
                loading={isLoadingSubmit}
                disabled={isLoadingSubmit}
                size='large'
                className='w-full'
                htmlType='submit'
              >
                Submit
              </VIPButton>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

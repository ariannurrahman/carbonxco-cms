import { Form, Input, InputNumber, Modal } from 'antd';

import { VIPButton } from 'components/button';
import { CreateCustomerPayload } from 'types/Customer';

interface CreateCustomerModalProps {
  isOpen: boolean;
  isLoadingSubmit: boolean;
  onSubmit: (value: CreateCustomerPayload) => void;
  onCancel: () => void;
}

export const CreateCustomerModal = ({ isLoadingSubmit, isOpen, onSubmit, onCancel }: CreateCustomerModalProps) => {
  return (
    <Modal width={300} footer={false} title='Add Customer' open={isOpen} onCancel={onCancel}>
      <Form name='create-customer-form' requiredMark={false} onFinish={onSubmit} className='mt-3' layout='vertical'>
        <Form.Item
          className='mb-5'
          label='Customer Name'
          name='name'
          rules={[{ required: true, message: 'Input customer name!' }]}
        >
          <Input size='large' placeholder='Input customer name' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Payment Term'
          name='payment_term'
          rules={[{ required: true, message: 'Input payment term!' }]}
        >
          <InputNumber className='w-full' size='large' placeholder='Input payment term' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Address'
          name='address'
          rules={[{ required: true, message: 'Input customer address!' }]}
        >
          <Input size='large' placeholder='Input customer address' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Invoice Address'
          name='invoice_address'
          rules={[{ required: true, message: 'Input invoice address!' }]}
        >
          <Input size='large' placeholder='Input invoice address' />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='Tax Number'
          name='tax_number'
          rules={[{ required: true, message: 'Input tax number!' }]}
        >
          <Input size='large' placeholder='Input tax number' />
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
      </Form>
    </Modal>
  );
};

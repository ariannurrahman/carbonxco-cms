import { Form, Input, InputNumber, Modal } from 'antd';
import { VIPButton } from 'components/button';
import { InvoicePoUpdateModalProps } from 'types/InvoicePo';
import { thousandFormatter } from 'utils';

const InvoicePoUpdateModal = ({ isOpen, onSubmit, onCancel, type, isLoadingSubmit }: InvoicePoUpdateModalProps) => {
  const [form] = Form.useForm();

  return (
    <Modal width={300} footer={false} title='Update Invoice PO' open={isOpen} onCancel={onCancel}>
      <Form
        requiredMark={false}
        layout='vertical'
        form={form}
        name={`${type}-modal-invoice-po-form`}
        onFinish={onSubmit}
      >
        <Form.Item className='hidden' name='id'>
          <Input />
        </Form.Item>

        <Form.Item
          className='w-full mb-5'
          label='Exchange Rate'
          rules={[{ required: true, message: 'Input exchange rate!' }]}
          name='lot_number'
        >
          <InputNumber
            formatter={(value: number | undefined) => thousandFormatter(value?.toString())}
            placeholder='Input exchange rate!'
            size='large'
          />
        </Form.Item>
        <Form.Item
          className='mb-5'
          label='PO Number'
          rules={[{ required: true, message: 'Input PO number!' }]}
          name='po_number'
        >
          <Input className='w-full' placeholder='Input Po number!' size='large' />
        </Form.Item>

        <Form.Item>
          <VIPButton
            loading={isLoadingSubmit}
            disabled={isLoadingSubmit}
            size='large'
            className='w-full'
            htmlType='submit'
          >
            Update
          </VIPButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { InvoicePoUpdateModal };

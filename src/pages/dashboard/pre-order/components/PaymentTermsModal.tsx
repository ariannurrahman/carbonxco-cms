import { Button, Col, InputNumber, Modal, ModalProps, Row } from 'antd';
import { PoTemplateWrapper } from './PoTemplateWrapper';
import { POTableDataProps } from 'types/Po';

interface PaymentTermsModalProps extends ModalProps {
  open: boolean;
  data: POTableDataProps | undefined;
  status: string;
  onCancel: () => void;
  onChangePaymentTerms: any;
  paymentTerms: number;
}

export const PaymentTermsModal = ({
  open,
  data,
  status,
  onCancel,
  onChangePaymentTerms,
  paymentTerms,
}: PaymentTermsModalProps) => {
  return (
    <Modal footer={false} open={open} title='Add Payment Terms'>
      <InputNumber
        onChange={onChangePaymentTerms}
        className='w-full mb-5 mt-5'
        size='large'
        placeholder='Input Payment Terms'
      />
      <Row gutter={[8, 8]}>
        <Col className='w-full' span={12}>
          <Button size='large' className='w-full' danger onClick={onCancel}>
            Cancel
          </Button>
        </Col>
        <Col className='w-full' span={12}>
          <Button
            size='large'
            onClick={(e) => {
              e.stopPropagation();
            }}
            type='primary'
            className='bg-[#1677ff] w-full'
          >
            <PoTemplateWrapper data={data} status={status} paymentTerms={paymentTerms} />
            Print
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

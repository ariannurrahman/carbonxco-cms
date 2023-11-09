import { Col, Modal, Row } from 'antd';
import { VIPButton } from 'components/button';
import { CheckInvoiceResponse } from 'types/Invoice';

interface CheckInvoiceModalProps {
  isOpen: boolean;
  onCancel: () => void;
  data: CheckInvoiceResponse | undefined;
}

export const CheckInvoiceModal = ({ data, isOpen, onCancel }: CheckInvoiceModalProps) => {
  return (
    <Modal width={300} footer={false} title='Check Invoice' open={isOpen} onCancel={onCancel}>
      <Row>
        <Col span={12}>Due: </Col>
        <Col span={12}>{data?.data?.total_due}</Col>
      </Row>
      <Row className='mb-5'>
        <Col span={12}>Total Price: </Col>
        <Col span={12}>{data?.data?.total_price}</Col>
      </Row>

      <Row className='w-full' gutter={[8, 8]}>
        <VIPButton className='w-full' onClick={onCancel}>
          Back
        </VIPButton>
      </Row>
    </Modal>
  );
};

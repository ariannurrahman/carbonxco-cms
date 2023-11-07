import { Col, Modal, Row } from 'antd';
import { VIPButton } from 'components/button';
import { CheckInvoiceResponse } from 'types/Invoice';

interface CheckInvoiceModalProps {
  isOpen: boolean;
  isLoadingSubmit: boolean;
  isLoadingCheck: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  data: CheckInvoiceResponse;
}

export const CheckInvoiceModal = ({
  isLoadingCheck,
  data,
  isLoadingSubmit,
  isOpen,
  onSubmit,
  onCancel,
}: CheckInvoiceModalProps) => {
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
        <Col span={12}>
          <VIPButton className='w-full' danger onClick={onCancel}>
            Cancel
          </VIPButton>
        </Col>
        <Col span={12}>
          <VIPButton
            className='w-full'
            loading={isLoadingSubmit || isLoadingCheck}
            disabled={isLoadingSubmit || isLoadingCheck}
            onClick={onSubmit}
          >
            Check
          </VIPButton>
        </Col>
      </Row>
    </Modal>
  );
};

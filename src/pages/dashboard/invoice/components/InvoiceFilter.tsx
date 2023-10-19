import { Col, Form, Input, Row } from 'antd';
import { VIPButton } from 'components/button';
import { InvoiceSearchQuery } from 'types/Invoice';

interface InvoiceFilterProps {
  onSubmit: (value: InvoiceSearchQuery) => void;
}

export const InvoiceFilter = ({ onSubmit }: InvoiceFilterProps) => {
  return (
    <Form onFinish={onSubmit} layout='inline' className='p-0 my-3 w-full flex flex-col justify-center items-center'>
      <Row justify='start' align='middle' gutter={[12, 12]} className='w-full'>
        <Col lg={12} md={12} xs={24}>
          <Row className='p-0 m-0' gutter={[12, 12]}>
            <Col xs={24} md={12} className='p-0 m-0'>
              <Form.Item className='w-full' name='query_customer_name'>
                <Input className='w-full' placeholder='Customer Name' size='large' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} className='p-0 m-0'>
              <Form.Item className='w-full' name='query_po_number'>
                <Input className='w-full' placeholder='PO Number' size='large' />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col className='p-0 m-0' lg={12} md={6} xs={24}>
          <Form.Item className='p-0 m-0 w-full'>
            <VIPButton className='w-full md:w-32' size='large' type='primary' htmlType='submit'>
              Search
            </VIPButton>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

import { useEffect, useMemo } from 'react';
import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from 'antd';

import { StockModalProps } from 'types/Stocks';
import { useItem } from 'pages/dashboard/item/hooks/useItem';
import { dollarFormatter, thousandFormatter } from 'utils';
import { dateFormat } from 'constants';
import { VIPButton } from 'components/button';
import dayjs from 'dayjs';
import { fromUnixTime } from 'date-fns';

export const StockModal = ({
  type,
  onCancel,
  onSubmit,
  isOpen,
  selectedStockModal,
  isLoadingSubmit,
}: StockModalProps) => {
  const [form] = Form.useForm();
  const { itemDataSource } = useItem();
  const itemSelect = itemDataSource.map(({ name, id }) => ({ label: name, value: id }));

  useEffect(() => {
    if (type === 'update') {
      const expiredDate =
        typeof selectedStockModal?.expired_date === 'number'
          ? dayjs(new Date(fromUnixTime(selectedStockModal?.expired_date)))
          : '';

      form.setFieldsValue({ ...selectedStockModal, expired_date: expiredDate, item_id: selectedStockModal?.item?.id });
    }
  }, [form, type, selectedStockModal]);

  const modalTitle = useMemo(() => {
    if (type === 'create') {
      return 'Add Stock';
    }
    if (type === 'delete') {
      return 'Delete Stock';
    }

    if (type === 'update') {
      return 'Update Stock';
    }
  }, [type]);

  const submitTitle = useMemo(() => {
    if (type === 'create') {
      return 'Submit';
    }
    if (type === 'delete') {
      return 'Delete';
    }
    if (type === 'update') {
      return 'Save';
    }
  }, [type]);

  return (
    <Modal width={300} footer={false} title={modalTitle} open={isOpen} onCancel={onCancel}>
      {type === 'delete' ? (
        <Row justify='center' gutter={[12, 12]} align='middle'>
          <Col>
            <VIPButton
              disabled={isLoadingSubmit}
              loading={isLoadingSubmit}
              onClick={() => {
                if (selectedStockModal) {
                  onSubmit(selectedStockModal);
                }
              }}
            >
              Yes
            </VIPButton>
          </Col>
          <Col>
            <VIPButton disabled={isLoadingSubmit} onClick={onCancel} danger>
              No
            </VIPButton>
          </Col>
        </Row>
      ) : (
        <Form requiredMark={false} layout='vertical' form={form} name={`${type}-modal-stock-form`} onFinish={onSubmit}>
          <Form.Item className='hidden' name='id'>
            <Input />
          </Form.Item>
          <Form.Item
            className='mb-5'
            label='Item Name'
            rules={[{ required: true, message: 'Input item!' }]}
            name='item_id'
          >
            <Select
              disabled={type === 'update'}
              options={itemSelect}
              placeholder='Select Item'
              showSearch
              size='large'
            />
          </Form.Item>
          <Form.Item
            className='mb-5'
            label='Lot Number'
            rules={[{ required: true, message: 'Input lot number!' }]}
            name='lot_number'
          >
            <Input disabled={type === 'update'} placeholder='Input lot number!' size='large' />
          </Form.Item>
          <Form.Item
            className='mb-5'
            label='Quantity'
            rules={[{ required: true, message: 'Input quantity!' }]}
            name='quantity'
          >
            <InputNumber
              type='tel'
              className='w-full'
              placeholder='Input quantity!'
              size='large'
              formatter={(value: number | undefined) => thousandFormatter(value?.toString())}
            />
          </Form.Item>
          <Form.Item
            className='mb-5'
            name='buy_price'
            label='Buy Price'
            rules={[{ required: true, message: 'Input buy price!' }]}
          >
            <InputNumber
              disabled={type === 'update'}
              type='tel'
              className='w-full'
              placeholder='Input buy price!'
              size='large'
              formatter={(value: number | undefined) => dollarFormatter(value?.toString())}
            />
          </Form.Item>
          <Form.Item
            className='mb-5'
            label='Expired Date'
            name='expired_date'
            rules={[{ required: true, message: 'Input expired date!' }]}
          >
            <DatePicker
              format={dateFormat}
              className='w-full mb-3'
              name='eta'
              placeholder='Expired Date'
              size='large'
            />
          </Form.Item>
          <Form.Item>
            <VIPButton
              loading={isLoadingSubmit}
              disabled={isLoadingSubmit}
              size='large'
              className='w-full'
              htmlType='submit'
            >
              {submitTitle}
            </VIPButton>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

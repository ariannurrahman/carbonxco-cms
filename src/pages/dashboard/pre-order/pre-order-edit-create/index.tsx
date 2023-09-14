import { Col, Input, Form, Select, Row, Divider, InputNumber } from 'antd';

import { VIPButton } from 'components/button';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { usePreorder } from '../hooks/usePreorder';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PoState } from 'types/Po';

export const CreatePO = () => {
  const location = useLocation();
  const { id } = useParams();

  const [form] = Form.useForm();
  const {
    isItemLoading,
    isSupplierLoading,
    itemsList: modifiedItems,
    onChangeSupplier,
    onSubmitCreatePO,
    selectedSupplier,
    suppliersList: modifiedSupplier,
    isLoadingSubmitPO,
    isDetailPreOrderLoading,
    detailPreOrder,
  } = usePreorder();

  console.log('detailPreOrder', detailPreOrder);
  console.log('isDetailPreOrderLoading', isDetailPreOrderLoading);

  const status: PoState = location.state;

  useEffect(() => {
    if (status !== 'edit') return;
    const initEdit = () => {
      form.setFieldsValue({
        supplier_name: 'test',
      });
    };
    initEdit();
  }, [form, status]);

  console.log('selectedSupplier', selectedSupplier);
  console.log('id', id);

  return (
    <Row className='shadow-sm bg-white rounded-md w-full px-5 md:px-8'>
      <Row align='middle' className='w-full h-[40px] mt-5' justify='space-between'>
        <Col>
          <p className='text-left font-bold text-lg'>Create PO</p>
        </Col>
        <Col>
          <VIPButton
            disabled={!selectedSupplier || isLoadingSubmitPO}
            loading={isLoadingSubmitPO}
            form='create-po-form'
            type='primary'
            htmlType='submit'
          >
            {status === 'create' ? 'Submit' : 'Save'}
          </VIPButton>
        </Col>
      </Row>
      <Divider />

      <Row className='w-full'>
        <Col span={24}>
          <Form
            form={form}
            layout='vertical'
            requiredMark={false}
            name='create-po-form'
            id='create-po-form'
            onFinish={onSubmitCreatePO}
            autoComplete='off'
          >
            <Form.Item
              className=''
              label='Supplier Name'
              name='supplier_name'
              rules={[{ required: true, message: 'Input item name!' }]}
            >
              <Select
                disabled={status === 'edit'}
                loading={isSupplierLoading}
                size='large'
                placeholder='Choose supplier'
                style={{ width: 200 }}
                onChange={onChangeSupplier}
                options={modifiedSupplier}
              />
            </Form.Item>
            <Form.List name='po_items'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={[12, 12]} key={key} className='p-3 mt-3 rounded border-b-2 shadow-sm'>
                      <Col xs={24} lg={4}>
                        <Form.Item
                          {...restField}
                          label='Item Name'
                          name={[name, 'item_id']}
                          rules={[{ required: true, message: 'Input item name!' }]}
                        >
                          <Select
                            loading={isItemLoading}
                            placeholder='Choose Item'
                            size='large'
                            style={{ width: '100%' }}
                            onChange={onChangeSupplier}
                            options={modifiedItems}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={4}>
                        <Form.Item
                          {...restField}
                          label='Quantity'
                          name={[name, 'quantity']}
                          rules={[{ required: true, message: 'Input quantity!' }]}
                        >
                          <InputNumber className='w-full' size='large' placeholder='Input quantity' />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={4}>
                        <Form.Item
                          {...restField}
                          label='Quantity Type'
                          name={[name, 'quantity_type']}
                          rules={[{ required: true, message: 'Input quantity type!' }]}
                        >
                          <Input size='large' placeholder='Input quantity type' />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={4}>
                        <Form.Item
                          label='Lot Number'
                          name={[name, 'lot_number']}
                          rules={[{ required: true, message: 'Input lot number!' }]}
                        >
                          <Input size='large' placeholder='Input lot number' />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={4}>
                        <Form.Item
                          label='Buy Price'
                          name={[name, 'buy_price']}
                          rules={[{ required: true, message: 'Input buy price!' }]}
                        >
                          <InputNumber className='w-full' size='large' type='tel' placeholder='Input buy price' />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={4} className='flex justify-center items-center w-full'>
                        <VIPButton type='primary' danger onClick={() => remove(name)} icon={<MinusCircleOutlined />}>
                          Remove
                        </VIPButton>
                      </Col>
                    </Row>
                  ))}
                  <Form.Item className='mt-3'>
                    <VIPButton
                      type='primary'
                      disabled={!selectedSupplier}
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Item
                    </VIPButton>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item></Form.Item>
          </Form>
        </Col>
      </Row>
    </Row>
  );
};

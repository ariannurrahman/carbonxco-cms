import { useState } from 'react';
import { Col, Input, Form, Select, Row, Divider } from 'antd';

import { VIPButton } from 'components/button';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const CreatePO = () => {
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const onChangeSupplier = (supplierValue: string) => setSelectedSupplier(supplierValue);
  const onSubmitForm = (e: any) => console.log('e', e);

  return (
    <Row className='shadow-sm bg-white rounded-md w-full px-5 md:px-8'>
      <Row align='middle' className='w-full h-[40px] mt-5' justify='space-between'>
        <Col>
          <p className='text-left font-bold text-lg'>Create PO</p>
        </Col>
        <Col>
          <VIPButton disabled={!selectedSupplier} form='create-po-form' type='primary' htmlType='submit'>
            Submit
          </VIPButton>
        </Col>
      </Row>
      <Divider />

      <Row className='w-full'>
        <Col span={24}>
          <Form
            layout='vertical'
            requiredMark={false}
            name='create-po-form'
            id='create-po-form'
            onFinish={onSubmitForm}
            autoComplete='off'
          >
            <Form.Item
              className=''
              label='Supplier Name'
              name='supplier_name'
              rules={[{ required: true, message: 'Input item name!' }]}
            >
              <Select
                size='large'
                placeholder='Choose supplier'
                style={{ width: 200 }}
                onChange={onChangeSupplier}
                options={[
                  { value: 'supplier 1', label: 'Supplier 1' },
                  { value: 'supplier 2', label: 'Supplier 2' },
                  { value: 'supplier 3', label: 'Supplier 3' },
                  { value: 'supplier 4', label: 'Supplier 4' },
                ]}
              />
            </Form.Item>
            <Form.List name='po_items'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={[12, 12]} key={key} className='p-3 mt-3 rounded border-b-2 shadow-sm'>
                      <Col xs={24} lg={5}>
                        <Form.Item
                          {...restField}
                          label='Item Name'
                          name={[name, 'item_name']}
                          rules={[{ required: true, message: 'Input item name!' }]}
                        >
                          <Select
                            placeholder='Choose Item'
                            size='large'
                            style={{ width: '100%' }}
                            onChange={onChangeSupplier}
                            options={[
                              { value: 'Item 1', label: 'Item 1' },
                              { value: 'Item 2', label: 'Item 2' },
                              { value: 'Item 3', label: 'Item 3' },
                              { value: 'Item 4', label: 'Item 4' },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={5}>
                        <Form.Item
                          {...restField}
                          label='Quantity'
                          name={[name, 'quantity']}
                          rules={[{ required: true, message: 'Input quantity!' }]}
                        >
                          <Input size='large' placeholder='Input quantity' />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={5}>
                        <Form.Item
                          {...restField}
                          label='Quantity Type'
                          name={[name, 'quantity_type']}
                          rules={[{ required: true, message: 'Input quantity type!' }]}
                        >
                          <Input size='large' placeholder='Input quantity type' />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={5}>
                        <Form.Item
                          label='Lot Number'
                          name={[name, 'lot_number']}
                          rules={[{ required: true, message: 'Input lot number!' }]}
                        >
                          <Input size='large' placeholder='Input lot number' />
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

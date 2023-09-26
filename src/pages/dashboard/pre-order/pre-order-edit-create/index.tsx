import { useEffect } from 'react';
import { Col, Input, Form, Select, Row, Divider, InputNumber } from 'antd';

import { VIPButton } from 'components/button';
import { CheckCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { usePreorder } from '../hooks/usePreorder';
import { dollarFormatter, thousandFormatter } from 'utils';

export const CreatePO = () => {
  const [form] = Form.useForm();
  const {
    detailPreOrder,
    isItemLoading,
    isLoadingSubmitPO,
    isSupplierLoading,
    itemsList,
    onChangeSupplier,
    onSubmitCreatePO,
    onSubmitDeletePoItem,
    onSubmitUpdateItemPO,
    preOrderState,
    selectedSupplier,
    suppliersList,
  } = usePreorder();

  useEffect(() => {
    if (preOrderState === 'create') return;
    const initEdit = () => {
      const poItems = detailPreOrder?.data.po_items.map(({ id, buy_price, item, lot_number, quantity }) => {
        return {
          buy_price,
          item_id: item.id,
          lot_number,
          quantity,
          id,
        };
      });

      form.setFieldsValue({
        supplier_name: detailPreOrder?.data?.po_order?.supplier_name,
        po_items: poItems,
      });
    };
    initEdit();
  }, [form, preOrderState, detailPreOrder]);

  return (
    <Row className='shadow-sm bg-white rounded-md w-full px-5 md:px-8'>
      <Row align='middle' className='w-full h-[40px] mt-5' justify='space-between'>
        <Col>
          <p className='text-left font-bold text-lg'>
            {preOrderState === 'create'
              ? 'Create PO'
              : preOrderState === 'edit'
              ? 'Edit Po'
              : preOrderState === 'view'
              ? 'View Po'
              : ''}
          </p>
        </Col>
        {preOrderState === 'create' ? (
          <Col>
            <VIPButton
              disabled={!selectedSupplier || isLoadingSubmitPO}
              loading={isLoadingSubmitPO}
              form='create-po-form'
              type='primary'
              htmlType='submit'
            >
              Submit
            </VIPButton>
          </Col>
        ) : null}
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
                disabled={preOrderState === 'edit' || preOrderState === 'view'}
                loading={preOrderState === 'edit' ? false : isSupplierLoading}
                size='large'
                placeholder='Choose supplier'
                style={{ width: 200 }}
                onChange={onChangeSupplier}
                options={suppliersList}
              />
            </Form.Item>
            <Form.List name='po_items'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const getFormValue = (name: number) => {
                      const fieldsValue = form.getFieldsValue();
                      return fieldsValue.po_items[name];
                    };

                    return (
                      <Row gutter={[12, 12]} key={key} className='p-3 mt-3 rounded border-b-2 shadow-sm'>
                        <Col xs={24} lg={4}>
                          <Form.Item
                            {...restField}
                            label='Item Name'
                            name={[name, 'item_id']}
                            rules={[{ required: true, message: 'Input item name!' }]}
                          >
                            <Select
                              disabled={preOrderState === 'view'}
                              loading={isItemLoading}
                              placeholder='Choose Item'
                              size='large'
                              style={{ width: '100%' }}
                              options={itemsList}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} lg={3}>
                          <Form.Item
                            {...restField}
                            label='Quantity'
                            name={[name, 'quantity']}
                            rules={[{ required: true, message: 'Input quantity!' }]}
                          >
                            <InputNumber
                              disabled={preOrderState === 'view'}
                              formatter={(value: number | undefined) => thousandFormatter(value?.toString())}
                              className='w-full'
                              size='large'
                              placeholder='Input quantity'
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} lg={3}>
                          <Form.Item
                            label='Lot Number'
                            name={[name, 'lot_number']}
                            rules={[{ required: true, message: 'Input lot number!' }]}
                          >
                            <Input size='large' placeholder='Input lot number' disabled={preOrderState === 'view'} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} lg={4}>
                          <Form.Item
                            label='Buy Price'
                            name={[name, 'buy_price']}
                            rules={[{ required: true, message: 'Input buy price!' }]}
                          >
                            <InputNumber
                              formatter={dollarFormatter}
                              className='w-full'
                              size='large'
                              type='tel'
                              placeholder='Input buy price'
                              disabled={preOrderState === 'view'}
                            />
                          </Form.Item>
                        </Col>
                        {preOrderState === 'edit' ? (
                          <Col xs={24} lg={3} className='flex justify-center items-center w-full'>
                            <VIPButton
                              type='primary'
                              onClick={() => onSubmitUpdateItemPO(getFormValue(name))}
                              icon={<CheckCircleOutlined />}
                            >
                              Save
                            </VIPButton>
                          </Col>
                        ) : null}

                        <Col xs={24} lg={3} className='flex justify-center items-center w-full'>
                          <VIPButton
                            disabled={preOrderState === 'view'}
                            type='primary'
                            danger
                            onClick={() => {
                              if (preOrderState === 'create') {
                                remove(name);
                              }
                              if (preOrderState === 'edit') {
                                onSubmitDeletePoItem(getFormValue(name));
                                remove(name);
                              }
                            }}
                            icon={<MinusCircleOutlined />}
                          >
                            Remove
                          </VIPButton>
                        </Col>
                      </Row>
                    );
                  })}
                  {preOrderState === 'edit' ? (
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
                  ) : null}
                </>
              )}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Row>
  );
};

import { useCallback, useEffect, useState } from 'react';
import { CheckCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Input, InputNumber, Row, Select } from 'antd';

import { VIPButton } from 'components/button';
import { useCustomer } from 'pages/dashboard/customer/hooks/useCustomer';
import { usePreorder } from 'pages/dashboard/pre-order/hooks/usePreorder';
import { dollarFormatter, thousandFormatter } from 'utils';
import { Customer } from 'types/InvoicePo';
import { useInvoicePo } from '../hooks/useInvoicePo';

export type InvoicePoState = 'create' | 'edit' | 'view';

interface InvoicePoEditCreateProps {
  state: InvoicePoState;
}

export const InvoicePoEditCreate = ({ state }: InvoicePoEditCreateProps) => {
  const [form] = Form.useForm();
  const poNumber = Form.useWatch('po_number', form);
  const exchangeRate = Form.useWatch('exchange_rate', form);

  const [createOnEdit, setCreateOnEdit] = useState(false);
  // const [isFormShow, setIsFormShow] = useState({
  //   isSupplierName: false,
  //   isPoNumber: false,
  // });
  const { customerList, isLoadingCustomerList } = useCustomer(999);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();

  const { itemsList } = usePreorder();
  const {
    onSubmitCreateInvoicePo,
    onSubmitUpdateInvoicePoItem,
    invoicePoDetail,
    onSubmitUpdateInvoicePo,
    isLoadingUpdateInvoicePo,
    mutationCreateItemInvoicePo,
    onSubmitDeleteItemInvoicePo,
  } = useInvoicePo(state);

  const initData = useCallback(() => {
    if (state === 'create') return;
    if (!invoicePoDetail) return;
    if (invoicePoDetail?.data?.invoice_po?.customer) {
      setSelectedCustomer(invoicePoDetail.data.invoice_po.customer);
    }

    const invoicePoItems = invoicePoDetail?.data?.invoice_po_items.map((eachItem) => {
      return {
        ...eachItem,
        item_id: eachItem.item.id,
      };
    });

    const initialForm = {
      customer_id: invoicePoDetail?.data?.invoice_po?.customer.name,
      po_number: invoicePoDetail?.data?.invoice_po?.po_number,
      exchange_rate: invoicePoDetail?.data?.invoice_po?.exchange_rate,
      invoice_po_items: invoicePoItems,
    };
    form.setFieldsValue(initialForm);
  }, [invoicePoDetail, form, state]);

  useEffect(() => {
    initData();
  }, [initData]);

  const customerOptions = customerList?.data.map(({ name, address, invoice_address, id }) => {
    return {
      label: `${name} - ${address} - ${invoice_address}`,
      value: id,
    };
  });

  const onSelectCustomer = (value: Customer) => {
    setSelectedCustomer(value);
  };

  const pageTitle =
    state === 'create'
      ? 'Create Invoice Po'
      : state === 'edit'
      ? 'Edit Invoice Po'
      : state === 'view'
      ? 'View Invoice Po'
      : '';

  console.log('form.getFieldsValue()', form.getFieldsValue());

  return (
    <Row className='shadow-sm bg-white rounded-md w-full px-5 md:px-8'>
      <Row align='middle' className='w-full h-[40px] mt-5' justify='space-between'>
        <Col>
          <p className='text-left font-bold text-lg'>{pageTitle}</p>
        </Col>
        {state === 'create' ? (
          <Col>
            <VIPButton form={`${state}-invoice-po-form`} type='primary' htmlType='submit'>
              Submit
            </VIPButton>
          </Col>
        ) : null}
        {state === 'edit' ? (
          <Col>
            <VIPButton form={`${state}-invoice-po-form`} type='primary' htmlType='submit'>
              Create Invoice Order
            </VIPButton>
          </Col>
        ) : null}
      </Row>
      <Divider />

      <Row className='w-full h-full pb-80'>
        <Col span={24}>
          <Form
            className='h-full'
            form={form}
            layout='vertical'
            requiredMark={false}
            name={`${state}-invoice-po-form`}
            id={`${state}-invoice-po-form`}
            autoComplete='off'
            onFinish={(value) =>
              onSubmitCreateInvoicePo(
                value,
                state === 'create' ? 'create-invoice-po' : state === 'edit' ? 'create-invoice-order' : '',
              )
            }
          >
            <Row gutter={[8, 8]}>
              <Col xs={24} md={24}>
                <Form.Item
                  className=''
                  label='Customer Name'
                  name='customer_id'
                  rules={[{ required: true, message: 'Input customer!' }]}
                >
                  <Select
                    disabled={state === 'edit' || state === 'view'}
                    loading={state === 'edit' ? false : isLoadingCustomerList}
                    size='large'
                    placeholder='Choose customer'
                    style={{ width: '100%' }}
                    onChange={onSelectCustomer}
                    options={customerOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={state === 'edit' ? 10 : 12}>
                <Form.Item
                  className=''
                  label='PO Number'
                  name='po_number'
                  rules={[{ required: true, message: 'Input item name!' }]}
                >
                  <Input size='large' placeholder='Input PO number' disabled={state === 'view'} />
                </Form.Item>
              </Col>
              <Col xs={24} md={state === 'edit' ? 10 : 12}>
                <Form.Item
                  className=''
                  label='Exchange Rate'
                  name='exchange_rate'
                  rules={[{ required: true, message: 'Input exchange rate!' }]}
                >
                  <InputNumber
                    className='w-full'
                    size='large'
                    placeholder='Input exchange rate'
                    formatter={(value: number | undefined) => thousandFormatter(value?.toString())}
                    disabled={state === 'view'}
                  />
                </Form.Item>
              </Col>
              {state === 'edit' ? (
                <Col xs={24} md={4} className='flex justify-center items-center w-full'>
                  <VIPButton
                    loading={isLoadingUpdateInvoicePo}
                    disabled={isLoadingUpdateInvoicePo}
                    type='primary'
                    onClick={() => onSubmitUpdateInvoicePo({ exchange_rate: exchangeRate, po_number: poNumber })}
                    icon={<CheckCircleOutlined />}
                  >
                    Save
                  </VIPButton>
                </Col>
              ) : null}
            </Row>

            <Form.List name='invoice_po_items'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => {
                    const getFormValue = (name: number) => {
                      const fieldsValue = form.getFieldsValue();
                      return fieldsValue.invoice_po_items[name];
                    };

                    return (
                      <div key={`${key}-${index}-${getFormValue(name)}`}>
                        {index !== 0 && index !== fields.length && <Divider key={key} className='mt-1 mb-1' />}
                        <Row gutter={[12, 12]} className='p-3'>
                          <Col xs={24} lg={4}>
                            <Form.Item
                              {...restField}
                              label='Item Name'
                              name={[name, 'item_id']}
                              rules={[{ required: true, message: 'Input item name!' }]}
                            >
                              <Select
                                disabled={state === 'view'}
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
                                disabled={state === 'view'}
                                formatter={(value: number | undefined) => thousandFormatter(value?.toString())}
                                className='w-full'
                                size='large'
                                placeholder='Input quantity'
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} lg={4}>
                            <Form.Item
                              label='Buy Price'
                              name={[name, 'price']}
                              rules={[{ required: true, message: 'Input price!' }]}
                            >
                              <InputNumber
                                formatter={dollarFormatter}
                                className='w-full'
                                size='large'
                                type='tel'
                                placeholder='Input price'
                                disabled={state === 'view'}
                              />
                            </Form.Item>
                          </Col>
                          {state === 'edit' ? (
                            <Col xs={24} lg={3} className='flex justify-center items-center w-full'>
                              <VIPButton
                                type='primary'
                                onClick={() => {
                                  if (!createOnEdit) {
                                    onSubmitUpdateInvoicePoItem(getFormValue(name).id, {
                                      price: getFormValue(name).price,
                                      quantity: getFormValue(name).quantity,
                                      item_id: getFormValue(name).item_id,
                                    });
                                  }

                                  if (createOnEdit) {
                                    mutationCreateItemInvoicePo.mutate(getFormValue(name));
                                    // refetchInvoicePoDetail();
                                    // initData();
                                  }
                                }}
                                icon={<CheckCircleOutlined />}
                              >
                                Save
                              </VIPButton>
                            </Col>
                          ) : null}
                          <Col xs={24} lg={3} className='flex justify-center items-center w-full'>
                            <VIPButton
                              disabled={state === 'view'}
                              type='primary'
                              danger
                              onClick={() => {
                                if (state === 'create') {
                                  remove(name);
                                }
                                if (state === 'edit') {
                                  const response = mutationCreateItemInvoicePo.data;
                                  onSubmitDeleteItemInvoicePo(getFormValue(name).id ?? response.data.id);
                                  remove(name);
                                }
                              }}
                              icon={<MinusCircleOutlined />}
                            >
                              Remove
                            </VIPButton>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                  {state === 'edit' || state === 'create' ? (
                    <Form.Item className='mt-3'>
                      <VIPButton
                        type='primary'
                        disabled={!selectedCustomer || !poNumber || !exchangeRate}
                        onClick={() => {
                          if (state === 'edit') {
                            setCreateOnEdit(true);
                          }
                          if (state === 'create') {
                            setCreateOnEdit(false);
                          }
                          add();
                        }}
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

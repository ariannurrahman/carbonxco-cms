import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Input, InputNumber, Row, Select, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

import { useInvoiceDetail } from './hooks/useInvoiceDetail';
import { dollarFormatter, thousandFormatter } from 'utils';
import { VIPButton } from 'components/button';
import { useInvoice } from './hooks/useInvoice';
import { getInvoicePoItems } from 'api/invoicePo';
import { useQuery } from '@tanstack/react-query';

export type InvoiceState = 'create' | 'edit' | 'view';

interface InvoiceEditCreateProps {
  state: InvoiceState;
}

export const CreateEditInvoice = ({ state }: InvoiceEditCreateProps) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const exchangeRate = Form.useWatch('exchange_rate', form);

  const [itemDiff, setItemDiff] = useState<any>([]);

  const { onSubmitUpdateInvoice, isSubmitUpdateInvoiceLoading, onSubmitCreateInvoiceItem, onSubmitUpdateInvoiceItem } =
    useInvoice();
  const { isLoadingDelete, invoiceDetail, isLoadingDetail, onSubmitDeleteItemInvoice } = useInvoiceDetail(id ?? '');

  const { isLoading: isLoadingInvoicePoItems, data: invoicePoItemsList } = useQuery({
    queryFn: () => getInvoicePoItems(invoiceDetail?.data?.invoice?.invoice_po?.id ?? ''),
    queryKey: ['invoiceDetail'],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!invoiceDetail?.data?.invoice?.invoice_po?.id,
  });

  const invoicePoItemOptions = useMemo(() => {
    const options = invoicePoItemsList?.data.map(({ item, id }) => {
      return {
        label: item.name,
        value: id,
      };
    });
    return options;
  }, [invoicePoItemsList]);

  useEffect(() => {
    if (state === 'create') return;
    if (!invoiceDetail) return;
    const initData = () => {
      const invoicePoItems = invoiceDetail?.data?.invoice_items.map((eachItem) => {
        return {
          label: eachItem.item.name,
          item_id: eachItem.id,
          quantity: eachItem.quantity,
          price: eachItem.price,
        };
      });

      const initialForm = {
        customer_id: invoiceDetail?.data?.invoice.customer.name,
        po_number: invoiceDetail?.data?.invoice?.po_number,
        exchange_rate: invoiceDetail?.data?.invoice?.exchange_rate,
        invoice_items: invoicePoItems,
      };
      form.setFieldsValue(initialForm);
    };
    initData();
  }, [state, form, invoiceDetail, invoicePoItemsList]);

  const onClickSaveUpdateInvoice = () => {
    onSubmitUpdateInvoice({ exchange_rate: exchangeRate });
  };

  const onSaveUpdateitem = (invItemId: string, quantity: number) => {
    onSubmitUpdateInvoiceItem(invItemId, quantity);
  };

  const pageTitle = state === 'edit' ? 'Edit Invoice' : state === 'view' ? 'View Invoice' : '';

  const isAbleCreateNewItem = () => {
    if (!invoiceDetail) return false;
    if (!invoicePoItemsList) return false;
    return invoiceDetail?.data?.invoice_items?.length < invoicePoItemsList?.data?.length;
  };

  const getItemsDiff = useCallback(() => {
    const modifiedItemlist = invoicePoItemsList?.data.map((eachItemList, index) => {
      const detail = invoiceDetail?.data?.invoice_items?.map(({ id }) => {
        return { item_id: id ?? '' };
      });
      return { ...eachItemList, ...detail?.[index] };
    });

    const result = modifiedItemlist?.filter(({ id }) => {
      const find = !invoiceDetail?.data?.invoice_items?.some(({ invoice_po_item }) => {
        return id === invoice_po_item?.id;
      });
      return find;
    });

    setItemDiff(result);
  }, [invoicePoItemsList, invoiceDetail]);

  useEffect(() => {
    getItemsDiff();
  }, [getItemsDiff]);

  return (
    <Row className='shadow-sm bg-white rounded-md w-full px-5 md:px-8'>
      {/* <InvoiceTemplate /> */}
      <Row align='middle' className='w-full h-[40px] mt-5' justify='space-between'>
        <Col>
          <p className='text-left font-bold text-lg'>{pageTitle}</p>
        </Col>
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
                    loading={state === 'edit' ? isLoadingDetail : false}
                    size='large'
                    placeholder='Choose customer'
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={state === 'edit' ? 10 : 12}>
                <Form.Item label='PO Number' name='po_number' rules={[{ required: true, message: 'Input item name!' }]}>
                  <Input size='large' placeholder='Input PO number' disabled={true} />
                </Form.Item>
              </Col>
              <Col xs={24} md={state === 'edit' ? 10 : 12}>
                <Form.Item
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
                    loading={isSubmitUpdateInvoiceLoading}
                    disabled={isSubmitUpdateInvoiceLoading}
                    type='primary'
                    onClick={onClickSaveUpdateInvoice}
                    icon={<CheckCircleOutlined />}
                  >
                    Save
                  </VIPButton>
                </Col>
              ) : null}
            </Row>

            {(isLoadingDetail || isLoadingDelete || isSubmitUpdateInvoiceLoading) && (
              <Skeleton.Input size='large' block active />
            )}

            <Form.List name='invoice_items'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => {
                    const getFormValue = (name: number) => {
                      const fieldsValue = form.getFieldsValue();
                      return fieldsValue.invoice_items[name];
                    };

                    return (
                      <div key={`${key}-${index}`}>
                        {index !== 0 && index !== fields.length && <Divider key={key} className='mt-1 mb-1' />}
                        <Row gutter={[12, 12]} className='p-3'>
                          <Col xs={24} lg={4}>
                            <Form.Item
                              {...restField}
                              label='Item Name'
                              name={[name, 'label']}
                              rules={[{ required: true, message: 'Input item name!' }]}
                            >
                              <Select
                                disabled
                                loading={isLoadingInvoicePoItems}
                                placeholder='Choose Item'
                                size='large'
                                style={{ width: '100%' }}
                                options={invoicePoItemOptions}
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
                                disabled
                                size='large'
                                type='tel'
                                placeholder='Input price'
                              />
                            </Form.Item>
                          </Col>
                          {state === 'edit' ? (
                            <Col xs={24} lg={3} className='flex justify-center items-center w-full'>
                              <VIPButton
                                type='primary'
                                onClick={() => {
                                  const itemId = getFormValue(name)?.item_id;
                                  onSaveUpdateitem(itemId, getFormValue(name).quantity);
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
                                  onSubmitDeleteItemInvoice(getFormValue(name).item_id);
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
                  {state === 'edit' &&
                  (!isLoadingDetail || !isLoadingDelete || !isSubmitUpdateInvoiceLoading) &&
                  isAbleCreateNewItem()
                    ? itemDiff?.map((eachItem: any, index: number) => {
                        const { item, id: itemId, price, quantity } = eachItem;
                        return (
                          <Form.Item className='mt-3' key={itemId}>
                            <VIPButton
                              type='primary'
                              onClick={() => {
                                onSubmitCreateInvoiceItem(itemId, quantity);
                                add({ price, quantity, id, label: item.name, item_id: item.id });
                                const test = [...itemDiff];
                                test.splice(index, 1);
                                setItemDiff(test);
                              }}
                              icon={<PlusOutlined />}
                            >
                              Add Item {item.name}
                            </VIPButton>
                          </Form.Item>
                        );
                      })
                    : null}
                </>
              )}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Row>
  );
};

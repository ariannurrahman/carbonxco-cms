import { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Input, Form, Select, Row, Divider, InputNumber, Space, Alert, Tooltip } from 'antd';

import { VIPButton } from 'components/button';
import { CheckCircleOutlined, InfoCircleTwoTone, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { usePreorder } from '../hooks/usePreorder';
import { dollarFormatter, thousandFormatter } from 'utils';
import { useSupplierAddress } from 'pages/dashboard/supplier-address/hooks/useSupplierAddress';
import { CURRENCY_TYPE } from '../constants';
import { PoPayload } from 'types/Po';
import { useParams } from 'react-router-dom';

export const CreatePO = () => {
  const { id = '' } = useParams();
  const [form] = Form.useForm();
  const [isFormShow, setIsFormShow] = useState({
    isSupplierAddress: false,
    isPoNumber: false,
    isCurrency: false,
    isExchangeRate: false,
  });
  const [isAbleToAdd, setIsAbleToAdd] = useState(false);

  const poNumber = Form.useWatch('po_number', form);
  const selectedSupplierAddress = Form.useWatch('supplier_address_id', form);
  const selectedCurrencyType = Form.useWatch('currency_type', form);
  const exchangeRate = Form.useWatch('exchange_rate', form);
  const poItems = Form.useWatch('po_items', form);

  const {
    detailPreOrder,
    isItemLoading,
    isLoadingSubmitPO,
    isSupplierLoading,
    itemsList,
    onChangeSupplier,
    onSubmitCreatePO,
    onSubmitDeletePoItem,
    onSubmitUpdatePo,
    onSubmitUpdateItemPO,
    preOrderState,
    selectedSupplier,
    suppliersList,
  } = usePreorder();

  const { supplierAddressList, setTableParams } = useSupplierAddress();

  const fetchSupplierAddress = useCallback(() => {
    setTableParams((prevState) => ({ ...prevState, query: { query_item_supplier_name: selectedSupplier } }));
  }, [selectedSupplier, setTableParams]);
  console.log('selectedSupplier', selectedSupplier);
  useEffect(() => {
    fetchSupplierAddress();
  }, [fetchSupplierAddress]);

  const modifiedSupplierAddress = supplierAddressList?.data?.map(({ address = '', id = '' }) => {
    return {
      label: address,
      value: id,
    };
  });

  useEffect(() => {
    if (preOrderState === 'create') return;
    const initEdit = () => {
      const poItems = detailPreOrder?.data?.po_items?.map(({ id, buy_price, item, lot_number, quantity }) => {
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
        po_number: detailPreOrder?.data?.po_order?.po_number ?? '',
        supplier_address_id: detailPreOrder?.data?.po_order?.supplier_address?.id,
        currency_type: detailPreOrder?.data?.po_order?.currency_type,
        exchange_rate: detailPreOrder?.data?.po_order?.exchange_rate,
      });
    };
    initEdit();
  }, [form, preOrderState, detailPreOrder]);

  const getUpdatePoPayload = (): PoPayload => {
    const payload = {
      supplier_address_id: form.getFieldValue('supplier_address_id'),
      currency_type: form.getFieldValue('currency_type'),
      exchange_rate: form.getFieldValue('exchange_rate'),
      po_number: form.getFieldValue('po_number'),
    };
    return payload;
  };

  const showForm = useCallback(() => {
    if (selectedSupplier) {
      setIsFormShow((prevState) => ({ ...prevState, isSupplierAddress: true }));
    }
    if (selectedSupplierAddress) {
      setIsFormShow((prevState) => ({ ...prevState, isPoNumber: true }));
    }
    if (poNumber) {
      setIsFormShow((prevState) => ({ ...prevState, isCurrency: true }));
    }
    if (selectedCurrencyType) {
      setIsFormShow((prevState) => ({ ...prevState, isExchangeRate: true }));
    }
    if (exchangeRate) {
      setIsAbleToAdd(true);
    }
  }, [poNumber, selectedSupplier, selectedSupplierAddress, selectedCurrencyType, exchangeRate]);

  useEffect(() => {
    showForm();
  }, [showForm]);

  const selectedSupplierAddressDetail = useMemo(() => {
    if (!selectedSupplierAddress) return;
    const filtered = supplierAddressList?.data?.filter(
      ({ id: supAddId }: { id: string }) => supAddId === selectedSupplierAddress,
    );
    return filtered;
  }, [selectedSupplierAddress, supplierAddressList]);

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  console.log('selectedSupplierAddress', selectedSupplierAddress);
  console.log('selectedSupplierAddressDetail', selectedSupplierAddressDetail);

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
              disabled={!poItems?.length || isLoadingSubmitPO}
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

      <Row className='w-full h-full pb-80'>
        <Col span={24}>
          <Form
            className='h-full'
            form={form}
            layout='vertical'
            requiredMark={false}
            name='create-po-form'
            id='create-po-form'
            onFinish={onSubmitCreatePO}
            autoComplete='off'
          >
            <Row gutter={[8, 8]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label='Supplier Name'
                  name='supplier_name'
                  rules={[{ required: true, message: 'Input item name!' }]}
                >
                  <Select
                    disabled={preOrderState === 'edit' || preOrderState === 'view'}
                    loading={preOrderState === 'edit' ? false : isSupplierLoading}
                    size='large'
                    placeholder='Choose supplier'
                    style={{ width: '100%' }}
                    onChange={onChangeSupplier}
                    filterOption={filterOption}
                    showSearch
                    options={suppliersList}
                  />
                </Form.Item>
              </Col>
              {isFormShow.isSupplierAddress && (
                <Col xs={24} md={6} className='relative'>
                  <Form.Item
                    label='Supplier Address'
                    name='supplier_address_id'
                    rules={[{ required: true, message: 'Input supplier address!' }]}
                  >
                    <Select
                      disabled={preOrderState === 'edit' || preOrderState === 'view'}
                      loading={preOrderState === 'edit' ? false : isSupplierLoading}
                      size='large'
                      placeholder='Choose supplier address'
                      style={{ width: '100%' }}
                      options={modifiedSupplierAddress}
                    />
                  </Form.Item>
                </Col>
              )}
              {isFormShow.isPoNumber && (
                <Col xs={24} md={6} className='p-0'>
                  <Alert
                    className='relative'
                    message={
                      <>
                        <Tooltip title='Supplier address info'>
                          <InfoCircleTwoTone className='absolute top-2 right-2' />
                        </Tooltip>
                        <Space className='relative' size={0} direction='vertical'>
                          <p>Phone: {selectedSupplierAddressDetail?.[0]?.phone ?? '-'}</p>
                          <p>PIC: {selectedSupplierAddressDetail?.[0]?.pic ?? '-'}</p>
                          <p>Fax: {selectedSupplierAddressDetail?.[0]?.fax ?? '-'}</p>
                        </Space>
                      </>
                    }
                    type='info'
                  />
                </Col>
              )}

              {isFormShow.isPoNumber && (
                <Col xs={24} md={preOrderState === 'view' ? 12 : 10}>
                  <Form.Item
                    className=''
                    label='PO Number'
                    name='po_number'
                    rules={[{ required: true, message: 'Input Po number!' }]}
                  >
                    <Input size='large' placeholder='Input PO number' disabled={preOrderState === 'view'} />
                  </Form.Item>
                </Col>
              )}
              {isFormShow.isPoNumber && preOrderState === 'edit' && (
                <Col xs={24} md={2}>
                  <Form.Item label={' '} name=''>
                    <VIPButton type='primary' onClick={() => onSubmitUpdatePo(getUpdatePoPayload(), id)}>
                      Save
                    </VIPButton>
                  </Form.Item>
                </Col>
              )}

              {isFormShow.isCurrency && (
                <Col xs={24} md={3}>
                  <Form.Item
                    label='Currency'
                    name='currency_type'
                    rules={[{ required: true, message: 'Input currency type!' }]}
                  >
                    <Select
                      disabled={preOrderState === 'edit' || preOrderState === 'view'}
                      loading={preOrderState === 'edit' ? false : isSupplierLoading}
                      size='large'
                      placeholder='Choose currency type'
                      style={{ width: '100%' }}
                      options={CURRENCY_TYPE}
                    />
                  </Form.Item>
                </Col>
              )}
              {isFormShow.isExchangeRate && (
                <Col xs={24} md={9}>
                  <Form.Item
                    label='Exchange Rate'
                    name='exchange_rate'
                    rules={[{ required: true, message: 'Input exchange rate!' }]}
                  >
                    <InputNumber
                      disabled={preOrderState === 'edit' || preOrderState === 'view'}
                      formatter={thousandFormatter}
                      className='w-full'
                      type='tel'
                      size='large'
                      placeholder='Input exchange rate'
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Form.List name='po_items'>
              {(fields, { add, remove }) => (
                <>
                  {fields?.map(({ key, name, ...restField }, index) => {
                    const getFormValue = (name: number) => {
                      const fieldsValue = form.getFieldsValue();
                      return fieldsValue.po_items[name];
                    };
                    return (
                      <div key={`${name}-${key}-${getFormValue(name)?.item_id}`}>
                        {index !== 0 && index !== fields.length && <Divider key={key} className='mt-1 mb-1' />}
                        <Row gutter={[12, 12]} className='p-3'>
                          <Col xs={24} lg={6}>
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
                      </div>
                    );
                  })}
                  {preOrderState === 'edit' || preOrderState === 'create' ? (
                    <Form.Item className='mt-3'>
                      <VIPButton type='primary' disabled={!isAbleToAdd} onClick={() => add()} icon={<PlusOutlined />}>
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

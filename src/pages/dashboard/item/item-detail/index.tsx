import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Input, Row, Form, Divider, message, Table, Button, InputNumber } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getItem, updateItem } from 'api/items';
import { VIPButton } from 'components/button';
import { Item } from 'types/Item';
import { getItemStocks } from 'api/stocks';
import { QueryParams } from 'types/types';
import { Stock } from 'types/Stocks';
import { format, fromUnixTime } from 'date-fns';
import { dollarFormatter, thousandFormatter } from 'utils';
import { StockModal } from 'pages/dashboard/stock/components/StockModal';
import { useStock } from 'pages/dashboard/stock/hooks/useStock';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

export const ItemDetail = () => {
  const queryClient = useQueryClient();

  const {
    isStockModalOpen,
    onCloseStockModal,
    onOpenStockModal,
    onSubmitDeleteStock,
    onSubmitUpdateStock,
    selectedStockModal,
    setSelectedStockModal,
  } = useStock();

  const [tableParams, setTableParams] = useState<QueryParams>({
    pagination: { page: 1, limit: 5 },
    query: { item_name: '', item_supplier_name: '' },
  });
  const [isFormDisable, setIsFormDisable] = useState(true);
  const [form] = Form.useForm();

  const params = useParams();
  const { id = '' } = params;

  const { isLoading: isLoadingFetchItem, data: itemData } = useQuery({
    queryFn: () => getItem(id),
    queryKey: ['itemDetail'],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const itemUpdateMutation = useMutation({
    mutationKey: ['itemUpdate'],
    mutationFn: (value: Item) => {
      return updateItem(value);
    },
    onSuccess: () => {
      message.success('Item updated!');
      queryClient.invalidateQueries(['itemList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  useEffect(() => {
    const initFormValue = () => form.setFieldsValue(itemData?.data);

    initFormValue();
  }, [itemData, form]);

  const onClickEditItem = () => setIsFormDisable(false);

  const onSubmitForm = (value: Item) => {
    itemUpdateMutation.mutate({
      ...value,
      id,
    });
  };

  const {
    isLoading: isLoadingFetchStocks,
    data: stocksData,
    refetch,
  } = useQuery({
    queryFn: () => getItemStocks({ pagination: { page: 1, limit: 5 }, id }),
    queryKey: ['stocksList'],
    refetchOnWindowFocus: false,
    retry: false,
  });

  // STOCKS RELATED ****************************************************************************************** //
  const dataSource: Stock[] = useMemo(() => {
    return stocksData?.data ?? [];
  }, [stocksData]);

  const columns = [
    { title: 'Lot Number', dataIndex: 'lot_number', key: 'lot_number' },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value: number) => thousandFormatter(value?.toString()),
    },
    {
      title: 'Price',
      dataIndex: 'buy_price',
      key: 'buy_price',
      render: (value: number) => dollarFormatter(value.toString()),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value: number) => (value ? format(new Date(fromUnixTime(value)), 'PP') : '-'),
    },

    {
      title: 'Expired Date',
      dataIndex: 'expired_date',
      key: 'expired_date',
      render: (value: number) => (value ? format(new Date(fromUnixTime(value)), 'PP') : '-'),
    },
    {
      title: 'Action',
      key: 'update_action',
      render: (_: any, value: Stock) => (
        <Row gutter={[8, 8]}>
          <Col>
            <Button
              shape='circle'
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStockModal(value);
                onOpenStockModal('update');
              }}
            />
          </Col>
          <Col>
            <Button
              shape='circle'
              danger
              icon={<CloseOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStockModal(value);
                onOpenStockModal('delete');
              }}
            />
          </Col>
        </Row>
      ),
    },
  ];

  const onTableChange = (event: any) => {
    const paginationPayload = tableParams;
    paginationPayload.pagination = {
      page: event.current,
      limit: 5,
    };
    setTableParams(paginationPayload);
    refetch();
  };

  return (
    <>
      <StockModal
        isOpen={isStockModalOpen === 'update'}
        onCancel={onCloseStockModal}
        onSubmit={onSubmitUpdateStock}
        selectedStockModal={selectedStockModal}
        type='update'
      />
      <StockModal
        isOpen={isStockModalOpen === 'delete'}
        onCancel={onCloseStockModal}
        onSubmit={onSubmitDeleteStock}
        selectedStockModal={selectedStockModal}
        type='delete'
      />
      <Row className='min-h-screen pb-96'>
        <Row className='w-full shadow-sm bg-white rounded-md px-5 md:px-8'>
          <Row align='middle' className='w-full h-[40px] mt-5' justify='space-between'>
            <Col>
              <p className='text-left font-bold text-lg'>Item Detail</p>
            </Col>
            <Col>
              <VIPButton size='middle' onClick={onClickEditItem}>
                Edit Item
              </VIPButton>
            </Col>
          </Row>
          <Divider />
          <Row className='w-full'>
            <Col span={24}>
              <Form
                form={form}
                layout='vertical'
                style={{ maxWidth: 600 }}
                name='edit-item-detail-form'
                requiredMark={false}
                onFinish={onSubmitForm}
                disabled={isFormDisable || isLoadingFetchItem || isLoadingFetchStocks}
              >
                <Form.Item
                  className='mb-5'
                  label='Item Name'
                  name='name'
                  rules={[{ required: true, message: 'Input item name!' }]}
                >
                  <Input size='large' placeholder='Input item name' />
                </Form.Item>
                <Form.Item
                  className='mb-5'
                  label='Supplier Name'
                  name='supplier_name'
                  rules={[{ required: true, message: 'Input supplier name!' }]}
                >
                  <Input size='large' placeholder='Input supplier name' />
                </Form.Item>
                <Form.Item
                  className='mb-5'
                  label='Serial Number'
                  name='serial_number'
                  rules={[{ required: true, message: 'Input serial number!' }]}
                >
                  <Input size='large' placeholder='Input serial number' />
                </Form.Item>
                <Form.Item
                  className='mb-5'
                  label='Packaging Type'
                  name='packaging_type'
                  rules={[{ required: true, message: 'Input packaging type!' }]}
                >
                  <Input size='large' placeholder='Input packaging type' />
                </Form.Item>
                <Form.Item
                  className='mb-5'
                  label='Packaging Volume'
                  name='packaging_volume'
                  rules={[{ required: true, message: 'Input packaging volume!' }]}
                >
                  <InputNumber
                    formatter={(value: number | undefined) => thousandFormatter(value?.toString())}
                    className='w-full'
                    type='tel'
                    size='large'
                    placeholder='Input packaging volume'
                  />
                </Form.Item>

                <Form.Item>
                  <VIPButton disabled={isFormDisable} size='large' className='w-full' htmlType='submit'>
                    Submit
                  </VIPButton>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Row>
        <Row className='mt-3 w-full shadow-sm bg-white rounded-md'>
          <Table
            scroll={{ x: 300 }}
            onChange={onTableChange}
            rowKey='id'
            className='w-full'
            dataSource={dataSource}
            columns={columns}
            loading={isLoadingFetchStocks}
            pagination={{
              defaultPageSize: 5,
              pageSize: 5,
              total: stocksData?.metadata?.total_items,
            }}
          />
        </Row>
      </Row>
    </>
  );
};

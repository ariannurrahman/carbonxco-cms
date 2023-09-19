import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Input, Row, Form, Divider, message, Table } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getItem, updateItem } from 'api/items';
import { VIPButton } from 'components/button';
import { Item } from 'types/Item';
import { getStocks } from 'api/stocks';
import { QueryParams } from 'types/types';
import { Stock } from 'types/Stocks';
import { format, fromUnixTime } from 'date-fns';
import { UpdateStockModal } from './UpdateStockModal';
import { DeleteStockModal } from './DeleteStockModal';

export const ItemDetail = () => {
  const queryClient = useQueryClient();
  const [tableParams, setTableParams] = useState<QueryParams>({
    pagination: { page: 1, limit: 5 },
    query: { item_name: '', item_supplier_name: '' },
  });
  const [isFormDisable, setIsFormDisable] = useState(true);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteStockModal, setIsOpenDeleteStockModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock>();
  const [form] = Form.useForm();

  const params = useParams();
  const { id = '' } = params;

  const { isLoading: isLoadingFetchItem, data: itemData } = useQuery({
    queryFn: () => getItem(id),
    queryKey: ['itemDetail'],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const mutate = useMutation({
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
    const initFormValue = () =>
      form.setFieldsValue({
        name: itemData?.data?.name,
        supplier_name: itemData?.data?.supplier_name,
        serial_number: itemData?.data?.serial_number,
      });

    initFormValue();
  }, [itemData, form]);

  const onClickEditItem = () => setIsFormDisable(false);

  const onSubmitForm = (value: Item) => {
    mutate.mutate({
      ...value,
      id,
    });
  };

  const {
    isLoading: isLoadingFetchStocks,
    data: stocksData,
    refetch,
  } = useQuery({
    queryFn: () => getStocks({ pagination: { page: 1, limit: 5 }, id }),
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
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Quantity Type', dataIndex: 'quantity_type', key: 'quantity_type' },
    {
      title: 'Expired Date',
      dataIndex: 'expired_date',
      key: 'expired_date',
      render: (value: number) => (value ? format(new Date(fromUnixTime(value)), 'PP') : '-'),
    },
    {
      title: 'Action',
      key: 'update_action',
      render: (value: Stock) => (
        <Row gutter={[8, 8]}>
          <Col>
            <VIPButton onClick={() => onOpenUpdateStockModal(value)}>Edit</VIPButton>
          </Col>
          <Col>
            <VIPButton danger onClick={() => onOpenDeleteStockModal(value)}>
              Delete
            </VIPButton>
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

  // UPDATE STOCKS RELATED ****************************************************************************************** //

  const onOpenUpdateStockModal = (value: Stock) => {
    setSelectedStock(value);
    setIsOpenUpdateModal(true);
  };
  const onCloseUpdateStockModal = () => setIsOpenUpdateModal(false);

  const onOpenDeleteStockModal = (value: Stock) => {
    setSelectedStock(value);
    setIsOpenDeleteStockModal(true);
  };
  const onCloseDeleteStockModal = () => setIsOpenDeleteStockModal(false);
  return (
    <>
      <UpdateStockModal data={selectedStock} onClose={onCloseUpdateStockModal} isOpen={isOpenUpdateModal} />
      <DeleteStockModal data={selectedStock} onClose={onCloseDeleteStockModal} isOpen={isOpenDeleteStockModal} />
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
                <Form.Item label='Item Name' name='name' rules={[{ required: true, message: 'Input item name!' }]}>
                  <Input size='large' placeholder='Input item name' />
                </Form.Item>
                <Form.Item
                  label='Supplier Name'
                  name='supplier_name'
                  rules={[{ required: true, message: 'Input supplier name!' }]}
                >
                  <Input size='large' placeholder='Input supplier name' />
                </Form.Item>
                <Form.Item
                  label='Serial Number'
                  name='serial_number'
                  rules={[{ required: true, message: 'Input serial number!' }]}
                >
                  <Input size='large' placeholder='Input serial number' />
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

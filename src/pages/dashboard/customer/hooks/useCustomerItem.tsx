import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateCustomerItemPayload,
  CustomerItem,
  CustomerItemQueryParams,
  UpdateCustomerItemPayload,
} from 'types/Customer';
import { createCustomerItem, getAllCustomerItems, updateCustomerItem } from 'api/customer';
import { Button, Col, Row, message } from 'antd';
import { dollarFormatter, thousandFormatter } from 'utils';
import { EditOutlined } from '@ant-design/icons';

export const useCustomerItem = (customerId: string) => {
  const queryClient = useQueryClient();
  const [isCreateCustomerItemModalOpen, setIsCreateCustomerItemModalOpen] = useState(false);
  const [isUpdateCustomerItemModalOpen, setIsUpdateCustomerItemModalOpen] = useState(false);
  const [selectedCustomerItem, setSelectedCustomerItem] = useState<CustomerItem>({
    bind_price: 0,
    id: '',
    item: {
      id: '',
      name: '',
      packaging_type: '',
      packaging_volume: 0,
      serial_number: '',
      supplier_name: '',
    },
  });
  const [tableParams, setTableParams] = useState<CustomerItemQueryParams>({
    pagination: { page: 1, limit: 5 },
    query: { query_item_name: '' },
    customerId,
  });

  const onTableChange = (event: any) => {
    const paginationPayload = tableParams;
    paginationPayload.pagination = {
      page: event.current,
      limit: 5,
    };
    setTableParams(paginationPayload);
    refetchCustomerItemList();
  };

  // GET ALL RELATED ************************************************************************************************************************
  const fetchCustomerItems = useCallback(async () => {
    return await getAllCustomerItems({
      pagination: { page: tableParams.pagination.page, limit: tableParams.pagination.limit },
      query: {
        query_item_name: tableParams.query.query_item_name,
      },
      customerId,
    });
  }, [tableParams, customerId]);

  const {
    isLoading: isLoadingCustomerItemList,
    data: customerItemList,
    refetch: refetchCustomerItemList,
  } = useQuery({
    queryFn: fetchCustomerItems,
    queryKey: ['customerItemList', tableParams],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const customerItemListDataSource: CustomerItem[] = useMemo(() => {
    return customerItemList?.data ?? [];
  }, [customerItemList]);

  const customerItemListColumn = [
    { title: 'Item Name', dataIndex: ['item', 'name'], key: 'name' },
    {
      title: 'Price',
      dataIndex: 'bind_price',
      key: 'bind_price',
      render: (value: number) => dollarFormatter(value.toString()),
    },
    { title: 'Packaging Type', dataIndex: ['item', 'packaging_type'], key: 'packaging_type' },
    {
      title: 'Packaging Volume',
      dataIndex: ['item', 'packaging_volume'],
      key: 'packaging_volume',
      render: (value: number) => thousandFormatter(value.toString()),
    },
    { title: 'Serial number', dataIndex: ['item', 'serial_number'], key: 'serial_number' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, data: CustomerItem) => {
        return (
          <Row>
            <Col>
              <Button
                shape='circle'
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenUpdateCustomerItemModal(data);
                }}
              />
            </Col>
            <Col></Col>
          </Row>
        );
      },
    },
  ];

  // CREATE CUSTOMER ITEM RELATED ************************************************************************************************************************
  const onOpenCreateCustomerItemModal = () => setIsCreateCustomerItemModalOpen(true);
  const onCloseCreateCustomerItemModal = () => setIsCreateCustomerItemModalOpen(false);

  const createCustomerItemMutation = useMutation({
    mutationKey: ['customerItemList'],
    mutationFn: (value: CreateCustomerItemPayload) => {
      return createCustomerItem({ ...value, customer_id: customerId });
    },
    onSuccess: () => {
      message.success('Item added!');
      onCloseCreateCustomerItemModal();
      queryClient.invalidateQueries(['customerItemList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitCreateCustomerItem = (value: CreateCustomerItemPayload) => {
    createCustomerItemMutation.mutate(value);
  };

  // UPDATE CUSTOMER ITEM RELATED ************************************************************************************************************************

  const onOpenUpdateCustomerItemModal = (item: CustomerItem) => {
    setSelectedCustomerItem(item);
    setIsUpdateCustomerItemModalOpen(true);
  };
  const onCloseUpdateCustomerItemModal = () => setIsUpdateCustomerItemModalOpen(false);

  const updateCustomerItemMutation = useMutation({
    mutationKey: ['customerItemList'],
    mutationFn: (value: UpdateCustomerItemPayload) => {
      return updateCustomerItem(value);
    },
    onSuccess: () => {
      message.success('Item updated!');
      onCloseUpdateCustomerItemModal();
      queryClient.invalidateQueries(['customerItemList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitUpdateCustomerItem = (value: UpdateCustomerItemPayload) => {
    updateCustomerItemMutation.mutate(value);
  };

  return {
    customerItemListColumn,
    customerItemListDataSource,
    isCreateCustomerItemModalOpen,
    isLoadingCustomerItemList,
    isUpdateCustomerItemModalOpen,
    onCloseCreateCustomerItemModal,
    onCloseUpdateCustomerItemModal,
    onOpenCreateCustomerItemModal,
    onSubmitCreateCustomerItem,
    onSubmitUpdateCustomerItem,
    onTableChange,
    selectedCustomerItem,
  };
};

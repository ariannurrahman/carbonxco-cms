import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createCustomer, getAllCustomer, updateCustomer } from 'api/customer';
import { CreateCustomerPayload, Customer, CustomerQueryParams, CustomerSearchQuery } from 'types/Customer';

export const useCustomer = (limit: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isCreateCustomerModalOpen, setIsCreateCustomerModalOpen] = useState(false);
  const [isUpdateCustomerModalOpen, setIsUpdateCustomerModalOpen] = useState(false);
  const [selectedCustomerUpdate, setSelectedCustomerUpdate] = useState<Customer>({
    id: '',
    name: '',
    payment_term: '',
    address: '',
    invoice_address: '',
    block_status: '',
  });
  const [tableParams, setTableParams] = useState<CustomerQueryParams>({
    pagination: { page: 1, limit },
    query: { query_customer_name: '', query_customer_address: '' },
  });

  const onRowClick = (record: any) => {
    navigate(`/dashboard/customer/${record.id}`);
  };

  const onTableChange = (event: any) => {
    const paginationPayload = tableParams;
    paginationPayload.pagination = {
      page: event.current,
      limit: 5,
    };
    setTableParams(paginationPayload);
    refetchCustomerList();
  };

  // GET ALL RELATED ************************************************************************************************************************
  const fetchCustomers = useCallback(async () => {
    return await getAllCustomer({
      pagination: { page: tableParams.pagination.page, limit: tableParams.pagination.limit },
      query: {
        query_customer_name: tableParams.query.query_customer_name,
        query_customer_address: tableParams.query.query_customer_address,
      },
    });
  }, [tableParams]);

  const {
    isLoading: isLoadingCustomerList,
    data: customerList,
    refetch: refetchCustomerList,
  } = useQuery({
    queryFn: fetchCustomers,
    queryKey: ['customerList', tableParams],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const dataSource: any[] = useMemo(() => {
    return customerList?.data ?? [];
  }, [customerList]);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Payment Terms (Days)', dataIndex: 'payment_term', key: 'payment_term' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Invoice Address', dataIndex: 'invoice_address', key: 'invoice_address' },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, data: Customer) => (
        <Button
          shape='circle'
          icon={<EditOutlined />}
          onClick={(e) => {
            onClickOpenUpdateCustomerModal();
            setSelectedCustomerUpdate(data);
            e.stopPropagation();
          }}
        />
      ),
    },
  ];

  const onSubmitSearch = (value: CustomerSearchQuery) => {
    const searchPayload = tableParams;
    searchPayload.query = value;
    searchPayload.pagination = {
      page: 1,
      limit: 15,
    };
    setTableParams(searchPayload);
    refetchCustomerList();
  };

  // CREATE CUSTOMER RELATED  ************************************************************************************************************************
  const onClickOpenCustomerModal = () => setIsCreateCustomerModalOpen(true);
  const onClickCloseCustomerModal = () => setIsCreateCustomerModalOpen(false);

  const createCustomerMutation = useMutation({
    mutationKey: ['createCustomer'],
    mutationFn: (value: CreateCustomerPayload) => {
      return createCustomer(value);
    },
    onSuccess: () => {
      message.success('Customer added!');
      onClickCloseCustomerModal();
      queryClient.invalidateQueries(['customerList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitCreateCustomer = (value: CreateCustomerPayload) => {
    createCustomerMutation.mutate(value);
  };

  // EDIT CUSTOMER RELATED  ************************************************************************************************************************
  const onClickOpenUpdateCustomerModal = () => setIsUpdateCustomerModalOpen(true);
  const onClickCloseUpdateCustomerModal = () => setIsUpdateCustomerModalOpen(false);

  const updateCustomerMutation = useMutation({
    mutationKey: ['updateCustomer'],
    mutationFn: (data: Customer) => {
      return updateCustomer(data);
    },
    onSuccess: () => {
      message.success('Customer updated!');
      onClickCloseUpdateCustomerModal();
      queryClient.invalidateQueries(['customerList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitUpdateCustomer = (data: Customer) => {
    updateCustomerMutation.mutate(data);
  };

  return {
    columns,
    customerList,
    dataSource,
    isCreateCustomerModalOpen,
    isLoadingCustomerList,
    isLoadingSubmit: updateCustomerMutation.isLoading || createCustomerMutation.isLoading,
    isUpdateCustomerModalOpen,
    onClickCloseCustomerModal,
    onClickCloseUpdateCustomerModal,
    onClickOpenCustomerModal,
    onClickOpenUpdateCustomerModal,
    onRowClick,
    onSubmitCreateCustomer,
    onSubmitSearch,
    onSubmitUpdateCustomer,
    onTableChange,
    selectedCustomerUpdate,
  };
};

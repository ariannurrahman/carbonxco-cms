import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

import { CreateItemPayload, createItem, getAllItem } from 'api/items';

interface TableDataProps {
  item_name: string;
  serial_number: string;
  supplier_name: string;
  id: string;
}

interface TableParams {
  pagination: {
    page: number;
    limit: number;
  };
  query: {
    query_item_name: string;
    query_item_supplier_name: string;
  };
}

export const useItem = () => {
  const navigate = useNavigate();

  const onRowClick = (record: TableDataProps) => {
    navigate(`/dashboard/item/${record.id}`);
  };

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { page: 1, limit: 15 },
    query: { query_item_supplier_name: '', query_item_name: '' },
  });

  // eslint-disable-next-line
  console.log(setTableParams);

  const fetchItems = useCallback(async () => {
    return await getAllItem({
      pagination: { page: tableParams.pagination.page, limit: tableParams.pagination.limit },
      query: {
        query_item_supplier_name: tableParams.query?.query_item_supplier_name,
        query_item_name: tableParams.query?.query_item_name,
      },
    });
  }, [tableParams]);

  const { isLoading: isLoadingItemList, data } = useQuery({
    queryFn: fetchItems,
    queryKey: ['itemList'],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const dataSource = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const columns: ColumnsType<TableDataProps> = [
    { title: 'Item Name', dataIndex: 'item_name', key: 'item_name' },
    { title: 'Supplier Name', dataIndex: 'serial_number', key: 'serial_number' },
    { title: 'Serial Number', dataIndex: 'supplier_name', key: 'supplier_name' },
  ];

  const onTableChange = (event: any) => {
    console.log('event', event);
  };

  const onOpenItemModal = () => {
    setIsItemModalOpen(true);
  };

  const onCloseItemModal = () => {
    setIsItemModalOpen(false);
  };

  const mutation = useMutation({
    mutationKey: ['itemList'],
    mutationFn: (value: CreateItemPayload) => {
      return createItem(value);
    },
    onSuccess: () => {
      message.success('Item added!');
      onCloseItemModal();
      fetchItems();
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitItemForm = (value: CreateItemPayload) => {
    mutation.mutate(value);
  };

  return {
    isItemModalOpen,
    isLoadingItemList,
    itemColumns: columns,
    itemDataSource: dataSource,
    onCloseItemModal,
    onOpenItemModal,
    onRowClick,
    onSubmitItemForm,
    onTableChange,
    tableParams,
  };
};

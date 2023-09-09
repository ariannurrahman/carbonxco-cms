import { useQuery } from '@tanstack/react-query';
import { ColumnsType } from 'antd/es/table';
import { useCallback, useMemo, useState } from 'react';

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

export const usePreOrder = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { page: 1, limit: 15 },
    query: { query_item_supplier_name: '', query_item_name: '' },
  });

  const fetchItems = useCallback(async () => {
    // return await getAllItem({
    //   pagination: { page: tableParams.pagination.page, limit: tableParams.pagination.limit },
    //   query: {
    //     query_item_supplier_name: tableParams.query?.query_item_supplier_name,
    //     query_item_name: tableParams.query?.query_item_name,
    //   },
    // });
  }, []);

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

  return {
    columns,
    dataSource,
  };
};

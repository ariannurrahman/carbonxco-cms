import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Row, message, Tooltip } from 'antd';
import { fromUnixTime, format } from 'date-fns';

import { getSuppliers } from 'api/supplier';
import { getAllItem } from 'api/items';
import { createPO, getDetailPreOrder, getPreOrder, updatePreOrder } from 'api/pre-order';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useChangeStatusModal } from './useChangeStatusModal';
import { SearchQuery } from 'types/types';
import { POTableDataProps, PoPayload, PoState, PoTableParams, Status } from 'types/Po';

export const usePreorder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preOrderState: PoState = location.state;
  const { id } = useParams();

  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [tableParams, setTableParams] = useState<PoTableParams>({
    pagination: { page: 1, limit: 5 },
    query: { item_supplier_name: '' },
  });

  const queryClient = useQueryClient();
  const {
    isLoadingSubmit,
    isModalOpen,
    onOpenConfirmModal,
    onOpenCancelModal,
    onOpenCompleteModal,
    onSubmitChangeStatusModal,
    onCancelModal,
  } = useChangeStatusModal();

  const onGoToCreatePO = () => navigate('/dashboard/pre-order/create', { state: 'create' });
  const onEditPo = (id: string) => {
    navigate(`/dashboard/pre-order/edit/${id}`, { state: 'edit' });
  };

  const fetchPO = async () => {
    return await getPreOrder(tableParams);
  };

  const {
    isLoading: isPoListLoading,
    data: poList,
    refetch,
  } = useQuery({
    queryFn: fetchPO,
    queryKey: ['poList', tableParams],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const poDataSource: POTableDataProps[] = useMemo(() => {
    return poList?.data ?? [];
  }, [poList]);

  const poColumns: ColumnsType<POTableDataProps> = [
    { title: 'Supplier Name', dataIndex: 'supplier_name', key: 'supplier_name', width: 100, fixed: 'left' },
    {
      title: 'ETA',
      dataIndex: 'eta',
      key: 'eta',
      width: 100,
      render: (value: number) => {
        if (!value) return '-';
        return format(fromUnixTime(value), 'PP');
      },
    },
    {
      title: 'ETD',
      dataIndex: 'etd',
      key: 'etd',
      width: 100,
      render: (value: number) => {
        if (!value) return '-';
        return format(fromUnixTime(value), 'PP');
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 300,
      render: (status: Status, data) => {
        const id = data.id;
        return (
          <Row className='w-full'>
            <Col span={6}>{status.toUpperCase()}</Col>
            <Col span={18}>
              <Row gutter={[8, 8]}>
                {status !== 'canceled' && status !== 'completed' && (
                  <>
                    {status === 'confirm' && (
                      <Col>
                        <Tooltip placement='topLeft' title='Complete PO'>
                          <Button
                            onClick={() => onOpenCompleteModal(id)}
                            type='primary'
                            className='bg-[#1677ff]'
                            icon={<CheckOutlined />}
                          >
                            Complete
                          </Button>
                        </Tooltip>
                      </Col>
                    )}
                    {status === 'draft' && (
                      <Col>
                        <Tooltip placement='topLeft' title='Confirm PO'>
                          <Button
                            onClick={() => onOpenConfirmModal(id)}
                            type='primary'
                            className='bg-[#1677ff]'
                            icon={<CheckOutlined />}
                          >
                            Confirm
                          </Button>
                        </Tooltip>
                      </Col>
                    )}
                    <Col>
                      <Tooltip placement='topLeft' title='Edit PO'>
                        <Button shape='circle' icon={<EditOutlined />} onClick={() => onEditPo(id)} />
                      </Tooltip>
                    </Col>
                    <Col>
                      <Tooltip placement='topLeft' title='Cancel PO'>
                        <Button onClick={() => onOpenCancelModal(id)} shape='circle' icon={<CloseOutlined />} danger />
                      </Tooltip>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        );
      },
    },
  ];

  const onSubmitSearch = (value: SearchQuery) => {
    const searchPayload = tableParams;
    searchPayload.query = value;
    searchPayload.pagination = {
      page: 1,
      limit: 5,
    };
    setTableParams(searchPayload);
    refetch();
  };

  const onTableChange = (event: any) => {
    const paginationPayload = tableParams;
    paginationPayload.pagination = {
      page: event.current,
      limit: 5,
    };
    setTableParams(paginationPayload);
    refetch();
  };

  // Create PO Related
  // ************************************************************************************************************************************ //

  const onChangeSupplier = (supplierValue: string) => setSelectedSupplier(supplierValue);

  const fetchSuppliers = async () => {
    return await getSuppliers({
      pagination: { page: 1, limit: 999 },
      query: { item_name: '', item_supplier_name: '' },
    });
  };

  const { isLoading: isSupplierLoading, data: supplier } = useQuery({
    queryFn: fetchSuppliers,
    queryKey: ['supplierList'],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: preOrderState === 'create',
  });

  const modifiedSupplier = useMemo(() => {
    return supplier?.data.map((eachSupplier) => {
      return { label: eachSupplier, value: eachSupplier };
    });
  }, [supplier]);

  const fetchItems = useCallback(async () => {
    return await getAllItem({
      pagination: { page: 1, limit: 999 },
      query: {
        item_supplier_name: selectedSupplier,
      },
    });
  }, [selectedSupplier]);

  const { isLoading: isItemLoading, data: items } = useQuery({
    queryFn: fetchItems,
    queryKey: ['itemList'],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!selectedSupplier,
  });

  const modifiedItems = useMemo(() => {
    return items?.data.map((eachItem) => {
      return { label: eachItem.name, value: eachItem.id };
    });
  }, [items]);

  const mutationCreatePo = useMutation({
    mutationKey: ['preOrderList'],
    mutationFn: (value: PoPayload) => {
      return createPO(value);
    },
    onSuccess: () => {
      message.success('PO created!');
      queryClient.invalidateQueries(['preOrderList']);
      navigate('/dashboard/pre-order');
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitCreatePO = (value: PoPayload) => {
    mutationCreatePo.mutate(value);
  };

  // Edit PO Related
  // ************************************************************************************************************************************ //

  const fetchDetailPreOrder = async () => {
    if (!id) return;
    const response = await getDetailPreOrder(id);
    setSelectedSupplier(response?.data?.po_order?.supplier_name);
    return response;
  };

  const { isLoading: isDetailPreOrderLoading, data: detailPreOrder } = useQuery({
    queryFn: fetchDetailPreOrder,
    queryKey: ['preOrderDetail'],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: preOrderState === 'edit',
  });

  const mutationEdit = useMutation({
    mutationKey: ['preOrderList', 'preOrderDetail'],
    mutationFn: (value: PoPayload) => {
      return updatePreOrder(id ?? '-', value);
    },
    onSuccess: () => {
      message.success('PO created!');
      queryClient.invalidateQueries(['preOrderList']);
      navigate('/dashboard/pre-order');
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitEditPO = (values: PoPayload) => {
    mutationEdit.mutate(values);
  };

  return {
    isItemLoading,
    isLoadingSubmitPO: mutationCreatePo.isLoading,
    isPoListLoading: isPoListLoading,
    isSupplierLoading,
    itemsList: modifiedItems,
    onChangeSupplier,
    onGoToCreatePO,
    onSubmitCreatePO,
    onSubmitSearch,
    onTableChange,
    poColumns,
    poDataSource,
    poList,
    selectedSupplier,
    suppliersList: modifiedSupplier,
    tableParams: tableParams,
    isDetailPreOrderLoading,
    detailPreOrder,
    preOrderState,
    onSubmitEditPO,
    // Modal Props
    isLoadingSubmit,
    isModalOpen,
    onCancelModal,
    onOpenCancelModal,
    onOpenCompleteModal,
    onOpenConfirmModal,
    onSubmitChangeStatusModal,
  };
};

import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Row, message } from 'antd';
import { getSuppliers } from 'api/supplier';
import {
  GetAllSupplierAddressParams,
  createSupplierAddress,
  deleteSupplierAddress,
  getAllSupplierAddress,
  updateSupplierAddress,
} from 'api/supplier-address';
import { useCallback, useMemo, useState } from 'react';
import { Supplier, SupplierAction } from 'types/SupplierAddress';

export const useSupplierAddress = () => {
  const queryClient = useQueryClient();

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | undefined>({
    supplier_name: '',
    address: '',
    phone: '',
    fax: '',
    pic: '',
  });
  const [tableParams, setTableParams] = useState<GetAllSupplierAddressParams>({
    pagination: {
      page: 1,
      limit: 5,
    },
    query: {
      query_item_supplier_name: '',
    },
  });

  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState({
    create: false,
    delete: false,
    edit: false,
  });

  const onSupplierModalOpen = (type: SupplierAction, supplier: Supplier | undefined) => {
    setIsSupplierModalOpen((prevState) => ({ ...prevState, [type]: true }));
    if (type !== 'create') {
      setSelectedSupplier(supplier);
    }
  };

  const onSupplierModalClose = (type: SupplierAction) => {
    setIsSupplierModalOpen((prevState) => ({ ...prevState, [type]: false }));
    setSelectedSupplier(undefined);
  };

  const onTableChange = (event: any) => {
    const paginationPayload = tableParams;
    paginationPayload.pagination = {
      page: event.current,
      limit: 5,
    };
    setTableParams(paginationPayload);
    refetchSupplierAddressList();
  };

  const fetchAllSupplierAddress = useCallback(async () => {
    console.log('tableParams', tableParams);
    return await getAllSupplierAddress(tableParams);
  }, [tableParams]);

  const {
    data: supplierAddressList,
    isLoading: isSupplierAddressListLoading,
    refetch: refetchSupplierAddressList,
  } = useQuery({
    queryFn: fetchAllSupplierAddress,
    queryKey: ['supplierAddressList', tableParams],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'supplier_name',
      key: 'supplier_name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Fax',
      dataIndex: 'fax',
      key: 'fax',
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
      key: 'pic',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, data: Supplier) => {
        return (
          <Row gutter={[8, 8]}>
            <Col>
              <Button
                shape='circle'
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  onSupplierModalOpen('edit', data);
                }}
              />
            </Col>
            <Col>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onSupplierModalOpen('delete', data);
                }}
                shape='circle'
                icon={<CloseOutlined />}
                danger
              />
            </Col>
          </Row>
        );
      },
    },
  ];

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
    enabled: isSupplierModalOpen.create || isSupplierModalOpen.edit,
  });

  const modifiedSupplier = useMemo(() => {
    return supplier?.data.map((eachSupplier: any) => {
      return { label: eachSupplier, value: eachSupplier };
    });
  }, [supplier]);

  const createSupplierAddressMutation = useMutation({
    mutationKey: ['createSupplierAddress'],
    mutationFn: (payload: Supplier) => {
      return createSupplierAddress(payload);
    },
    onSuccess: () => {
      message.success('Supplier address added!');
      queryClient.invalidateQueries(['supplierAddressList']);
      onSupplierModalClose('create');
    },
    onError: (e: any) => {
      onSupplierModalClose('create');
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const updateSupplierAddressMutation = useMutation({
    mutationKey: ['updateSupplierAddress'],
    mutationFn: ({ payload, id }: { payload: Supplier; id: string }) => {
      return updateSupplierAddress(payload, id);
    },
    onSuccess: () => {
      onSupplierModalClose('edit');
      message.success('Supplier address updated!');
      queryClient.invalidateQueries(['supplierAddressList']);
    },
    onError: (e: any) => {
      onSupplierModalClose('edit');
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const deleteSupplierAddressMutation = useMutation({
    mutationKey: ['deleteSupplierAddress'],
    mutationFn: (id: string) => {
      return deleteSupplierAddress(id);
    },
    onSuccess: () => {
      onSupplierModalClose('delete');
      message.success('Supplier address deleted!');
      queryClient.invalidateQueries(['supplierAddressList']);
    },
    onError: (e: any) => {
      onSupplierModalClose('delete');
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  return {
    columns,
    createSupplierAddressMutation,
    deleteSupplierAddressMutation,
    isSupplierAddressListLoading,
    isSupplierModalOpen,
    isSupplierLoading,
    modifiedSupplier,
    onSupplierModalClose,
    onSupplierModalOpen,
    onTableChange,
    selectedSupplier,
    setTableParams,
    supplierAddressList,
    updateSupplierAddressMutation,
  };
};

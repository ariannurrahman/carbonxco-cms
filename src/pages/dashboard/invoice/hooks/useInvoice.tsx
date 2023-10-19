import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createInvoice, getInvoice } from 'api/invoice';
import { CreateInvoicePayload, InvoiceParams, InvoiceSearchQuery } from 'types/Invoice';
import { dollarFormatter } from 'utils';
import { Button, Col, Row, Tooltip, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { format, fromUnixTime } from 'date-fns';
import { ColumnsType } from 'antd/es/table';

export const useInvoice = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [tableParams, setTableParams] = useState<InvoiceParams>({
    pagination: { page: 1, limit: 5 },
    query: { query_customer_name: '', query_po_number: '' },
  });

  const onTableChange = (event: any) => {
    const paginationPayload = tableParams;
    paginationPayload.pagination = {
      page: event.current,
      limit: 5,
    };
    setTableParams(paginationPayload);
    refetchInvoiceList();
  };
  const onRowClick = (record: any) => {
    navigate(`/dashboard/order-invoice/edit/${record.id}`);
  };
  const onSubmitSearch = (value: InvoiceSearchQuery) => {
    const searchPayload = tableParams;
    searchPayload.query = value;
    searchPayload.pagination = {
      page: 1,
      limit: 15,
    };
    setTableParams(searchPayload);
    refetchInvoiceList();
  };

  const mutationCreateInvoiceOrder = useMutation({
    mutationKey: ['createInvoiceOrder', 'invoiceList'],
    mutationFn: (value: CreateInvoicePayload) => {
      return createInvoice(id ?? '', value);
    },
    onSuccess: () => {
      message.success('Create invoice order success!');
      queryClient.invalidateQueries(['createInvoiceOrder', 'invoiceList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onCreateInvoiceOrder = (value: any) => {
    mutationCreateInvoiceOrder.mutate(value);
  };

  const fetchInvoice = useCallback(async () => {
    return await getInvoice({
      pagination: { page: tableParams.pagination.page, limit: tableParams.pagination.limit },
      query: {
        query_customer_name: tableParams.query.query_customer_name,
        query_po_number: tableParams.query.query_po_number,
      },
    });
  }, [tableParams]);

  const {
    isLoading: isLoadingInvoiceList,
    data: invoiceList,
    refetch: refetchInvoiceList,
  } = useQuery({
    queryFn: fetchInvoice,
    queryKey: ['invoiceList', tableParams],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const invoiceColumn: ColumnsType<any> = [
    { title: 'Customer Name', dataIndex: ['customer', 'name'], key: 'customerName', width: 200, fixed: 'left' },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 120,
      render: (value: number) => dollarFormatter(value.toString()),
    },
    { title: 'PO Number', dataIndex: 'po_number', key: 'po_number', width: 120 },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      width: 140,
      render: (value: number) => (value ? format(new Date(fromUnixTime(value)), 'PP') : '-'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'action',
      width: 300,
      render: () => {
        return (
          <Row gutter={[8, 8]}>
            <Col>
              <Tooltip placement='topLeft' title='Edit'>
                <Button
                  shape='circle'
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement='topLeft' title='Pay'>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type='primary'
                  className='bg-[#1677ff]'
                >
                  Pay
                </Button>
              </Tooltip>
            </Col>

            <Col>
              <Tooltip placement='topLeft' title='Print'>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Print
                </Button>
              </Tooltip>
            </Col>
          </Row>
        );
      },
    },
  ];

  return {
    invoiceColumn,
    invoiceList,
    isLoadingInvoiceList,
    onCreateInvoiceOrder,
    onRowClick,
    onSubmitSearch,
    onTableChange,
  };
};

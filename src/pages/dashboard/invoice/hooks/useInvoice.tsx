import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  checkInvoice,
  createInvoice,
  createInvoiceItem,
  getInvoice,
  payInvoice,
  printInvoice,
  updateInvoice,
  updateInvoiceItem,
} from 'api/invoice';
import {
  CreateInvoicePayload,
  InvoiceDetail,
  InvoiceParams,
  InvoiceSearchQuery,
  UpdateInvoicePayload,
} from 'types/Invoice';
import { thousandFormatter } from 'utils';
import { Button, Col, Row, Tooltip, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { format, fromUnixTime } from 'date-fns';
import { ColumnsType } from 'antd/es/table';
import { InvoicePrintWrapper } from '../components/InvoicePrintWrapper';

interface CheckInvoiceList {
  due: number | undefined;
  id: string | undefined;
}

export const useInvoice = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [checkedInvoiceList, setCheckedInvoiceList] = useState<CheckInvoiceList[]>([]);
  const [selectedCheckedInvoiceId, setSelectedCheckedInvoiceId] = useState<string | undefined>('');
  const [tableParams, setTableParams] = useState<InvoiceParams>({
    pagination: { page: 1, limit: 5 },
    query: { query_customer_name: '', query_po_number: '' },
  });
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

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
    navigate(`/dashboard/order-invoice/view/${record.id}`);
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
      navigate('/dashboard/invoice-po');
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

  const mutationUpdateInvoiceOrder = useMutation({
    mutationKey: ['updateInvoiceOrder', 'invoiceDetail'],
    mutationFn: (value: UpdateInvoicePayload) => {
      return updateInvoice(id ?? '', value);
    },
    onSuccess: () => {
      message.success('Update invoice order success!');
      queryClient.invalidateQueries(['invoiceDetail', 'invoiceList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitUpdateInvoice = (value: UpdateInvoicePayload) => {
    mutationUpdateInvoiceOrder.mutate(value);
  };

  const mutationCreateInvoiceItem = useMutation({
    mutationKey: ['updateInvoiceOrder', 'invoiceDetail'],
    mutationFn: ({ id: invId, value }: any) => {
      return createInvoiceItem(id ?? '', invId, value);
    },
    onSuccess: () => {
      message.success('Create invoice order item success!');
      queryClient.invalidateQueries(['invoiceDetail']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitCreateInvoiceItem = (id: string, value: number) => {
    mutationCreateInvoiceItem.mutate({ id, value });
  };

  const mutationUpdateInvoiceItem = useMutation({
    mutationKey: ['updateInvoiceOrder', 'invoiceDetail'],
    mutationFn: ({ invItemId, quantity }: any) => {
      return updateInvoiceItem(invItemId ?? '', quantity);
    },
    onSuccess: () => {
      message.success('Update invoice order item success!');
      queryClient.invalidateQueries(['createInvoiceOrder', 'invoiceDetail', 'invoiceList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const mutationPayInvoice = useMutation({
    mutationKey: ['updateInvoiceOrder', 'invoiceDetail'],
    mutationFn: (id: string) => {
      return payInvoice(id ?? '');
    },
    onSuccess: () => {
      message.success('Invoice paid!');
      queryClient.invalidateQueries(['invoiceList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const mutationPrintInvoice = useMutation({
    mutationKey: ['updateInvoiceOrder', 'invoiceDetail'],
    mutationFn: ({ invId, isForce }: { invId: string; isForce: boolean }) => {
      return printInvoice(invId ?? '', isForce);
    },
    onSuccess: () => {
      message.success('Invoice approved!');
      queryClient.invalidateQueries(['invoiceList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitUpdateInvoiceItem = (invItemId: string, quantity: number) => {
    mutationUpdateInvoiceItem.mutate({ invItemId, quantity });
  };

  const onClickEditInvoice = (invoiceId: string) => {
    navigate(`/dashboard/order-invoice/edit/${invoiceId}`);
  };

  const onClickOpenPay = () => setIsPayModalOpen(true);
  const onClickClosePay = () => setIsPayModalOpen(false);

  const onClickOpenPrint = () => setIsPrintModalOpen(true);
  const onClickClosePrint = () => setIsPrintModalOpen(false);

  const onClickPayInvoice = (invId: string) => {
    mutationPayInvoice.mutate(invId);
  };

  const onClickApprove = (invoiceId: string, isForce: boolean) => {
    mutationPrintInvoice.mutate({ invId: invoiceId, isForce });
  };

  const { data: invoiceCheckData, isSuccess: isSuccessFetchCheckData } = useQuery({
    queryFn: () => checkInvoice(selectedCheckedInvoiceId ?? ''),
    queryKey: ['invoiceList', checkedInvoiceList],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!selectedCheckedInvoiceId,
  });

  const onClickCheckInvoice = (id: string) => {
    setSelectedCheckedInvoiceId(id);
  };
  const setupCheckedInvoice = useCallback(() => {
    if (!selectedCheckedInvoiceId) return;
    const checkedList = [...checkedInvoiceList];
    if (!checkedList.some(({ id }) => id === selectedCheckedInvoiceId) && isSuccessFetchCheckData) {
      const newChecked = {
        id: selectedCheckedInvoiceId,
        due: invoiceCheckData?.data?.total_due,
      };
      checkedList.push(newChecked);
      setCheckedInvoiceList(checkedList);
    }
  }, [selectedCheckedInvoiceId, invoiceCheckData, checkedInvoiceList, isSuccessFetchCheckData]);

  useEffect(() => {
    setupCheckedInvoice();
  }, [setupCheckedInvoice]);

  const onCloseCheckInvoice = () => {
    setSelectedCheckedInvoiceId('');
  };

  const RenderActionButton = (status: string, invoiceId: string, data: InvoiceDetail) => {
    const isRenderForcePrint = checkedInvoiceList.some(({ id, due }) => invoiceId === id && due === 0);

    return (
      <Row gutter={[8, 8]}>
        <Col>
          <Tooltip placement='topLeft' title='Print'>
            <Button
              style={{ width: 80 }}
              disabled={mutationPrintInvoice.isLoading}
              loading={mutationPrintInvoice.isLoading}
              danger={status === 'due'}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <InvoicePrintWrapper data={data} status={status} />;
            </Button>
          </Tooltip>
        </Col>
        {status === 'draft' ? (
          <>
            <Col>
              <Tooltip placement='topLeft' title='Edit'>
                <Button
                  shape='circle'
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickEditInvoice(invoiceId);
                  }}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement='topLeft' title='Check'>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickCheckInvoice(invoiceId);
                  }}
                >
                  Check
                </Button>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement='topLeft' title='Check'>
                <Button
                  className={`${!isRenderForcePrint ? 'bg-gray-300' : 'bg-[#1677ff]'}`}
                  type='primary'
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickApprove(invoiceId, !isRenderForcePrint);
                  }}
                >
                  {`${!isRenderForcePrint ? 'Force Approve' : 'Approve'}`}
                </Button>
              </Tooltip>
            </Col>
          </>
        ) : null}
        {status === 'approved' || status === 'due' ? (
          <Col>
            <Tooltip placement='topLeft' title='Pay'>
              <Button
                disabled={mutationUpdateInvoiceItem.isLoading}
                loading={mutationUpdateInvoiceItem.isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickPayInvoice(invoiceId);
                }}
                type='primary'
                className='bg-[#1677ff]'
              >
                Pay
              </Button>
            </Tooltip>
          </Col>
        ) : null}
      </Row>
    );
  };

  const invoiceColumn: ColumnsType<any> = [
    { title: 'Customer Name', dataIndex: ['customer', 'name'], key: 'customerName', width: 200, fixed: 'left' },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 120,
      render: (value: number) => `Rp ${thousandFormatter(value.toString() ?? 0)}`,
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
      width: 120,
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: 'Created At',
      dataIndex: ['created_at'],
      key: 'created_at',
      width: 140,
      render: (date: number) => {
        if (!date) {
          return '-';
        }

        return format(new Date(fromUnixTime(date)), 'PP');
      },
    },
    {
      title: 'Actions',
      dataIndex: ['status'],
      key: 'action',
      width: 300,
      render: (status: string, data: InvoiceDetail) => {
        // draft print edit
        // approve print + pay
        // due pay
        // paid no actions (detail only)
        return RenderActionButton(status, data?.id ?? '', data);
      },
    },
  ];

  return {
    invoiceCheckData,
    invoiceColumn,
    invoiceList,
    isLoadingInvoiceList,
    isPayModalOpen,
    isPrintModalOpen,
    isSubmitUpdateInvoiceLoading: mutationUpdateInvoiceOrder.isLoading,
    onClickClosePay,
    onClickClosePrint,
    onClickOpenPay,
    onClickOpenPrint,
    onCloseCheckInvoice,
    onCreateInvoiceOrder,
    onRowClick,
    onSubmitCreateInvoiceItem,
    onSubmitSearch,
    onSubmitUpdateInvoice,
    onSubmitUpdateInvoiceItem,
    onTableChange,
    selectedCheckedInvoiceId,
  };
};

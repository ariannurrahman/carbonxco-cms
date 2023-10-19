import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import {
  InvoicePoCreatePayload,
  InvoicePoItems,
  InvoicePoParams,
  InvoicePoSearchQuery,
  InvoicePoUpdatePayload,
} from 'types/InvoicePo';
import {
  createInvoicePo,
  createItemInvoicePo,
  getInvoicePo,
  getInvoicePoDetail,
  removeItemInvoicePo,
  updateInvoicePo,
  updateInvoicePoItem,
} from 'api/invoicePo';
import { useNavigate, useParams } from 'react-router-dom';
import { InvoicePoState } from '../invoice-po-edit-create';
import { useInvoice } from 'pages/dashboard/invoice/hooks/useInvoice';

export const useInvoicePo = (state: InvoicePoState) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { onCreateInvoiceOrder } = useInvoice();

  const [tableParams, setTableParams] = useState<InvoicePoParams>({
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
    refetchInvoicePoList();
  };

  const onRowClick = (record: any) => {
    navigate(`/dashboard/invoice-po/edit/${record.id}`);
  };

  const onSubmitSearch = (value: InvoicePoSearchQuery) => {
    const searchPayload = tableParams;
    searchPayload.query = value;
    searchPayload.pagination = {
      page: 1,
      limit: 15,
    };
    setTableParams(searchPayload);
    refetchInvoicePoList();
  };

  const fetchInvoicePo = useCallback(async () => {
    return await getInvoicePo({
      pagination: { page: tableParams.pagination.page, limit: tableParams.pagination.limit },
      query: {
        query_customer_name: tableParams.query.query_customer_name,
        query_po_number: tableParams.query.query_po_number,
      },
    });
  }, [tableParams]);

  const {
    isLoading: isLoadingInvoicePoList,
    data: invoicePoList,
    refetch: refetchInvoicePoList,
  } = useQuery({
    queryFn: fetchInvoicePo,
    queryKey: ['invoicePoList', tableParams],
    refetchOnWindowFocus: false,
    retry: false,
  });

  const invoicePoColumn = [
    { title: 'Customer Name', dataIndex: ['customer', 'name'], key: 'customerName', width: 100 },
    { title: 'PO Number', dataIndex: 'po_number', key: 'po_number', width: 100 },
  ];
  const fetchDetailInvoicePo = async () => {
    if (!id) return;
    const response = await getInvoicePoDetail(id);
    return response;
  };

  const { data: invoicePoDetail } = useQuery({
    queryFn: fetchDetailInvoicePo,
    queryKey: ['invoicePoDetail'],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });

  const mutationUpdateInvoicePo = useMutation({
    mutationKey: ['updateInvoicePo'],
    mutationFn: (value: InvoicePoUpdatePayload) => {
      return updateInvoicePo(id ?? '', value);
    },
    onSuccess: () => {
      message.success('Invoice PO updated!');
      queryClient.invalidateQueries(['invoicePoList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const mutationCreateItemInvoicePo = useMutation({
    mutationKey: ['createItemInvoicePo'],
    mutationFn: (value: InvoicePoUpdatePayload) => {
      return createItemInvoicePo(id ?? '', value);
    },
    onSuccess: () => {
      message.success('Item Invoice PO created!');
      queryClient.invalidateQueries(['invoicePoList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitCreateItemInvoicePo = (value: InvoicePoUpdatePayload) => {
    mutationCreateItemInvoicePo.mutate(value);
  };

  const onSubmitUpdateInvoicePo = (value: InvoicePoUpdatePayload) => {
    mutationUpdateInvoicePo.mutate(value);
  };

  const mutationCreateInvoicePo = useMutation({
    mutationKey: ['createInvoicePo'],
    mutationFn: (value: InvoicePoCreatePayload) => {
      return createInvoicePo(value);
    },
    onSuccess: () => {
      message.success('Invoice PO created!');
      queryClient.invalidateQueries(['invoicePoList']);
      navigate('/dashboard/invoice-po');
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const mutationDeleteItemInvoicePo = useMutation({
    mutationKey: ['deleteItemPo'],
    mutationFn: (id: string) => {
      return removeItemInvoicePo(id ?? '');
    },
    onSuccess: () => {
      message.success('Item Invoice Po Deleted!');
      queryClient.invalidateQueries(['invoicePoList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitDeleteItemInvoicePo = (id: string) => {
    mutationDeleteItemInvoicePo.mutate(id);
  };

  const onSubmitCreateInvoicePo = (value: InvoicePoCreatePayload, type: string) => {
    if (type === 'create-invoice-po') {
      mutationCreateInvoicePo.mutate(value);
    }
    if (type === 'create-invoice-order') {
      const invoice_items = value.invoice_po_items.map((eachPoItem) => {
        return {
          invoice_po_item_id: eachPoItem.id,
          quantity: eachPoItem.quantity,
        };
      });

      onCreateInvoiceOrder({ invoice_items });
    }
  };

  const mutationUpdateInvoicePoItem = useMutation({
    mutationKey: ['updateInvoicePo'],
    mutationFn: (payload: InvoicePoItems) => {
      return updateInvoicePoItem(payload?.id ?? '', payload);
    },
    onSuccess: () => {
      message.success('Invoice PO updated!');
      queryClient.invalidateQueries(['invoicePoList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  const onSubmitUpdateInvoicePoItem = (id: string, value: InvoicePoItems) => {
    if (state !== 'edit') return;
    mutationUpdateInvoicePoItem.mutate({ id, ...value });
  };

  return {
    invoicePoColumn,
    invoicePoDetail,
    invoicePoList,
    isLoadingInvoicePoList,
    isLoadingUpdateInvoicePo: mutationUpdateInvoicePo.isLoading,
    onRowClick,
    onSubmitCreateInvoicePo,
    onSubmitCreateItemInvoicePo,
    onSubmitDeleteItemInvoicePo,
    onSubmitSearch,
    onSubmitUpdateInvoicePo,
    onSubmitUpdateInvoicePoItem,
    onTableChange,
  };
};

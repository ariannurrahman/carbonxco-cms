import { Table } from 'antd';

import { PageTitle } from 'components/page-title';
import { useInvoice } from './hooks/useInvoice';
import { InvoiceFilter } from './components/InvoiceFilter';
import { usePrintInvoice } from './hooks/usePrintInvoice';

const Invoice = () => {
  const { componentRef } = usePrintInvoice();
  const { invoiceColumn, invoiceList, isLoadingInvoiceList, onRowClick, onSubmitSearch, onTableChange } = useInvoice();

  return (
    <div className='h-[1000px]' ref={componentRef}>
      <PageTitle title='Invoice Order' />
      <InvoiceFilter onSubmit={onSubmitSearch} />
      {/* <InvoicePrintWrapper
        data={{
          id: 'c23b7dba-e1a4-4044-a664-ed97c017dda7',
          invoice_po: {
            id: '28c708d0-61d9-495c-aa65-3712cc0ed753',
            customer: {
              id: 'c1bc87d1-f49c-48f0-a398-c24f20ba3266',
              name: 'First customer',
              payment_term: 45,
              address: 'First street, NY.',
              invoice_address: 'First invoice street, NY.',
              block_status: false,
              pic: 'First PIC',
            },
            exchange_rate: 12500,
            po_number: '123',
            total_price: 0,
          },
          customer: {
            id: 'c1bc87d1-f49c-48f0-a398-c24f20ba3266',
            name: 'First customer',
            payment_term: 45,
            address: 'First street, NY.',
            invoice_address: 'First invoice street, NY.',
            block_status: false,
            pic: 'First PIC',
          },
          exchange_rate: 12500,
          po_number: '123',
          total_price: 2500000,
          due_date: 1702693832,
          print_date: null,
          paid_date: null,
          status: 'draft',
          travel_permit_number: '',
        }}
        status='due'
      /> */}
      <Table
        scroll={{ x: 300 }}
        onChange={onTableChange}
        rowKey='id'
        className='mt-3'
        dataSource={invoiceList?.data ?? []}
        columns={invoiceColumn}
        loading={isLoadingInvoiceList}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
        pagination={{
          defaultPageSize: 5,
          pageSize: 5,
          total: invoiceList?.metadata?.total_items,
        }}
      />
    </div>
  );
};

export { Invoice };

import { Table } from 'antd';

import { PageTitle } from 'components/page-title';
import { useInvoice } from './hooks/useInvoice';
import { InvoiceFilter } from './components/InvoiceFilter';
import { usePrintInvoice } from './hooks/usePrintInvoice';
import { CheckInvoiceModal } from './components/CheckInvoiceModal';

const Invoice = () => {
  const { componentRef } = usePrintInvoice();
  const {
    onCloseCheckInvoice,
    selectedCheckedInvoiceId,
    invoiceColumn,
    invoiceList,
    isLoadingInvoiceList,
    onRowClick,
    onSubmitSearch,
    onTableChange,
    invoiceCheckData,
  } = useInvoice();

  return (
    <div className='h-[1000px]' ref={componentRef}>
      <PageTitle title='Invoice Order' />
      <InvoiceFilter onSubmit={onSubmitSearch} />
      <CheckInvoiceModal data={invoiceCheckData} isOpen={!!selectedCheckedInvoiceId} onCancel={onCloseCheckInvoice} />
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

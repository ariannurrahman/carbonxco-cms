import { Table } from 'antd';
import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { useNavigate } from 'react-router-dom';
import { useInvoice } from './hooks/useInvoice';
import { InvoiceFilter } from './components/InvoiceFilter';

const Invoice = () => {
  const navigate = useNavigate();

  const { invoiceList, isLoadingInvoiceList, invoiceColumn, onTableChange, onSubmitSearch } = useInvoice();

  return (
    <div className='h-[1000px]'>
      <PageTitle
        title='Invoice Order'
        rightNode={
          <VIPButton size='large' onClick={() => navigate('/dashboard/order-invoice/create')}>
            Create Invoice
          </VIPButton>
        }
      />
      <InvoiceFilter onSubmit={onSubmitSearch} />
      <Table
        scroll={{ x: 300 }}
        onChange={onTableChange}
        rowKey='id'
        className='mt-3'
        dataSource={invoiceList?.data ?? []}
        columns={invoiceColumn}
        loading={isLoadingInvoiceList}
        // onRow={(record) => ({
        //   onClick: () => onRowClick(record),
        // })}
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

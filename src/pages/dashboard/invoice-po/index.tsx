import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { useInvoicePo } from './hooks/useInvoicePo';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InvoicePoFilter } from './components/InvoicePoFilter';

const InvoicePO = () => {
  const navigate = useNavigate();
  const { invoicePoList, isLoadingInvoicePoList, invoicePoColumn, onTableChange, onRowClick } = useInvoicePo('view');

  return (
    <div className='h-[1000px]'>
      <PageTitle
        title='Invoice PO'
        rightNode={
          <VIPButton size='large' onClick={() => navigate('/dashboard/invoice-po/create')}>
            Create Invoice PO
          </VIPButton>
        }
      />
      <InvoicePoFilter onSubmit={() => {}} />
      <Table
        scroll={{ x: 300 }}
        onChange={onTableChange}
        rowKey='id'
        className='mt-3'
        dataSource={invoicePoList?.data ?? []}
        columns={invoicePoColumn}
        loading={isLoadingInvoicePoList}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
        // pagination={{
        //   defaultPageSize: 5,
        //   pageSize: 5,
        //   total: stocksList?.metadata?.total_items,
        // }}
      />
    </div>
  );
};

export { InvoicePO };

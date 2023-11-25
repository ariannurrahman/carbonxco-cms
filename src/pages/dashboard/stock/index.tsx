import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { useStock } from './hooks/useStock';
import { StockFilter } from './components/StockFilter';
import { Alert, Table } from 'antd';
import { StockModal } from './components/StockModal';

export const Stock = () => {
  const {
    isLoadingStocksList,
    isLoadingSubmit,
    isStockModalOpen,
    onCloseStockModal,
    onOpenStockModal,
    onSubmitCreateStock,
    onSubmitDeleteStock,
    onSubmitSearch,
    onSubmitUpdateStock,
    onTableChange,
    selectedStockModal,
    stockColumns,
    stockDataSource,
    stocksList,
  } = useStock();

  const qtyTotal = stocksList?.data?.map(({ quantity }) => quantity).reduce((curr, total) => curr + total, 0);

  return (
    <div className='h-[1000px]'>
      <PageTitle
        title='Stock'
        rightNode={
          <VIPButton size='large' onClick={() => onOpenStockModal('create')}>
            Create Stock
          </VIPButton>
        }
      />
      <StockFilter onSubmit={onSubmitSearch} />
      <Alert className='w-[300px]' type='info' message={<strong> Quantity Total: {qtyTotal}</strong>} />

      <StockModal
        isLoadingSubmit={isLoadingSubmit}
        isOpen={isStockModalOpen === 'create'}
        onCancel={onCloseStockModal}
        onSubmit={onSubmitCreateStock}
        type='create'
      />
      <StockModal
        isLoadingSubmit={isLoadingSubmit}
        isOpen={isStockModalOpen === 'update'}
        onCancel={onCloseStockModal}
        onSubmit={onSubmitUpdateStock}
        selectedStockModal={selectedStockModal}
        type='update'
      />
      <StockModal
        isLoadingSubmit={isLoadingSubmit}
        isOpen={isStockModalOpen === 'delete'}
        onCancel={onCloseStockModal}
        onSubmit={onSubmitDeleteStock}
        selectedStockModal={selectedStockModal}
        type='delete'
      />

      <Table
        scroll={{ x: 300 }}
        onChange={onTableChange}
        rowKey='id'
        className='mt-3'
        dataSource={stockDataSource}
        columns={stockColumns}
        loading={isLoadingStocksList}
        pagination={{
          defaultPageSize: 5,
          pageSize: 5,
          total: stocksList?.metadata?.total_items,
        }}
      />
    </div>
  );
};

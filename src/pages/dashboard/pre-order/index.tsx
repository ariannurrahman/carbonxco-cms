import { Table } from 'antd';

import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { usePreorder } from './hooks/usePreorder';
import { ChangeModalStatus } from './components/ChangeModalStatus';
import { PoFilter } from './components/PoFilter';

export const PreOrder = () => {
  const {
    isLoadingSubmit,
    isModalOpen,
    isPoListLoading,
    onCancelModal,
    onGoToCreatePO,
    onRowClick,
    onSubmitChangeStatusModal,
    onSubmitSearch,
    onTableChange,
    poColumns: columns,
    poDataSource: dataSource,
    poList,
  } = usePreorder();

  return (
    <div>
      <PageTitle
        title='Pre-Order'
        rightNode={
          <VIPButton size='large' onClick={onGoToCreatePO}>
            Create PO
          </VIPButton>
        }
      />
      <PoFilter onSubmit={onSubmitSearch} />

      <Table
        scroll={{ x: 800 }}
        loading={isPoListLoading}
        rowKey='id'
        className='mt-3'
        columns={columns}
        dataSource={dataSource}
        onChange={onTableChange}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
        pagination={{
          defaultPageSize: 5,
          pageSize: 5,
          total: poList?.metadata?.total_items,
        }}
      />
      <ChangeModalStatus
        onSubmit={onSubmitChangeStatusModal}
        onCancelModal={onCancelModal}
        type='confirm'
        isOpen={isModalOpen.confirm}
        isLoadingSubmit={isLoadingSubmit}
      />
      <ChangeModalStatus
        onSubmit={onSubmitChangeStatusModal}
        onCancelModal={onCancelModal}
        type='cancel'
        isOpen={isModalOpen.cancel}
        isLoadingSubmit={isLoadingSubmit}
      />
      <ChangeModalStatus
        onSubmit={onSubmitChangeStatusModal}
        onCancelModal={onCancelModal}
        type='complete'
        isOpen={isModalOpen.complete}
        isLoadingSubmit={isLoadingSubmit}
      />
    </div>
  );
};

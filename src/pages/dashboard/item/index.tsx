import { Table } from 'antd';

import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { ItemModal } from './components/ItemModal';
import { useItem } from './hooks/useItem';
import { ItemFilter } from './components/ItemFilter';

export const Item = () => {
  const {
    isItemModalOpen,
    isLoadingItemList,
    itemColumns: columns,
    itemDataSource: dataSource,
    metadata,
    onCloseItemModal,
    onOpenItemModal,
    onRowClick,
    onSubmitItemForm,
    onSubmitSearch,
    onTableChange,
  } = useItem();

  return (
    <div>
      <PageTitle
        title='Item'
        rightNode={
          <VIPButton size='large' onClick={onOpenItemModal}>
            Create Item
          </VIPButton>
        }
      />
      <ItemModal isOpen={isItemModalOpen} onSubmit={onSubmitItemForm} onCancel={onCloseItemModal} />
      <ItemFilter onSubmit={onSubmitSearch} />
      <Table
        scroll={{ x: 300 }}
        onChange={onTableChange}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
        rowKey='id'
        className='mt-3'
        dataSource={dataSource}
        columns={columns}
        loading={isLoadingItemList}
        pagination={{
          defaultPageSize: 5,
          pageSize: 5,
          total: metadata?.total_items,
        }}
      />
    </div>
  );
};

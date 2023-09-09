import { Table } from 'antd';

import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { ItemModal } from './components/ItemModal';
import { useItem } from './hooks/useItem';

export const Item = () => {
  const {
    isItemModalOpen,
    isLoadingItemList,
    itemColumns: columns,
    itemDataSource: dataSource,
    onCloseItemModal,
    onOpenItemModal,
    onRowClick,
    onSubmitItemForm,
    onTableChange,
    tableParams,
  } = useItem();

  const DUMMY = [
    {
      item_name: 'first',
      serial_number: 'serial 1',
      supplier_name: ' supplier 1',
      id: '1',
    },
    {
      item_name: 'second',
      serial_number: 'serial 2',
      supplier_name: ' supplier 3',
      id: '2',
    },
  ];

  return (
    <div className='h-[3000px]'>
      <PageTitle
        title='Item'
        rightNode={
          <VIPButton size='large' onClick={onOpenItemModal}>
            Create Item
          </VIPButton>
        }
      />
      <ItemModal isOpen={isItemModalOpen} onSubmit={onSubmitItemForm} onCancel={onCloseItemModal} />
      <Table
        onChange={onTableChange}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
        rowKey='id'
        className='mt-3'
        dataSource={dataSource}
        columns={columns}
        loading={isLoadingItemList}
      />
    </div>
  );
};

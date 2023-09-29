import { Table } from 'antd';

import { PageTitle } from 'components/page-title';
import { useCustomerItem } from '../hooks/useCustomerItem';
import { useParams } from 'react-router-dom';
import { VIPButton } from 'components/button';
import { useItem } from 'pages/dashboard/item/hooks/useItem';
import { CreateCustomerItemModal } from '../components/CreateCustomerItemModal';
import { UpdateCustomerItemModal } from '../components/UpdateCustomerItemModal';

export const CustomerDetail = () => {
  const { id } = useParams();

  const {
    customerItemListDataSource,
    customerItemListColumn,
    isCreateCustomerItemModalOpen,
    isLoadingCustomerItemList,
    isUpdateCustomerItemModalOpen,
    onCloseCreateCustomerItemModal,
    onCloseUpdateCustomerItemModal,
    onOpenCreateCustomerItemModal,
    onSubmitCreateCustomerItem,
    onSubmitUpdateCustomerItem,
    selectedCustomerItem,
  } = useCustomerItem(id ?? '-');
  const { itemDataSource } = useItem();

  return (
    <div>
      <PageTitle
        title='Customer Detail'
        rightNode={
          <VIPButton size='large' onClick={onOpenCreateCustomerItemModal}>
            Create Item
          </VIPButton>
        }
      />

      <CreateCustomerItemModal
        itemDataSource={itemDataSource}
        isOpen={isCreateCustomerItemModalOpen}
        onCancel={onCloseCreateCustomerItemModal}
        onSubmit={onSubmitCreateCustomerItem}
      />
      <UpdateCustomerItemModal
        selectedCustomerItem={selectedCustomerItem}
        itemDataSource={itemDataSource}
        isOpen={isUpdateCustomerItemModalOpen}
        onCancel={onCloseUpdateCustomerItemModal}
        onSubmit={onSubmitUpdateCustomerItem}
      />
      <Table
        loading={isLoadingCustomerItemList}
        scroll={{ x: 300 }}
        // onChange={onTableChange}
        // onRow={(record) => ({
        //   onClick: () => onRowClick(record),
        // })}
        rowKey='id'
        className='mt-3'
        dataSource={customerItemListDataSource}
        columns={customerItemListColumn}
        // loading={isLoadingItemList}
        // pagination={{
        //   defaultPageSize: 5,
        //   pageSize: 5,
        //   total: metadata?.total_items,
        // }}
      />
    </div>
  );
};

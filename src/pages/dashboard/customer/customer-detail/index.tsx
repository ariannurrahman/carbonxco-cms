import { Table } from 'antd';

import { PageTitle } from 'components/page-title';
import { useCustomerItem } from '../hooks/useCustomerItem';
import { useParams } from 'react-router-dom';
import { VIPButton } from 'components/button';
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
    onChangeSupplier,
    modifiedItems,
    supplierList,
  } = useCustomerItem(id ?? '-');

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
        onChangeSupplier={onChangeSupplier}
        supplierList={supplierList}
        itemDataSource={modifiedItems}
        isOpen={isCreateCustomerItemModalOpen}
        onCancel={onCloseCreateCustomerItemModal}
        onSubmit={onSubmitCreateCustomerItem}
      />
      <UpdateCustomerItemModal
        onChangeSupplier={onChangeSupplier}
        supplierList={supplierList}
        selectedCustomerItem={selectedCustomerItem}
        itemDataSource={modifiedItems}
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

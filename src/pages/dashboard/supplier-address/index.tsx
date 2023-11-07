import { Table } from 'antd';

import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { useSupplierAddress } from './hooks/useSupplierAddress';
import { CreateEditSupplierAddressModal } from './components/CreateEditSupplierAddressModal';

export const SupplierAddress = () => {
  const {
    columns,
    createSupplierAddressMutation,
    deleteSupplierAddressMutation,
    isSupplierAddressListLoading,
    isSupplierModalOpen,
    onSupplierModalClose,
    onSupplierModalOpen,
    onTableChange,
    selectedSupplier,
    supplierAddressList,
    updateSupplierAddressMutation,
    isSupplierLoading,
    modifiedSupplier,
  } = useSupplierAddress();

  return (
    <div className='h-[1000px]'>
      <PageTitle
        title='Supplier Address'
        rightNode={
          <VIPButton size='large' onClick={() => onSupplierModalOpen('create', undefined)}>
            Create Supplier Address
          </VIPButton>
        }
      />
      <CreateEditSupplierAddressModal
        isLoadingSubmit={createSupplierAddressMutation.isLoading}
        isOpen={isSupplierModalOpen.create}
        isSupplierLoading={isSupplierLoading}
        modifiedSupplier={modifiedSupplier}
        onCancel={() => onSupplierModalClose('create')}
        onSubmitCreate={createSupplierAddressMutation}
        status='create'
      />
      <CreateEditSupplierAddressModal
        isLoadingSubmit={updateSupplierAddressMutation.isLoading}
        isOpen={isSupplierModalOpen.edit}
        isSupplierLoading={isSupplierLoading}
        modifiedSupplier={modifiedSupplier}
        onCancel={() => onSupplierModalClose('edit')}
        onSubmitUpdate={updateSupplierAddressMutation}
        selectedSupplier={selectedSupplier}
        status='edit'
      />
      <CreateEditSupplierAddressModal
        isLoadingSubmit={deleteSupplierAddressMutation.isLoading}
        isOpen={isSupplierModalOpen.delete}
        onCancel={() => onSupplierModalClose('delete')}
        onSubmitDelete={deleteSupplierAddressMutation}
        selectedSupplier={selectedSupplier}
        status='delete'
      />

      <Table
        scroll={{ x: 300 }}
        onChange={onTableChange}
        rowKey='id'
        className='mt-3'
        dataSource={supplierAddressList?.data}
        columns={columns}
        loading={isSupplierAddressListLoading}
        pagination={{
          defaultPageSize: 5,
          pageSize: supplierAddressList?.metadata.limit,
          total: supplierAddressList?.metadata.total_items,
        }}
      />
    </div>
  );
};

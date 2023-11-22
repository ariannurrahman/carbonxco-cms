import { Table } from 'antd';

import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { usePreorder } from './hooks/usePreorder';
import { ChangeModalStatus } from './components/ChangeModalStatus';
import { PoFilter } from './components/PoFilter';
import { PaymentTermsModal } from './components/PaymentTermsModal';

export const PreOrder = () => {
  const {
    currentExchangeRate,
    isLoadingSubmit,
    isModalOpen,
    isPoListLoading,
    onCancelModal,
    onClosePaymentTermsModal,
    onGoToCreatePO,
    onRowClick,
    onSubmitChangeStatusModal,
    onSubmitSearch,
    onTableChange,
    paymentTermsModal,
    poColumns: columns,
    poDataSource: dataSource,
    poList,
    onChangePaymentTerms,
  } = usePreorder();

  return (
    <div className='h-[1000px]'>
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
      <PaymentTermsModal
        paymentTerms={paymentTermsModal.payment_terms}
        onChangePaymentTerms={onChangePaymentTerms}
        open={paymentTermsModal.open}
        onCancel={onClosePaymentTermsModal}
        data={paymentTermsModal.data}
        status={paymentTermsModal.status}
      />
      <ChangeModalStatus
        isLoadingSubmit={isLoadingSubmit}
        isOpen={isModalOpen.confirm}
        onCancelModal={onCancelModal}
        onSubmit={onSubmitChangeStatusModal}
        type='confirm'
      />
      <ChangeModalStatus
        isLoadingSubmit={isLoadingSubmit}
        isOpen={isModalOpen.cancel}
        onCancelModal={onCancelModal}
        onSubmit={onSubmitChangeStatusModal}
        type='cancel'
      />
      <ChangeModalStatus
        isLoadingSubmit={isLoadingSubmit}
        isOpen={isModalOpen.complete}
        onCancelModal={onCancelModal}
        onSubmit={onSubmitChangeStatusModal}
        type='complete'
      />
      <ChangeModalStatus
        currentExchangeRate={currentExchangeRate}
        isLoadingSubmit={isLoadingSubmit}
        isOpen={isModalOpen.paid}
        onCancelModal={onCancelModal}
        onSubmit={onSubmitChangeStatusModal}
        type='paid'
      />
    </div>
  );
};

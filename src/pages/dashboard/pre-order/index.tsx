import { Table } from 'antd';
import { VIPButton } from 'components/button';
import { PageTitle } from 'components/page-title';
import { useNavigate } from 'react-router-dom';

export const PreOrder = () => {
  const navigate = useNavigate();

  const onClickCreatePo = () => navigate('/dashboard/pre-order/create');

  return (
    <div>
      <PageTitle
        title='Pre-Order'
        rightNode={
          <VIPButton size='large' onClick={onClickCreatePo}>
            Create PO
          </VIPButton>
        }
      />
      <Table rowKey='id' className='mt-3' />
    </div>
  );
};

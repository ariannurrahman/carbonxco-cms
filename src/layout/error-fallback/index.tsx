import { Result } from 'antd';
import { VIPButton } from 'components/button';
import { useNavigate } from 'react-router-dom';

export const ErrorFallback = () => {
  const navigate = useNavigate();
  const onClickBackHome = () => navigate('/dashboard/item');
  return (
    <Result
      status='warning'
      title='There are some problems.'
      extra={
        <VIPButton type='primary' key='console' onClick={onClickBackHome}>
          Back
        </VIPButton>
      }
    />
  );
};

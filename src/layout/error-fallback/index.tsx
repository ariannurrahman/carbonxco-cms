import { Result } from 'antd';

export const ErrorFallback = () => {
  return <Result status='warning' title='Problem occured, please contact admin' />;
};

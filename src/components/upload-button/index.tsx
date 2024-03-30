import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface UploadButtonProps {
  loading: boolean;
}

export const CarbonxUploadButton = ({ loading }: UploadButtonProps) => {
  return loading ? (
    <Spin />
  ) : (
    <button disabled={loading} className='border-solid bg-white' type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );
};

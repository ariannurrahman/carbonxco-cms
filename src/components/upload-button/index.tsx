import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface UploadButtonProps {
  loading: boolean;
}

export const CarbonxUploadButton = ({ loading }: UploadButtonProps) => {
  return (
    <button className='border-solid bg-white' type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );
};

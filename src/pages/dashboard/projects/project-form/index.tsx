import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ProjectForm = () => {
  const navigate = useNavigate();

  return (
    <div className='lg:pl-20'>
      <Button onClick={() => navigate(-1)} type='text'>
        <p className='underline text-[#46A7ED] text-[14px]'>Back to Project List</p>
      </Button>
    </div>
  );
};

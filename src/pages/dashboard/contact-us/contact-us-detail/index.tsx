import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { getContactDetail } from 'api/contact-us';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

export const ContactUsDetail = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryFn: () => getContactDetail(id ?? ''),
    queryKey: ['contact-us', id],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });

  const contactDetail = data?.data;

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };
  return (
    <div className='lg:pl-20 pb-40 space-y-3'>
      <Button onClick={onClickBack} className='mt-5' type='text'>
        <p className='underline text-[#46A7ED] text-[14px]'>Back to E-mail List</p>
      </Button>
      <h2 className='text-[32px] font-medium'>E-mail Subjects</h2>
      <div className='grid grid-cols-3 gap-x-5 text-[#8D8D8D] text-sm'>
        <p>Received by {dayjs(contactDetail?.createdAt).format('DD MMMM YYYY')}</p>
        <p>From {contactDetail?.User?.email ?? '-'}</p>
        <p>Phone no. {contactDetail?.User?.phone ?? '-'}</p>
      </div>

      <div className='grid grid-cols-[150px_auto] pt-10'>
        <p>E-mail</p>
        <div className='border-[1px] px-5 border-[#C5C5C5] min-h-[400px]'>{contactDetail?.body ?? '-'}</div>
      </div>
    </div>
  );
};

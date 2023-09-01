import { Row } from 'antd';
import { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  filter?: ReactNode;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Row className='flex justify-between items-center h-[80px] p-0 m-0 shadow-sm bg-white rounded-md'>
      <p className='text-left font-bold text-lg pl-8 mb-0'>{title}</p>
    </Row>
  );
};

import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';

interface DataType {
  date: string;
  subject: string;
  senderEmail: string;
  phoneNumber: string;
}

export const ContactUs = () => {
  const columns: TableColumnType<DataType>[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      ellipsis: true,
      width: 160,
      sorter: (a, b) => {
        if (a.date.toUpperCase() < b.date.toUpperCase()) {
          return -1;
        }
        if (a.date.toUpperCase() > b.date.toUpperCase()) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      width: 130,
      sorter: (a, b) => {
        if (a.subject.toUpperCase() < b.subject.toUpperCase()) {
          return -1;
        }
        if (a.subject.toUpperCase() > b.subject.toUpperCase()) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Sender E-mail',
      dataIndex: 'senderEmail',
      sorter: (a, b) => {
        if (a.senderEmail.toUpperCase() < b.senderEmail.toUpperCase()) {
          return -1;
        }
        if (a.senderEmail.toUpperCase() > b.senderEmail.toUpperCase()) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Phone No.',
      dataIndex: 'phoneNumber',
      sorter: (a, b) => {
        if (a.phoneNumber.toUpperCase() < b.phoneNumber.toUpperCase()) {
          return -1;
        }
        if (a.phoneNumber.toUpperCase() > b.phoneNumber.toUpperCase()) {
          return 1;
        }
        return 0;
      },
    },

    {
      title: <Input placeholder='Search' />,
      render: () => {
        return (
          <Row>
            <Button type='text'>
              <p className='underline text-[#46A7ED] font-normal text-[14px]'>See Mesage</p>
            </Button>
            <Button type='text'>
              <img src={Trash} alt='delete' />
            </Button>
          </Row>
        );
      },
    },
  ];

  const data = [
    {
      date: '01 Jan 2024',
      subject: 'Collaboration',
      senderEmail: 'someone@gmail.com',
      phoneNumber: '0123456789',
      key: 1,
    },
    {
      date: '01 Jan 2024',
      subject: 'Collaboration',
      senderEmail: 'someone@gmail.com',
      phoneNumber: '0123456789',
      key: 2,
    },
  ];
  return (
    <div className='h-[1000px]'>
      <PageTitle
        title='Contact Us E-mail List'
        rightNode={
          <Row gutter={[8, 0]} justify='center' align='middle' className='cursor-pointer'>
            <Col>
              <img src={Plus} alt='plus' />
            </Col>
            <Col>
              <p className='text-[14px] underline'>Change E-mail Settings</p>
            </Col>
          </Row>
        }
      />

      <CarbonxTable scroll={{ x: 1024 }} columns={columns} dataSource={data} />
    </div>
  );
};

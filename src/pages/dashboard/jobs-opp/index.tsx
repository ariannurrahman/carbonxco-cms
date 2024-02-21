import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';

interface DataType {
  date: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export const JobsOpp = () => {
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
      title: 'Name',
      dataIndex: 'name',
      width: 130,
      sorter: (a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      sorter: (a, b) => {
        if (a.email.toUpperCase() < b.email.toUpperCase()) {
          return -1;
        }
        if (a.email.toUpperCase() > b.email.toUpperCase()) {
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
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => {
        if (a.address.toUpperCase() < b.address.toUpperCase()) {
          return -1;
        }
        if (a.address.toUpperCase() > b.address.toUpperCase()) {
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
              <p className='underline text-[#46A7ED] font-normal text-[14px]'>Download Resume</p>
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
      name: 'First Name Last Name',
      email: 'something@gmail.co',
      phoneNumber: '0123456789',
      address: 'Jl. Street State, City, Postal Code',
      key: 1,
    },
    {
      date: '01 Jan 2024',
      name: 'First Name Last Name',
      email: 'something@gmail.co',
      phoneNumber: '0123456789',
      address: 'Jl. Street State, City, Postal Code',
      key: 2,
    },
  ];
  return (
    <div className='h-[1000px]'>
      <PageTitle
        title='Job Opp Form Response'
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

import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { useContactUs } from './useContactUs';
import { useMemo } from 'react';
import { formatDate } from 'utils';

interface DataType {
  date: string;
  subject: string;
  senderEmail: string;
  phoneNumber: string;
}

export const ContactUs = () => {
  const { contactUs, isLoadingContactUs, onTableChange } = useContactUs();

  const dataSource: DataType[] = useMemo(() => {
    return contactUs?.data.data.map((eachContactUs: any) => {
      return {
        key: eachContactUs?.id ?? '-',
        last_edit: formatDate(eachContactUs?.updatedAt),
        published: formatDate(eachContactUs?.createdAt),
      };
    });
  }, [contactUs]);

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

      <CarbonxTable
        columns={columns}
        dataSource={dataSource}
        footer={() => (
          <p className='text-[#8D8D8D] text-[12px] font-semibold'>
            Showing {dataSource?.length} / {contactUs?.data?.count}
          </p>
        )}
        loading={isLoadingContactUs}
        onChange={onTableChange}
        pagination={{
          defaultPageSize: 15,
          pageSize: 15,
          total: contactUs?.data.count,
        }}
        scroll={{ x: 1024 }}
      />
    </div>
  );
};

import { Button, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
// import Plus from 'assets/plus.svg';
import { useApplicants } from './useApplicants';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface DataType {
  date: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  document: {
    url: string;
  };
}

export const JobsOpp = () => {
  const { applicants, isLoadingApplicants, onTableChange, deleteApplicantMutation } = useApplicants({});

  const dataSource: DataType[] = useMemo(() => {
    return applicants?.data.data.map((eachApplicant: any) => {
      return {
        key: eachApplicant?.id ?? '-',
        name: eachApplicant?.user?.name ?? '-',
        address: eachApplicant?.user?.address ?? '-',
        phoneNumber: eachApplicant?.user?.phone ?? '-',
        email: eachApplicant.user?.email ?? '-',
        date: dayjs(eachApplicant.createdAt).format('DD MMM YYYY'),
        document: eachApplicant?.documents?.[0] ?? {},
      };
    });
  }, [applicants]);

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
      dataIndex: 'key',
      render: (id: string, rest) => {
        return (
          <Row>
            <Button type='text'>
              <Link target='_blank' to={rest.document.url}>
                <p className='underline text-[#46A7ED] font-normal text-[14px]'>Download Resume</p>
              </Link>
            </Button>
            <Button type='text' onClick={() => deleteApplicantMutation.mutate(id)}>
              <img src={Trash} alt='delete' />
            </Button>
          </Row>
        );
      },
    },
  ];

  return (
    <div className='pb-52'>
      <PageTitle
        title='Job Opp Form Response'
        // rightNode={
        //   <Row gutter={[8, 0]} justify='center' align='middle' className='cursor-pointer'>
        //     <Col>
        //       <img src={Plus} alt='plus' />
        //     </Col>
        //     <Col>
        //       <p className='text-[14px] underline'>Change E-mail Settings</p>
        //     </Col>
        //   </Row>
        // }
      />

      <CarbonxTable
        columns={columns}
        dataSource={dataSource}
        footer={() => (
          <p className='text-[#8D8D8D] text-[12px] font-semibold'>
            Showing {dataSource?.length} / {applicants?.data?.count}
          </p>
        )}
        loading={isLoadingApplicants}
        onChange={onTableChange}
        pagination={{
          defaultPageSize: 15,
          pageSize: 15,
          total: applicants?.data.count,
        }}
        scroll={{ x: 1024 }}
      />
    </div>
  );
};

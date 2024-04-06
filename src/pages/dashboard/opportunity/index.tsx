import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useJobs } from './useJobs';
import { useMemo } from 'react';
import { formatDate } from 'utils';
import { Job } from './types';

interface DataType {
  key: React.Key;
  job: string;
  last_edit: string;
  published: string;
  category: string;
}

export const Opportunity = () => {
  const navigate = useNavigate();

  const { isLoadingJobs, jobs, onTableChange, deleteJobMutation } = useJobs({});

  const columns: TableColumnType<DataType>[] = [
    {
      title: 'Job',
      dataIndex: 'job',
      ellipsis: true,
      sorter: (a, b) => {
        if (a.job.toUpperCase() < b.job.toUpperCase()) {
          return -1;
        }
        if (a.job.toUpperCase() > b.job.toUpperCase()) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'last edit',
      dataIndex: 'last_edit',
      sorter: (a, b) => {
        if (a.last_edit.toUpperCase() < b.last_edit.toUpperCase()) {
          return -1;
        }
        if (a.last_edit.toUpperCase() > b.last_edit.toUpperCase()) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'published',
      dataIndex: 'published',
      sorter: (a, b) => {
        if (a.published.toUpperCase() < b.published.toUpperCase()) {
          return -1;
        }
        if (a.published.toUpperCase() > b.published.toUpperCase()) {
          return 1;
        }
        return 0;
      },
    },

    {
      title: <Input placeholder='Search' />,
      dataIndex: 'key',
      render: (id: string) => {
        return (
          <Row>
            <Button type='text'>
              <Link to={`${id}/edit`}>
                <p className='underline text-[#46A7ED] font-normal text-[14px]'>Edit</p>
              </Link>
            </Button>
            <Button type='text' onClick={() => deleteJobMutation.mutate(id)}>
              <img src={Trash} alt='delete' />
            </Button>
          </Row>
        );
      },
    },
  ];

  const dataSource: DataType[] = useMemo(() => {
    return jobs?.data.data.map((eachJob: Job) => {
      return {
        key: eachJob?.id ?? '-',
        last_edit: formatDate(eachJob?.updatedAt),
        published: formatDate(eachJob?.createdAt),
        job: eachJob?.title ?? '-',
      };
    });
  }, [jobs]);

  return (
    <div className='pb-52'>
      <PageTitle
        title='Open Positions'
        rightNode={
          <Row
            gutter={[8, 0]}
            justify='center'
            align='middle'
            className='cursor-pointer'
            onClick={() => navigate('/dashboard/opportunity/create')}
          >
            <Col>
              <img src={Plus} alt='plus' />
            </Col>
            <Col>
              <p className='text-[14px] underline'>New Jobs</p>
            </Col>
          </Row>
        }
      />

      <CarbonxTable
        columns={columns}
        dataSource={dataSource}
        footer={() => (
          <p className='text-[#8D8D8D] text-[12px] font-semibold'>
            Showing {dataSource?.length} / {jobs?.data?.count}
          </p>
        )}
        loading={isLoadingJobs}
        onChange={onTableChange}
        pagination={{
          defaultPageSize: 15,
          pageSize: 15,
          total: jobs?.data.count,
        }}
        scroll={{ x: 1024 }}
      />
    </div>
  );
};

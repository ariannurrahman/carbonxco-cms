import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useFaqs } from './useFaqs';
import { formatDate } from 'utils';
import { useMemo } from 'react';
import { Faq } from './types';

interface DataType {
  key: React.Key;
  question: string;
  last_edit: string;
  published: string;
}

export const FaqPage = () => {
  const navigate = useNavigate();
  const { faqs, isLoadingFaqs, onTableChange } = useFaqs();

  const dataSource: DataType[] = useMemo(() => {
    return faqs?.data.data.map((eachFaq: Faq) => {
      return {
        key: eachFaq?.id ?? '-',
        last_edit: formatDate(eachFaq?.updatedAt),
        published: formatDate(eachFaq?.createdAt),
        question: eachFaq.question,
      };
    });
  }, [faqs]);

  const columns: TableColumnType<DataType>[] = [
    {
      title: 'Question List',
      dataIndex: 'question',
      ellipsis: true,
      sorter: (a, b) => {
        if (a.question.toUpperCase() < b.question.toUpperCase()) {
          return -1;
        }
        if (a.question.toUpperCase() > b.question.toUpperCase()) {
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
        title='F.A.Q'
        rightNode={
          <Row
            gutter={[8, 0]}
            justify='center'
            align='middle'
            className='cursor-pointer'
            onClick={() => navigate('/dashboard/faq/create')}
          >
            <Col>
              <img src={Plus} alt='plus' />
            </Col>
            <Col>
              <p className='text-[14px] underline'>New Question</p>
            </Col>
          </Row>
        }
      />

      <CarbonxTable
        columns={columns}
        dataSource={dataSource}
        footer={() => (
          <p className='text-[#8D8D8D] text-[12px] font-semibold'>
            Showing {dataSource?.length} / {faqs?.data?.count}
          </p>
        )}
        loading={isLoadingFaqs}
        onChange={onTableChange}
        pagination={{
          defaultPageSize: 15,
          pageSize: 15,
          total: faqs?.data.count,
        }}
        scroll={{ x: 1024 }}
      />
    </div>
  );
};

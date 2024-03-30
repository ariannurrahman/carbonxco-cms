import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useNews } from './useNews';
import { useMemo } from 'react';
import { News } from './types';
import { formatDate } from 'utils';

interface DataType {
  key: React.Key;
  article: string;
  last_edit: string;
  published: string;
  category: string;
}

export const NewsPage = () => {
  const navigate = useNavigate();

  const { isLoadingNews, news, onTableChange, deleteNewsMutation } = useNews({});

  const columns: TableColumnType<DataType>[] = [
    {
      title: 'Article',
      dataIndex: 'article',
      ellipsis: true,
      sorter: (a, b) => {
        if (a.article.toUpperCase() < b.article.toUpperCase()) {
          return -1;
        }
        if (a.article.toUpperCase() > b.article.toUpperCase()) {
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
      title: 'category',
      dataIndex: 'category',
      sorter: (a, b) => {
        if (a.category.toUpperCase() < b.category.toUpperCase()) {
          return -1;
        }
        if (a.category.toUpperCase() > b.category.toUpperCase()) {
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
            <Button type='text' onClick={() => deleteNewsMutation.mutate(id)}>
              <img src={Trash} alt='delete' />
            </Button>
          </Row>
        );
      },
    },
  ];

  const dataSource: DataType[] = useMemo(() => {
    return news?.data.data.map((eachNews: News) => {
      return {
        article: eachNews?.title ?? '-',
        category: eachNews?.category ?? '-',
        key: eachNews?.id ?? '-',
        last_edit: formatDate(eachNews?.updatedAt),
        published: formatDate(eachNews?.createdAt),
      };
    });
  }, [news]);

  return (
    <div className='pb-52'>
      <PageTitle
        title='News & Insight List'
        rightNode={
          <Row
            gutter={[8, 0]}
            justify='center'
            align='middle'
            className='cursor-pointer'
            onClick={() => navigate('/dashboard/news/create')}
          >
            <Col>
              <img src={Plus} alt='plus' />
            </Col>
            <Col>
              <p className='text-[14px] underline'>New Article</p>
            </Col>
          </Row>
        }
      />

      <CarbonxTable
        columns={columns}
        dataSource={dataSource}
        footer={() => (
          <p className='text-[#8D8D8D] text-[12px] font-semibold'>
            Showing {dataSource?.length} / {news?.data?.count}
          </p>
        )}
        loading={isLoadingNews}
        onChange={onTableChange}
        pagination={{
          defaultPageSize: 15,
          pageSize: 15,
          total: news?.data.count,
        }}
        scroll={{ x: 1024 }}
      />
    </div>
  );
};

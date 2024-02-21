import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: React.Key;
  article: string;
  last_edit: string;
  published: string;
  category: string;
}

export const News = () => {
  const navigate = useNavigate();

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
      render: () => {
        return (
          <Row>
            <Button type='text'>
              <p className='underline text-[#46A7ED] font-normal text-[14px]'>Edit</p>
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
      key: 1,
      article: 'Article-1',
      last_edit: '10-01-24',
      published: '20-02-24',
      category: 'News',
    },
    {
      key: 2,
      article: 'Article-2',
      last_edit: '15-01-24',
      published: '25-02-24',
      category: 'Insight',
    },
  ];

  return (
    <div className='h-[1000px]'>
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

      <CarbonxTable scroll={{ x: 1024 }} columns={columns} dataSource={data} />
    </div>
  );
};

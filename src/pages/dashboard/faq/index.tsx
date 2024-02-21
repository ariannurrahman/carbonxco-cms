import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: React.Key;
  question: string;
  last_edit: string;
  published: string;
}

export const Faq = () => {
  const navigate = useNavigate();

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
      question: 'What is carbonx?',
      last_edit: '10-01-24',
      published: '20-02-24',
    },
    {
      key: 2,
      question: 'Why carbonx?',
      last_edit: '15-01-24',
      published: '25-02-24',
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

      <CarbonxTable scroll={{ x: 1024 }} columns={columns} dataSource={data} />
    </div>
  );
};

import React from 'react';

import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: React.Key;
  title: string;
  last_edit: string;
  published: string;
  project_stage: string;
}

export const Projects = () => {
  const navigate = useNavigate();

  const columns: TableColumnType<DataType>[] = [
    {
      title: 'title',
      dataIndex: 'title',
      ellipsis: true,
      sorter: (a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) {
          return -1;
        }
        if (a.title.toUpperCase() > b.title.toUpperCase()) {
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
      title: 'project stage',
      dataIndex: 'project_stage',
      sorter: (a, b) => {
        if (a.project_stage.toUpperCase() < b.project_stage.toUpperCase()) {
          return -1;
        }
        if (a.project_stage.toUpperCase() > b.project_stage.toUpperCase()) {
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
      title: 'Sanggala Corridor Project',
      last_edit: '10-01-24',
      published: '20-02-24',
      project_stage: 'implementation',
    },
    {
      key: 2,
      title:
        'Kalau artikelnya panjang jadi gini aja, Kalau artikelnya panjang jadi gini aja, Kalau artikelnya panjang jadi gini aja',
      last_edit: '15-01-24',
      published: '25-02-24',
      project_stage: 'ideation',
    },
  ];

  return (
    <div className='h-[1000px]'>
      <PageTitle
        title='Project List'
        rightNode={
          <Row
            gutter={[8, 0]}
            justify='center'
            align='middle'
            className='cursor-pointer'
            onClick={() => navigate('/dashboard/projects/create')}
          >
            <Col>
              <img src={Plus} alt='plus' />
            </Col>
            <Col>
              <p className='text-[14px] underline'>New Project</p>
            </Col>
          </Row>
        }
      />

      <CarbonxTable scroll={{ x: 1024 }} columns={columns} dataSource={data} />
    </div>
  );
};

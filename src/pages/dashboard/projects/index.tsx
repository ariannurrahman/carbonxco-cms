import React, { useMemo } from 'react';

import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects } from './useProjects';
import { Project } from './types';
import { formatDate } from 'utils';

interface DataType {
  key: React.Key;
  title: string;
  last_edit: string;
  published: string;
  project_stage: string;
}

export const Projects = () => {
  const navigate = useNavigate();

  const { isLoadingProjects, projects, onTableChange, deleteProjectMutation } = useProjects({});

  const dataSource: DataType[] = useMemo(() => {
    return projects?.data.data.map((eachProject: Project) => {
      return {
        key: eachProject?.id ?? '-',
        last_edit: formatDate(eachProject?.updatedAt),
        project_stage: eachProject?.status ?? '-',
        published: formatDate(eachProject?.createdAt),
        title: eachProject?.title ?? '-',
      };
    });
  }, [projects]);

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
      dataIndex: 'key',
      render: (id: string) => {
        return (
          <Row>
            <Button type='text'>
              <Link to={`${id}/edit`}>
                <p className='underline text-[#46A7ED] font-normal text-[14px]'>Edit</p>
              </Link>
            </Button>
            <Button type='text' onClick={() => deleteProjectMutation.mutate(id)}>
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

      <CarbonxTable
        columns={columns}
        dataSource={dataSource}
        footer={() => (
          <p className='text-[#8D8D8D] text-[12px] font-semibold'>
            Showing {dataSource?.length} / {projects?.data?.count}
          </p>
        )}
        loading={isLoadingProjects}
        onChange={onTableChange}
        pagination={{
          defaultPageSize: 15,
          pageSize: 15,
          total: projects?.data.count,
        }}
        scroll={{ x: 1024 }}
      />
    </div>
  );
};

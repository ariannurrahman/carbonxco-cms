import { Button, Col, Input, Row, TableColumnType } from 'antd';

import { PageTitle } from 'components/page-title';
import { CarbonxTable } from 'components/table';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useTeams } from './useTeams';
import { useMemo } from 'react';
import { formatDate } from 'utils';
import { Team } from './types';

interface DataType {
  key: React.Key;
  team: string;
  last_edit: string;
  published: string;
  category: string;
}

export const Teams = () => {
  const navigate = useNavigate();
  const { isLoadingTeams, onTableChange, teams, deleteTeamMutation } = useTeams({});

  const columns: TableColumnType<DataType>[] = [
    {
      title: 'Team',
      dataIndex: 'team',
      ellipsis: true,
      sorter: (a, b) => {
        if (a.team.toUpperCase() < b.team.toUpperCase()) {
          return -1;
        }
        if (a.team.toUpperCase() > b.team.toUpperCase()) {
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
            <Button onClick={() => deleteTeamMutation.mutate(id)} type='text'>
              <img src={Trash} alt='delete' />
            </Button>
          </Row>
        );
      },
    },
  ];

  const dataSource: DataType[] = useMemo(() => {
    return teams?.data.data.map((eachTeam: Team) => {
      return {
        key: eachTeam?.id ?? '-',
        last_edit: formatDate(eachTeam?.updatedAt),
        published: formatDate(eachTeam?.createdAt),
        team: eachTeam?.name ?? '-',
      };
    });
  }, [teams]);

  return (
    <div className='h-[1000px]'>
      <PageTitle
        title='Team Member'
        rightNode={
          <Row
            gutter={[8, 0]}
            justify='center'
            align='middle'
            className='cursor-pointer'
            onClick={() => navigate('/dashboard/teams/create')}
          >
            <Col>
              <img src={Plus} alt='plus' />
            </Col>
            <Col>
              <p className='text-[14px] underline'>New Team Member</p>
            </Col>
          </Row>
        }
      />

      <CarbonxTable
        columns={columns}
        dataSource={dataSource}
        footer={() => (
          <p className='text-[#8D8D8D] text-[12px] font-semibold'>
            Showing {dataSource?.length} / {teams?.data?.count}
          </p>
        )}
        loading={isLoadingTeams}
        onChange={onTableChange}
        pagination={{
          defaultPageSize: 15,
          pageSize: 15,
          total: teams?.data.count,
        }}
        scroll={{ x: 1024 }}
      />
    </div>
  );
};

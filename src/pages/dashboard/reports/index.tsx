import { useQuery } from '@tanstack/react-query';
import { Button, Col, DatePicker, Row } from 'antd';
import type { DatePickerProps } from 'antd';
import { getReports } from 'api/reports';
import { PageTitle } from 'components/page-title';
import { useState } from 'react';

const monthFormat = 'YYYY/MM';

export const Reports = () => {
  const [selectedTime, setSelectedTime] = useState({
    year: 0,
    month: 0,
  });

  const fetchReports = async () => {
    return await getReports(selectedTime.month.toString(), selectedTime.year.toString());
  };

  const {
    data,
    isLoading: isLoadingFetchReports,
    refetch: refetchGetReports,
  } = useQuery({
    queryFn: fetchReports,
    queryKey: ['getReports'],
    refetchOnWindowFocus: false,
    retry: false,
    // manual: true,
    enabled: !!selectedTime.month || !!selectedTime.year,
  });

  console.log('data', data);
  console.log('isLoadingFetchReports', isLoadingFetchReports);

  const onChangeMonth: DatePickerProps['onChange'] = (_, dateString) => {
    const modifiedDate = dateString.split('/');
    setSelectedTime({
      year: parseInt(modifiedDate[0]),
      month: parseInt(modifiedDate[1]),
    });
  };

  const onClickGetReport = () => {
    refetchGetReports();
  };

  return (
    <div>
      <PageTitle title='Reports' />
      <Row
        gutter={[8, 8]}
        className='flex flex-row items-center h-[80px] mt-3 m-0 shadow-sm bg-white rounded-md px-5 md:px-8 w-full'
      >
        <Col>
          <DatePicker placeholder='Select date' onChange={onChangeMonth} picker='month' format={monthFormat} />
        </Col>

        <Col>
          <Button
            disabled={selectedTime.month === 0 && selectedTime.year === 0}
            // loading={isLoadingFetchReports}
            className='bg-[#1677ff]'
            type='primary'
            onClick={onClickGetReport}
          >
            Get Report
          </Button>
        </Col>
      </Row>
    </div>
  );
};

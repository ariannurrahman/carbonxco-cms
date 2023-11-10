import './style.scss';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, DatePicker, Row, Table } from 'antd';
import type { DatePickerProps } from 'antd';
import CsvDownloadButton from 'react-json-to-csv';

import { getReports } from 'api/reports';
import { PageTitle } from 'components/page-title';
import { thousandFormatter } from 'utils';
import { format, fromUnixTime } from 'date-fns';

const monthFormat = 'YYYY/MM';

export const Reports = () => {
  const [selectedTime, setSelectedTime] = useState({
    year: 0,
    month: 0,
  });

  const isFormFilled = selectedTime.month && selectedTime.year;

  const fetchReports = async () => {
    return await getReports(selectedTime.month.toString(), selectedTime.year.toString());
  };

  const { data: reportsData, isLoading: isLoadingReports } = useQuery({
    queryFn: fetchReports,
    queryKey: ['getReports', selectedTime],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!selectedTime.month || !!selectedTime.year,
  });

  const onChangeMonth: DatePickerProps['onChange'] = (_, dateString) => {
    const modifiedDate = dateString.split('/');
    setSelectedTime({
      year: parseInt(modifiedDate[0]),
      month: parseInt(modifiedDate[1]),
    });
  };

  const reportsColumn: any = [
    { title: 'No', dataIndex: 'no', key: 'no', align: 'center' },
    { title: 'Item Name', dataIndex: 'item_name', key: 'item_name' },
    {
      title: 'Item Price',
      dataIndex: 'item_price',
      key: 'item_price',
      render: (price: number) => thousandFormatter(price.toString()),
    },
    {
      title: 'Item Qty',
      dataIndex: 'item_quantity',
      key: 'item_quantity',
      render: (qty: number) => thousandFormatter(qty.toString()),
    },
    { title: 'Supplier Name', dataIndex: 'supplier_name', key: 'supplier_name' },
    { title: 'Customer Name', dataIndex: 'customer_name', key: 'customer_name' },
    {
      title: 'DPP IDR',
      dataIndex: 'dpp_idr',
      key: 'dpp_idr',
      render: (dpp: number) => thousandFormatter(dpp.toString()),
    },
    {
      title: 'DPP USD',
      dataIndex: 'dpp_usd',
      key: 'dpp_usd',
      render: (dpp: number) => thousandFormatter(dpp.toString()),
    },
    {
      title: 'IDR Price',
      dataIndex: 'idr_price',
      key: 'idr_price',
      render: (price: number) => thousandFormatter(price.toString()),
    },
    {
      title: 'TAX',
      dataIndex: 'tax',
      key: 'tax',
      render: (tax: number) => thousandFormatter(tax.toString()),
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (totalPrice: number) => thousandFormatter(totalPrice.toString()),
    },
    { title: 'Travel Permit Number', dataIndex: 'travel_permit_number', key: 'travel_permit_number' },
    { title: 'PIC', dataIndex: 'pic', key: 'pic' },
    {
      title: 'Print Date',
      dataIndex: 'print_date',
      key: 'print_date',
      render: (date: number) => {
        return format(new Date(fromUnixTime(date)), 'PP');
      },
    },
  ];
  const reportsWithIndex = reportsData?.data?.map((eachReport: any, index: number) => {
    return {
      ...eachReport,
      index,
    };
  });
  return (
    <div className='h-100 pb-52'>
      <PageTitle title='Reports' />
      <Row
        gutter={[8, 8]}
        className='flex flex-row items-center h-[80px] mt-3 m-0 shadow-sm bg-white rounded-md py-2 px-2 md:px-8 w-full'
      >
        <Col xs={12} md={6}>
          <DatePicker
            className='w-full'
            placeholder='Select date'
            onChange={onChangeMonth}
            picker='month'
            format={monthFormat}
          />
        </Col>

        <Col xs={12} md={4}>
          {isFormFilled ? (
            <CsvDownloadButton
              filename={`${selectedTime.month}-${selectedTime.year}`}
              className={`w-full get-reports-btn ${isFormFilled ? '' : 'get-reports-btn-disable'}`}
              data={reportsData?.data ?? []}
            >
              Get Reports
            </CsvDownloadButton>
          ) : (
            <Button
              disabled={selectedTime.month === 0 && selectedTime.year === 0}
              className='bg-[#1677ff] w-full'
              type='primary'
            >
              Get Report
            </Button>
          )}
        </Col>
      </Row>
      {isFormFilled ? (
        <Table
          style={{ whiteSpace: 'nowrap' }}
          rowKey='index'
          loading={isLoadingReports}
          className='mt-3'
          dataSource={reportsWithIndex || []}
          columns={reportsColumn}
          scroll={{ x: 300 }}
          pagination={false}
        />
      ) : null}
    </div>
  );
};

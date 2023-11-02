import './style.scss';

import { forwardRef } from 'react';
import { Col, Row, Space, Table } from 'antd';
import { dollarFormatter, thousandFormatter } from 'utils';
import { POTableDataProps } from 'types/Po';
import { useQuery } from '@tanstack/react-query';
import { getDetailPreOrder } from 'api/pre-order';

interface InvoiceTemplateProps {
  data: POTableDataProps;
}

export const PoTemplate = forwardRef((props: InvoiceTemplateProps, ref: any) => {
  const { data } = props;
  const { id } = data;
  const fetchDetailPreOrder = async () => {
    if (!id) return;
    const response = await getDetailPreOrder(id);
    return response;
  };
  const { data: detailPreOrder } = useQuery({
    queryFn: fetchDetailPreOrder,
    queryKey: ['preOrderDetail'],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });

  const order = detailPreOrder?.data?.po_order;
  const items = detailPreOrder?.data?.po_items.map((eachItem, index) => ({ ...eachItem, index: index + 1 }));

  const columns = [
    { title: 'No', dataIndex: 'index', key: 'index', width: 40 },
    { title: 'Description', dataIndex: ['item', 'name'], key: 'item_name' },
    {
      title: 'Pack Size (kg)',
      dataIndex: ['item', 'packaging_volume'],
      key: 'packaging_volume',
      render: (volume: number) => thousandFormatter(volume.toString()),
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty: number) => thousandFormatter(qty.toString()),
    },
    { title: 'Packing', dataIndex: ['item', 'packaging_type'], key: 'packaging_type' },
    {
      title: 'Net Weight (kg)',
      dataIndex: ['item'],
      key: 'net_weight',
      render: (_: any, data: any) => {
        const netWeight = data.quantity * data.item.packaging_volume;

        return thousandFormatter(netWeight.toString());
      },
    },
    {
      title: 'Price /kg',
      dataIndex: 'buy_price',
      key: 'price',
      render: (price: number) => dollarFormatter(price.toString()),
    },
    {
      title: 'Total',
      dataIndex: 'buy_price',
      key: 'subTotal',
      render: (price: number, data: any) => {
        const total = price * data.quantity;
        return dollarFormatter(total.toString());
      },
    },
  ];

  return (
    <div ref={ref} className='invoice-pdf-wrapper p-7' style={{ minWidth: '21cm', minHeight: '29.7cm' }}>
      <Row className='text-center' justify='center'>
        <Space className='text-center' direction='vertical'>
          <strong className='text-center text-xl'>PURCHASE ORDER</strong>
          <strong className='text-center text-xl'>NO : {order?.po_number} </strong>
        </Space>
      </Row>
      <Row className='w-full mt-10'>
        <Col span={12}>
          <p>To: </p>
          <p>{order?.supplier_name}</p>
          {/* <p>{order?.supplier_address}</p> */}
        </Col>
        <Col span={12}>
          <p>Bill/ Notify to:</p>
          <p>PT. VERA INTERCHEM PRATAMA</p>
          <p>JL Suvarna Sutera Boulevard B 19. UNIT C 230</p>
          <p>Ds Pasir Gadung Kec Cikupa. Kab Tangerang 15560</p>
          <p>Tel : +62818-08-703903</p>
          <p>NPWP: 50.000.891.7-451.000</p>
          <p>Attn: Angelia Vera</p>
        </Col>
      </Row>

      <Row className='mt-8 mb-2' justify='space-between'>
        <Col className='text-left'>PLEASE SUPPLY US WITH THE FOLLOWING ITEMS :</Col>
        <Col className='text-right'>Currency : USD</Col>
      </Row>
      <Table
        className='invoice-table'
        footer={() => {
          return (
            <Row justify='space-between' align='middle'>
              <Col>
                <strong>Total</strong>
              </Col>
              <Col>
                {/* <strong>{dollarFormatter(invoiceDetail?.data?.invoice?.total_price.toString())}</strong> */}
              </Col>
            </Row>
          );
        }}
        bordered
        rowKey='id'
        columns={columns}
        dataSource={items}
        pagination={false}
      />

      <Row className='mt-2 mb-8' justify='space-between'>
        <Col className='text-left'>PLEASE SIGN AND SEND IT BACK FOR CONFIRMATION</Col>
      </Row>

      <Row>
        <Col span={24}>
          <p>TERM & CONDITION:</p>
        </Col>
        <Col offset={2} span={12}>
          <Row className='flex justify-between flex-row'>
            <Col span={8}>Payment Terms</Col>
            <Col span={12}>: XXXXX</Col>
          </Row>
          <Row className='flex justify-between flex-row'>
            <Col span={8}>Delivery Time</Col>
            <Col span={12}>: ASAP</Col>
          </Row>
          <Row className='flex justify-between flex-row'>
            <Col span={8}>Remarks</Col>
            <Col span={12}>: </Col>
          </Row>
        </Col>
      </Row>

      <Row justify='space-between' className='mt-3 px-16'>
        <Col className='h-40 flex flex-col justify-between'>
          <p className='text-center'>Approved By:</p>
          <div>
            <p>(.....................)</p>
          </div>
        </Col>
        <Col className='h-40 flex flex-col justify-between'>
          <p className='text-center'>Issued By:</p>
          <div>
            <p>Angelia Vera Dewi</p>
          </div>
        </Col>
      </Row>
    </div>
  );
});

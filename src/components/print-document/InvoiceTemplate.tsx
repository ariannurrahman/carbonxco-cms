import './style.scss';

import { forwardRef } from 'react';
import { InvoiceDetail } from 'types/Invoice';
import { Col, Row, Table } from 'antd';
import { thousandFormatter } from 'utils';
import { useInvoiceDetail } from 'pages/dashboard/invoice/hooks/useInvoiceDetail';

interface InvoiceTemplateProps {
  data: InvoiceDetail;
}

export const InvoiceTemplate = forwardRef((props: InvoiceTemplateProps, ref: any) => {
  const { data } = props;

  const { invoiceDetail } = useInvoiceDetail(data?.id ?? '');
  const invoiceData = invoiceDetail?.data?.invoice_items.map((eachItem, index) => {
    return { ...eachItem, index: index + 1 };
  });

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      width: 40,
      render: (no: number) => <p className='text-center'>{no}</p>,
    },
    { title: 'Description', dataIndex: ['item', 'name'], key: 'itemName' },

    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty: number) => thousandFormatter(qty.toString()),
    },
    { title: 'Satuan', dataIndex: ['item', 'packaging_type'], key: 'packaging_type' },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => thousandFormatter(price.toString()),
    },
    {
      title: 'Total',
      dataIndex: 'price',
      key: 'subTotal',
      render: (price: number, data: any) => {
        const total = price * data.quantity;
        return thousandFormatter(total.toString());
      },
    },
  ];

  const TAX = 0.11;

  const total = invoiceDetail?.data?.invoice?.total_price ?? 0;
  const ppn = (invoiceDetail?.data?.invoice?.total_price ?? 0) * TAX ?? 0;

  const TableFooter = () => {
    return (
      <Row className='table-footer' justify='space-between' align='top'>
        <Col span={16}>
          <Col span={24}>
            <p>- Pembayaran untuk invoice ini mohon ditransfer ke rekening:</p>
          </Col>
          <Col offset={2} span={20} className='flex flex-col'>
            <strong>BCA KCP SUPERMAL KARAWACI TANGERANG</strong>
            <strong>No Rekening : 7611.251.011</strong>
            <strong>Atas Nama PT. Vera Interchem Pratama</strong>
          </Col>
          <Col span={24}>
            <p>- Pembayaran dianggap lunas apabila telah diterima di rekening kami</p>
          </Col>
        </Col>
        <Col span={8}>
          <Row className='flex justify-between flex-row'>
            <Col>TOTAL</Col>
            <Col>{thousandFormatter(total.toString())}</Col>
          </Row>
          <Row className='flex justify-between flex-row'>
            <Col>PPN</Col>
            <Col>{thousandFormatter(ppn.toString())}</Col>
          </Row>
          <Row className='flex justify-between flex-row'>
            <Col>GRAND TOTAL</Col>
            <Col>{thousandFormatter((total + ppn).toString())}</Col>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <div ref={ref} className='invoice-pdf-wrapper p-7' style={{ minWidth: '21cm', minHeight: '29.7cm' }}>
      <Row className='border-b-2 border-black pb-3 flex flex-col'>
        <strong>PT. VERA INTERCHEM PRATAMA</strong>
        <p>JL Suvarna Sutera Boulevard B 19. UNIT C 230</p>
        <p>Ds Pasir Gadung Kec Cikupa. Kab Tangerang 15560</p>
        <p>Telp : +62818 08 703903</p>
        <p>Email: sales@vipchem.co.id</p>
      </Row>
      <Row className='text-center mt-3 flex flex-col' justify='center'>
        <strong className='text-center text-xl'>INVOICE</strong>
        <strong className='text-center text-xl'>NO : VIP 001/10/23</strong>
      </Row>
      <Row className='w-full mt-5' justify='space-between' align='top'>
        <Col span={12}>
          <p>Kepada: </p>
          <strong>{data?.customer?.name}</strong>
          <p>{data?.customer.invoice_address}</p>
        </Col>
        <Col span={12}>
          <Row className='flex justify-between flex-row'>
            <Col span={9}>Tanggal</Col>
            <Col span={12}>: 12 01 2001</Col>
          </Row>
          <Row className='flex justify-between flex-row'>
            <Col span={9}>PO No.</Col>
            <Col span={12}>: XXXXX</Col>
          </Row>
          <Row className='flex justify-between flex-row'>
            <Col span={9}>No. Surat Jalan</Col>
            <Col span={12}>: XXXXX</Col>
          </Row>
          <Row className='flex justify-between flex-row'>
            <Col span={9}>Tgl Jatuh Tempo</Col>
            <Col span={12}>: XXXXX</Col>
          </Row>
          <Row className='flex justify-between flex-row'>
            <Col span={9}>Mata Uang</Col>
            <Col span={12}>: IDR</Col>
          </Row>
        </Col>
      </Row>

      <Row className='mt-3 mb-2' justify='space-between'>
        <Col className='text-left'>NPWP : 02.289.460.4-451.000</Col>
      </Row>
      <Table
        className='invoice-table'
        footer={TableFooter}
        bordered
        rowKey='id'
        columns={columns}
        dataSource={invoiceData}
        pagination={false}
      />

      <Row justify='end'>
        <Col className='h-40 flex flex-col justify-between'>
          <p className='text-center'>Hormat Kami,</p>
          <div>
            <p className='border-b-1 border-black'>Angelia Vera Dewi</p>
            <p>Presiden Direktur</p>
          </div>
        </Col>
      </Row>
    </div>
  );
});

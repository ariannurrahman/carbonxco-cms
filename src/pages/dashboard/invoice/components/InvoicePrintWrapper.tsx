import { InvoiceTemplate } from 'components/print-document/InvoiceTemplate';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { InvoiceDetail } from 'types/Invoice';

interface InvoicePrintWrapperProps {
  data: InvoiceDetail;
  status: string;
}

export const InvoicePrintWrapper = ({ data, status }: InvoicePrintWrapperProps) => {
  const componentRef = useRef(null);
  return (
    <>
      <ReactToPrint
        trigger={() => {
          return <p>{status === 'due' ? 'Force Print' : 'Print'}</p>;
        }}
        content={() => componentRef.current}
      />
      <InvoiceTemplate ref={componentRef} data={data} />
    </>
  );
};

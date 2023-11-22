import { PoTemplate } from 'components/print-document/PoTemplate';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { POTableDataProps } from 'types/Po';

interface InvoicePrintWrapperProps {
  data: POTableDataProps | undefined;
  status: string;
  paymentTerms: number;
}

export const PoTemplateWrapper = ({ data, status, paymentTerms }: InvoicePrintWrapperProps) => {
  const componentRef = useRef(null);
  return (
    <>
      <ReactToPrint
        trigger={() => {
          return <p>{status === 'due' ? 'Force Print' : 'Print'}</p>;
        }}
        content={() => componentRef.current}
      />
      <PoTemplate ref={componentRef} data={data} paymentTerms={paymentTerms} />
    </>
  );
};

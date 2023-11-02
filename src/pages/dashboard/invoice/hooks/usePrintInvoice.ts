import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePrintInvoice = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return {
    onPrint: handlePrint,
    componentRef,
  };
};

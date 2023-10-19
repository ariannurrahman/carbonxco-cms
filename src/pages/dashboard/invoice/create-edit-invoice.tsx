export type InvoiceState = 'create' | 'edit' | 'view';

interface InvoiceEditCreateProps {
  state: InvoiceState;
}

export const CreateEditInvoice = ({ state }: InvoiceEditCreateProps) => {
  console.log({ state });
  return <div>CreateEditInvoice</div>;
};

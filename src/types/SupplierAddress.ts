export type SupplierAction = 'create' | 'delete' | 'edit';

export interface Supplier {
  supplier_name: string;
  address: string;
  phone: string;
  fax: string;
  pic: string;
  id?: string;
}

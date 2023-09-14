export interface ResponseItem {
  data: Item[];
  metadata?: { total_items: number };
}

export interface ItemDetail {
  data: Item;
}

export interface Item {
  name: string;
  supplier_name: string;
  serial_number: string;
  id?: string;
}

export interface TableDataProps {
  item_name?: string;
  serial_number?: string;
  supplier_name?: string;
  id?: string;
}

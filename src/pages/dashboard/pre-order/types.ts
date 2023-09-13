export interface POTableDataProps {
  eta: string;
  etd: string;
  status: string;
  supplier_name: string;
  id: string;
}

export interface PoResponse {
  data: POTableDataProps[];
  metadata?: { total_items: number };
}

export interface ConfirmFormProps {
  eta: number;
  etd: number;
}

export interface ChangeModalStatusProps {
  isOpen: boolean;
  type: ModalType;
  onCancelModal: () => void;
  onSubmit: (form: ConfirmFormProps, str: ModalType) => void;
  isLoadingSubmit: boolean;
}

export type ModalType = 'confirm' | 'cancel' | 'complete';

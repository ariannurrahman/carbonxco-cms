import { Modal } from 'antd';

interface ExchangeRateModalProps {
  isOpen: boolean;
  onCancelModal: () => void;
  onSubmit: () => void;
  isLoadingSubmit: boolean;
}

export const ExchangeRateModal = (props: ExchangeRateModalProps) => {
  return (
    <Modal open={props.isOpen} onCancel={props.onCancelModal}>
      ExchangeRateModal
    </Modal>
  );
};

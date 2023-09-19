import { Col, Row, Modal, DatePicker } from 'antd';
import { VIPButton } from 'components/button';
import { getUnixTime } from 'date-fns';
import { useState } from 'react';
import { ChangeModalStatusProps, ConfirmFormProps } from 'types/Po';

export const ChangeModalStatus = ({
  onSubmit,
  isOpen,
  type,
  onCancelModal,
  isLoadingSubmit,
}: ChangeModalStatusProps) => {
  const [confirmForm, setConfirmForm] = useState<ConfirmFormProps>({ eta: 0, etd: 0 });

  const onChangeForm = (value: any, name: string) => {
    if (!value) return;
    setConfirmForm((prevState) => ({ ...prevState, [name]: getUnixTime(new Date(value)) }));
  };

  const isDisabledSubmit = type === 'confirm' ? !confirmForm.eta || !confirmForm.etd : false;

  return (
    <Modal width={300} title={`${type.toUpperCase()} this PO?`} footer={false} open={isOpen} onCancel={onCancelModal}>
      {type === 'confirm' && (
        <>
          <DatePicker
            className='w-full mb-3'
            onChange={(value) => onChangeForm(value, 'eta')}
            name='eta'
            placeholder='ETA'
            size='large'
          />
          <DatePicker
            className='w-full'
            onChange={(value) => onChangeForm(value, 'etd')}
            name='etd'
            placeholder='ETD'
            size='large'
          />
        </>
      )}
      <Row className='mt-3' justify='center' align='middle' gutter={[12, 12]}>
        <Col>
          <VIPButton
            loading={isLoadingSubmit}
            disabled={isDisabledSubmit || isLoadingSubmit}
            htmlType='submit'
            form='confirm-po'
            onClick={() => onSubmit(confirmForm, type)}
          >
            Yes
          </VIPButton>
        </Col>
        <Col>
          <VIPButton onClick={onCancelModal} danger>
            No
          </VIPButton>
        </Col>
      </Row>
    </Modal>
  );
};

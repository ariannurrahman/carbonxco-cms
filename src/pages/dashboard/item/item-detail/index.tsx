import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Input, Row, Form, Divider, message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Item, getItem, updateItem } from 'api/items';
import { VIPButton } from 'components/button';

export const ItemDetail = () => {
  const queryClient = useQueryClient();

  const [isFormDisable, setIsFormDisable] = useState(true);
  const [form] = Form.useForm();

  const params = useParams();
  const { id = '' } = params;

  const { isLoading, data } = useQuery({
    queryFn: () => getItem(id),
    queryKey: ['itemDetail'],
    refetchOnWindowFocus: false,
    retry: false,
  });

  console.log('data', data);

  const mutate = useMutation({
    mutationKey: ['itemUpdate'],
    mutationFn: (value: Item) => {
      return updateItem(value);
    },
    onSuccess: () => {
      message.success('Item updated!');
      queryClient.invalidateQueries(['itemList']);
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  useEffect(() => {
    const initFormValue = () =>
      form.setFieldsValue({
        name: data?.data?.name,
        supplier_name: data?.data?.supplier_name,
        serial_number: data?.data?.serial_number,
      });

    initFormValue();
  }, [data, form]);

  const onClickEditItem = () => setIsFormDisable(false);

  const onSubmitForm = (value: Item) => {
    mutate.mutate({
      ...value,
      id,
    });
    console.log('submit');
  };

  return (
    <Row className='w-full shadow-sm bg-white rounded-md px-5 md:px-8'>
      <Row align='middle' className='w-full h-[40px] mt-5' justify='space-between'>
        <Col>
          <p className='text-left font-bold text-lg'>Item Detail</p>
        </Col>
        <Col>
          <VIPButton size='middle' onClick={onClickEditItem}>
            Edit Item
          </VIPButton>
        </Col>
      </Row>
      <Divider />
      <Row className='w-full'>
        <Col span={24}>
          <Form
            form={form}
            layout='vertical'
            style={{ maxWidth: 600 }}
            name='edit-item-detail-form'
            requiredMark={false}
            onFinish={onSubmitForm}
            disabled={isFormDisable || isLoading}
          >
            <Form.Item label='Item Name' name='name' rules={[{ required: true, message: 'Input item name!' }]}>
              <Input size='large' placeholder='Input item name' />
            </Form.Item>
            <Form.Item
              label='Supplier Name'
              name='supplier_name'
              rules={[{ required: true, message: 'Input supplier name!' }]}
            >
              <Input size='large' placeholder='Input supplier name' />
            </Form.Item>
            <Form.Item
              label='Serial Number'
              name='serial_number'
              rules={[{ required: true, message: 'Input serial number!' }]}
            >
              <Input size='large' placeholder='Input serial number' />
            </Form.Item>

            <Form.Item>
              <VIPButton size='large' className='w-full' htmlType='submit'>
                Submit
              </VIPButton>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Row>
  );
};

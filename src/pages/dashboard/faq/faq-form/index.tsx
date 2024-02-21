import { useNavigate } from 'react-router-dom';

import { Button, Col, Form, Input, Row } from 'antd';

interface FaqDataType {
  question: string;
  answer: string;
}

export const FaqForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onClickBack = () => {
    navigate(-1);
  };

  const onFinish = () => {
    const data = form.getFieldsValue();
    console.log('form', data);
  };
  return (
    <div className='lg:pl-20 pb-40'>
      <Button onClick={onClickBack} className='mt-5' type='text'>
        <p className='underline text-[#46A7ED] text-[14px]'>Back to Question List</p>
      </Button>
      <Form
        form={form}
        className='mt-3 lg:mt-10'
        name='project-form'
        colon={false}
        labelAlign='left'
        labelWrap
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item<FaqDataType>
          label='Question'
          name='question'
          rules={[{ required: true, message: 'Question is required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FaqDataType>
          label='Answer'
          name='answer'
          rules={[{ required: true, message: 'Answer is required!' }]}
        >
          <Input.TextArea rows={8} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16, offset: 2 }}>
          <Row justify='end' align='middle' gutter={[12, 0]}>
            <Col>
              <Button onClick={onClickBack} className='h-10' type='text' htmlType='submit'>
                <p className='underline text-[#46A7ED] text-[14px]'>Discards</p>
              </Button>
            </Col>
            <Col>
              <Button type='primary' htmlType='submit' className='bg-[#46A7ED] h-10'>
                <p className='text-base text-white'>Save Changes</p>
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

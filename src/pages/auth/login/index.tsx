import { Button, Card, Form, Input, Row, Typography } from 'antd';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LoginPayload } from 'types/Auth';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = (payload: LoginPayload) => {
    login(payload);
    navigate('/dashboard/item');
  };

  // eslint-disable-next-line
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card className='p-3 w-[320px]'>
      <Typography.Title className='text-center mb-3' level={3}>
        Welcome to VIP
      </Typography.Title>
      <Row>
        <Form
          name='basic'
          layout='vertical'
          className='w-[300px] mt-3'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          requiredMark={false}
        >
          <Form.Item<LoginPayload>
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size='large' placeholder='Insert username' />
          </Form.Item>

          <Form.Item<LoginPayload>
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size='large' placeholder='Insert password' autoComplete='on' />
          </Form.Item>

          <Form.Item>
            <Button className='w-full bg-[#1677ff]' size='large' type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Card>
  );
};

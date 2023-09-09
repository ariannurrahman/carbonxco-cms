import { Button, Card, Form, Input, Row, Typography, message } from 'antd';
import { VIPButton } from 'components/button';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LoginPayload } from 'types/Auth';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = (payload: LoginPayload) => {
    login(payload);
    if (payload.password === 'inventory') {
      navigate('/dashboard/item');
    } else {
      return message.error('Wrong password');
    }
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
          name='login-form'
          layout='vertical'
          className='w-[300px] mt-3'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          requiredMark={false}
        >
          {/* <Form.Item<LoginPayload>
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size='large' placeholder='Insert username' />
          </Form.Item> */}

          <Form.Item<LoginPayload>
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password size='large' placeholder='Insert password' autoComplete='on' />
          </Form.Item>

          <Form.Item>
            <VIPButton className='w-full' size='large' type='primary' htmlType='submit'>
              Submit
            </VIPButton>
          </Form.Item>
        </Form>
      </Row>
    </Card>
  );
};

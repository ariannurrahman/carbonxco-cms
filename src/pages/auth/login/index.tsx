import './style.scss';

import { Button, Card, Form, Input, Row } from 'antd';
import { useAuth } from 'hooks/useAuth';
import { LoginPayload } from 'types/Auth';
import LoginBg from 'assets/bg-login.png';

export const Login = () => {
  const { login } = useAuth();

  const onFinish = (payload: LoginPayload) => {
    login.mutateAsync(payload);
  };

  return (
    <div className='relative w-screen h-screen flex justify-center items-center'>
      <Card className='bg-transparent p-3 w-[388px] relative z-20 border-none'>
        <p className='text-center mb-3 text-white text-[32px] font-medium'>Login</p>
        <Row>
          <Form
            name='login-form'
            layout='vertical'
            className='w-full mt-3 flex justify-center flex-col items-center'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            requiredMark={false}
          >
            <Form.Item<LoginPayload>
              className='form-input w-full'
              label='E-mail Address*'
              name='email'
              rules={[{ required: true, message: 'Please input the email!' }]}
            >
              <Input className='form-input h-16 px-5 text-white' size='large' autoComplete='on' />
            </Form.Item>
            <Form.Item<LoginPayload>
              className='form-input w-full'
              label='Password*'
              name='password'
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password className='form-input h-16 px-5 text-white' size='large' autoComplete='on' />
            </Form.Item>

            <Form.Item>
              <Button size='large' className='bg-[#46A7ED] w-[86px] h-10 rounded-[4px] border-none' htmlType='submit'>
                <p className='text-white hover:text-white'>Login</p>
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Card>
      <img src={LoginBg} className='absolute top-0 left-0 z-10 object-fill w-full h-full' alt='login' />
    </div>
  );
};

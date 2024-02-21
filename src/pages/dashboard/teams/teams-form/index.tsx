import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Col, Divider, Form, Input, Row, Upload, UploadFile, UploadProps } from 'antd';

import { CarbonxUploadButton } from 'components/upload-button';

interface NewsFormData {
  title: string;
  summary: string;
  category: string[];
  featuredImage: File;
  body: string;
}

export const TeamsForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [featureImage, setFeatureImage] = useState<UploadFile<any>[]>([]);

  const handleChangeFeatureImage: UploadProps['onChange'] = (info) => {
    setLoading(true);

    const fileList = [...info.fileList];
    fileList.slice(-1);
    setFeatureImage(fileList);

    setLoading(false);
  };

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
        <p className='underline text-[#46A7ED] text-[14px]'>Back to Teams List</p>
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
        <Form.Item<NewsFormData>
          label='Project Title'
          name='title'
          rules={[{ required: true, message: 'Title is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<NewsFormData>
          label={
            <div className='flex flex-col'>
              <p>Project Summary</p>
              <p className='text-[#8D8D8D]'>Max. 150 char.</p>
            </div>
          }
          name='summary'
          rules={[{ required: true, message: 'Summary is required!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<NewsFormData>
          label='Featured Image'
          name='featuredImage'
          rules={[{ required: true, message: 'Feature Image is required!' }]}
        >
          <Upload
            name='featuredImage'
            listType='picture-card'
            className='border-solid bg-white'
            showUploadList
            fileList={featureImage}
            beforeUpload={() => false}
            onChange={handleChangeFeatureImage}
          >
            {featureImage.length ? null : <CarbonxUploadButton loading={loading} />}
          </Upload>
        </Form.Item>

        <Divider />

        <Form.Item<NewsFormData> label='Body' name='body' rules={[{ required: true, message: 'Body is required!' }]}>
          <Input.TextArea rows={8} />
        </Form.Item>

        <Divider />

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

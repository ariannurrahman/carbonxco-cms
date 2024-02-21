import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Col, Divider, Form, Input, Radio, Row, Upload, UploadFile, UploadProps } from 'antd';
import { SGD, status } from '../constants';
import { CarbonxUploadButton } from 'components/upload-button';

interface ProjectFormData {
  title: string;
  summary: string;
  featuredImage: FileList;
  sgd: string[];
  projectStarted: string;
  location: string;
  projectArea: string;
  projectAreaDescription: string;
  ecosystemType: string;
  mainGoals: string;
  keyFactors: string;
  status: string;
  projectMap: File;
  ctaButtons: string;
  buttonLinks: string;
  gallery: FileList;
}

export const ProjectForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [featureImage, setFeatureImage] = useState<UploadFile<any>[]>([]);
  const [projectImage, setProjectImage] = useState<UploadFile<any>[]>([]);
  const [gallery, setGallery] = useState<UploadFile<any>[]>([]);

  const handleChangeFeatureImage: UploadProps['onChange'] = (info) => {
    setLoading(true);

    const fileList = [...info.fileList];
    fileList.slice(-1);
    setFeatureImage(fileList);

    setLoading(false);
  };

  const handleChangeProjectMap: UploadProps['onChange'] = (info) => {
    setLoading(true);

    const fileList = [...info.fileList];
    fileList.slice(-1);
    setProjectImage(fileList);

    setLoading(false);
  };

  const handleChangeGallery: UploadProps['onChange'] = (info) => {
    setLoading(true);

    const fileList = [...info.fileList];
    setGallery(fileList);

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
      <Button className='mt-5' onClick={onClickBack} type='text'>
        <p className='underline text-[#46A7ED] text-[14px]'>Back to Project List</p>
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
        // style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item<ProjectFormData>
          label='Project Title'
          name='title'
          rules={[{ required: true, message: 'Title is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
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

        <Form.Item<ProjectFormData>
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

        <Form.Item<ProjectFormData> name='sgd' label='SGD' rules={[{ required: true, message: 'SGD is required!' }]}>
          <Checkbox.Group>
            {SGD.map((eachSGD) => {
              return (
                <Checkbox className='mr-5 mt-5' key={eachSGD} value={eachSGD}>
                  {eachSGD}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Project Started'
          name='projectStarted'
          rules={[{ required: true, message: 'Project Started is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Location'
          name='location'
          rules={[{ required: true, message: 'Location is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Project Area'
          name='projectArea'
          rules={[{ required: true, message: 'Project Area is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Project Area Description'
          name='projectAreaDescription'
          rules={[{ required: true, message: 'Project Area Description is required!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Ecosystem Type'
          name='ecosystemType'
          rules={[{ required: true, message: 'Ecosystem Type is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Main Goals'
          name='mainGoals'
          rules={[{ required: true, message: 'Main Goals is required!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Key Factors'
          name='keyFactors'
          rules={[{ required: true, message: 'Key Factors is required!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Divider />

        <Form.Item<ProjectFormData>
          label='Status'
          name='status'
          rules={[{ required: true, message: 'Status is required!' }]}
        >
          <Radio.Group>
            {status.map((eachStatus) => {
              return (
                <Radio className='mr-5 mt-5' value={eachStatus} key={eachStatus}>
                  {eachStatus}
                </Radio>
              );
            })}
          </Radio.Group>
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Project Map'
          name='projectMap'
          rules={[{ required: true, message: 'Feature Image is required!' }]}
        >
          <Upload
            name='featureImage'
            listType='picture-card'
            className='border-solid bg-white'
            showUploadList
            fileList={projectImage}
            beforeUpload={() => false}
            onChange={handleChangeProjectMap}
          >
            {projectImage.length ? null : <CarbonxUploadButton loading={loading} />}
          </Upload>
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='CTA Buttons'
          name='ctaButtons'
          rules={[{ required: true, message: 'CTA Buttons is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Button Links to'
          name='buttonLinks'
          rules={[{ required: true, message: 'Button Links to is required!' }]}
        >
          <Input />
        </Form.Item>

        <Divider />

        <Form.Item<ProjectFormData>
          label='Gallery Photo'
          name='gallery'
          rules={[{ required: true, message: 'Gallery Photo is required!' }]}
        >
          <Upload
            name='gallery'
            listType='picture-card'
            className='border-solid bg-white'
            showUploadList
            fileList={gallery}
            beforeUpload={() => false}
            onChange={handleChangeGallery}
          >
            <CarbonxUploadButton loading={loading} />
          </Upload>
        </Form.Item>

        <Divider />

        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
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

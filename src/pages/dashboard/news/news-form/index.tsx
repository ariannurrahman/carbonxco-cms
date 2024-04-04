import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Divider, Form, Input, Row, Select, Upload, UploadFile, UploadProps } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { CarbonxUploadButton } from 'components/upload-button';
import { currentAction } from 'utils';
import { useNews } from '../useNews';
import { PostDocumentResponse, useMutationDocument } from 'hooks/useMutationDocument';

interface NewsFormData {
  title: string;
  meta_title: string;
  meta_description: string;
  project_summary: string;
  category: string;
  featuredImage: File;
  content: string;
}

export const NewsForm = () => {
  const [newsContent, setNewsContent] = useState('');

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id = '' } = useParams();
  const action = currentAction(id);

  const { createNewsMutation, isLoadingNewsDetail, newsDetail, updateNewsMutation } = useNews({ id, action });

  const { postDocumentMutation, deleteDocumentMutation } = useMutationDocument();

  const [loading, setLoading] = useState(false);
  const [featureImage, setFeatureImage] = useState<UploadFile[]>([]);

  const documentLength = newsDetail?.data?.documents?.length === 0 ? 0 : newsDetail?.data?.documents?.length - 1;

  const documentId = newsDetail?.data.documents?.[documentLength]?.id ?? '';
  useEffect(() => {
    if (action === 'create' || !id) return;
    form.setFieldsValue(newsDetail?.data);
    setNewsContent(newsDetail?.data?.content);

    if (documentLength >= 0) {
      const initFeature = newsDetail?.data?.documents?.[documentLength]
        ? [newsDetail?.data?.documents?.[documentLength]]
        : [];
      setFeatureImage(initFeature);
      form.setFieldValue('featuredImage', initFeature);
    }
  }, [action, form, newsDetail, id, documentLength]);

  const handleChangeFeatureImage: UploadProps['onChange'] = (info) => {
    setLoading(true);

    if (info.file.status === 'removed') {
      // @ts-expect-error: The is exist tho
      deleteDocumentMutation.mutate(featureImage[0].id, {
        onSuccess: () => {
          setFeatureImage([]);
          form.setFieldValue('featuredImage', []);
        },
      });
      setFeatureImage([]);
    } else {
      const fileList = [...info.fileList];
      fileList.slice(-1);
      if (fileList.length) {
        postDocumentMutation.mutate(
          {
            document_type: 'blog_thumbnail',
            file: fileList[0].originFileObj as File,
            reference_type: 'blogs',
            id: documentId,
          },
          {
            onSuccess: (res: PostDocumentResponse) => {
              form.setFieldValue('featuredImage', [{ ...fileList[0], ...res }]);
              setFeatureImage([{ ...fileList[0], ...res }]);
            },
          },
        );
      }
    }

    setLoading(false);
  };

  const onClickBack = () => {
    navigate(-1);
  };

  const onChangeNewsContent = (value: string) => {
    form.setFieldValue('content', value);
    setNewsContent(value);
  };

  const onFinish = () => {
    const data = form.getFieldsValue();
    if (action === 'edit') {
      updateNewsMutation.mutate({ id, payload: data });
    } else {
      createNewsMutation.mutate(data);
    }
  };
  return (
    <div className='lg:pl-20 pb-40'>
      <Button onClick={onClickBack} className='mt-5' type='text'>
        <p className='underline text-[#46A7ED] text-[14px]'>Back to Article List</p>
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
        disabled={isLoadingNewsDetail && action !== 'create'}
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
          label='Meta Title'
          name='meta_title'
          rules={[{ required: true, message: 'Meta title is required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<NewsFormData>
          label='Meta Description'
          name='meta_description'
          rules={[{ required: true, message: 'Meta description is required!' }]}
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
          name='project_summary'
          rules={[{ required: true, message: 'Project summary is required!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<NewsFormData>
          label='Category'
          name='category'
          rules={[{ required: true, message: 'Category is required!' }]}
        >
          <Select>
            <Select.Option value='news'>News</Select.Option>
            <Select.Option value='insight'>Insight</Select.Option>
            <Select.Option value='all_about_carbon'>All About Carbon</Select.Option>
          </Select>
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
            showUploadList={!postDocumentMutation.isLoading}
            fileList={featureImage}
            beforeUpload={() => false}
            onChange={handleChangeFeatureImage}
          >
            {featureImage.length ? null : <CarbonxUploadButton loading={loading} />}
          </Upload>
        </Form.Item>

        <Divider />

        <Form.Item<NewsFormData> label='Body' name='content' rules={[{ required: true, message: 'Body is required!' }]}>
          <ReactQuill theme='snow' value={newsContent} onChange={onChangeNewsContent} />
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

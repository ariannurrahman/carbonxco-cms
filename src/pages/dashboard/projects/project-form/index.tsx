import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import dayjs from 'dayjs';
import { fromUnixTime, getUnixTime } from 'date-fns';

import { SGD, status } from '../constants';
import { CarbonxUploadButton } from 'components/upload-button';
import { useProjects } from '../useProjects';
import { currentAction } from 'utils';
import { PostDocumentResponse, useMutationDocument } from 'hooks/useMutationDocument';

interface ProjectFormData {
  title: string;
  description: string;
  featuredImage: FileList[];
  start_date: string;
  location: string;
  area: string;
  sdg: string[];
  area_description: string;
  ecosystem_type: string;
  main_goal: string;
  key_factor: string;
  status: string;
  projectMap: File[];
  button_text: string;
  button_link_to: string;
  gallery: FileList;
  community: string;
}

export const ProjectForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id = '' } = useParams();
  const action = currentAction(id);
  const [loading, setLoading] = useState(false);
  const [featureImage, setFeatureImage] = useState<UploadFile[]>([]);
  const [projectMapImage, setProjectMapImage] = useState<UploadFile[]>([]);
  const [gallery, setGallery] = useState<UploadFile<any>[]>([]);

  const { createProjectMutation, isLoadingProjectDetail, projectDetail, updateProjectMutation } = useProjects({
    action,
    id,
  });

  const { postDocumentMutation, deleteDocumentMutation } = useMutationDocument();

  const documentList = projectDetail?.data?.documents;

  useEffect(() => {
    if (action !== 'edit') return;
    const initImage = () => {
      const featureImageData = documentList?.filter(
        ({ document_type }: { document_type: string }) => document_type === 'project_thumbnail',
      );
      const projectMapImageData = documentList?.filter(
        ({ document_type }: { document_type: string }) => document_type === 'project_map',
      );
      const galleryData = documentList?.filter(
        ({ document_type }: { document_type: string }) => document_type === 'project_gallery',
      );

      const featureImageDataLength = featureImageData?.length - 1 || 0;
      const projectMapImageDataLength = projectMapImageData?.length - 1 || 0;

      if (featureImageData?.length) {
        form.setFieldValue('featuredImage', [featureImageData?.[featureImageDataLength]]);
        form.setFieldValue('oldFeatId', featureImageData?.[featureImageDataLength].id);
        setFeatureImage([featureImageData?.[featureImageDataLength]]);
      }
      if (projectMapImageData?.length) {
        form.setFieldValue('projectMap', [projectMapImageData?.[projectMapImageDataLength]]);
        setProjectMapImage([projectMapImageData?.[projectMapImageDataLength]]);
      }
      if (galleryData?.length) {
        form.setFieldValue('gallery', galleryData);
        setGallery(galleryData);
      }
    };
    initImage();
  }, [action, documentList, form]);

  useEffect(() => {
    if (action === 'create' || !id) return;
    const projectStarted = projectDetail?.data?.start_date
      ? dayjs(new Date(fromUnixTime(projectDetail?.data?.start_date)))
      : '';

    form.setFieldsValue({ ...projectDetail?.data, start_date: projectStarted });
  }, [action, form, projectDetail, id]);

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
    } else {
      const fileList = [...info.fileList];
      fileList.slice(-1);
      if (fileList.length) {
        const oldFeatId = form.getFieldValue('oldFeatId');

        postDocumentMutation.mutate(
          {
            document_type: 'project_thumbnail',
            file: fileList[0].originFileObj as File,
            reference_type: 'projects',
            id: oldFeatId ?? '',
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

  const handleChangeProjectMap: UploadProps['onChange'] = (info) => {
    setLoading(true);

    if (info.file.status === 'removed') {
      // @ts-expect-error: The is exist tho
      deleteDocumentMutation.mutate(projectMapImage[0].id, {
        onSuccess: () => {
          setProjectMapImage([]);
          form.setFieldValue('projectMap', []);
        },
      });
    } else {
      const fileList = [...info.fileList];
      fileList.slice(-1);
      if (fileList.length) {
        postDocumentMutation.mutate(
          {
            document_type: 'project_map',
            file: fileList[0].originFileObj as File,
            reference_type: 'projects',
            id: '',
          },
          {
            onSuccess: (res: PostDocumentResponse) => {
              form.setFieldValue('projectMap', [{ ...fileList[0], ...res }]);
              setProjectMapImage([{ ...fileList[0], ...res }]);
            },
          },
        );
      }
    }

    setLoading(false);
  };
  console.log('gallery', gallery);

  const handleChangeGallery: UploadProps['onChange'] = (info) => {
    console.log('gallery', info.file.status);
    setLoading(true);
    if (info.file.status === 'removed') {
      const copy = [...gallery];
      console.log('file', info.file);

      // @ts-expect-error: The is exist tho
      deleteDocumentMutation.mutate(info?.file?.id ?? '', {
        onSuccess: () => {
          // @ts-expect-error: The is exist tho
          const newGallery = copy.filter(({ id }: { id: string }) => id !== info.file.id);
          setGallery(newGallery);
          form.setFieldValue('gallery', newGallery);
        },
      });
    } else {
      const fileList = [...info.fileList];
      const eachGallery = fileList.slice(-1);

      if (fileList.length) {
        postDocumentMutation.mutate(
          {
            document_type: 'project_gallery',
            file: eachGallery[0].originFileObj as File,
            reference_type: 'projects',
            id: '',
          },
          {
            onSuccess: (res: PostDocumentResponse) => {
              setGallery((prevState) => {
                const updated = [...prevState, { ...eachGallery[0], ...res }];
                form.setFieldValue('gallery', updated);

                return updated;
              });
              navigate(-1);
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

  const onFinish = () => {
    const data = form.getFieldsValue();

    const startDate = getUnixTime(new Date(data.start_date ?? new Date()));
    const payload = { ...data, start_date: startDate };
    console.log('payload on finish', payload);
    if (action === 'edit') {
      updateProjectMutation.mutate({ id, payload });
    } else {
      createProjectMutation.mutate(payload);
    }
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
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
        disabled={isLoadingProjectDetail && action !== 'create'}
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
          name='description'
          rules={[{ required: true, message: 'description is required!' }]}
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
            showUploadList={!postDocumentMutation.isLoading}
            fileList={featureImage}
            beforeUpload={() => false}
            onChange={handleChangeFeatureImage}
          >
            {featureImage.length ? null : <CarbonxUploadButton loading={postDocumentMutation.isLoading || loading} />}
          </Upload>
        </Form.Item>

        <Form.Item<ProjectFormData> name='sdg' label='SDG' rules={[{ required: true, message: 'SDG is required!' }]}>
          <Checkbox.Group>
            {SGD.map((eachSGD) => {
              return (
                <Checkbox className='mr-5 mt-5' key={eachSGD.value} value={eachSGD.value}>
                  {eachSGD.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Project Started'
          name='start_date'
          rules={[{ required: true, message: 'Project Started is required!' }]}
        >
          <DatePicker format={'DD MMMM YYYY'} />
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
          name='area'
          rules={[{ required: true, message: 'Project Area is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Project Area Description'
          name='area_description'
          rules={[{ required: true, message: 'Project Area Description is required!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Ecosystem Type'
          name='ecosystem_type'
          rules={[{ required: true, message: 'Ecosystem Type is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Main Goals'
          name='main_goal'
          rules={[{ required: true, message: 'Main Goals is required!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Key Factors'
          name='key_factor'
          rules={[{ required: true, message: 'Key Factors is required!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item<ProjectFormData>
          label='Community'
          name='community'
          rules={[{ required: true, message: 'Community is required!' }]}
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
            showUploadList={!postDocumentMutation.isLoading}
            fileList={projectMapImage}
            beforeUpload={() => false}
            onChange={handleChangeProjectMap}
          >
            {projectMapImage.length ? null : (
              <CarbonxUploadButton loading={postDocumentMutation.isLoading || loading} />
            )}
          </Upload>
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='CTA Buttons'
          name='button_text'
          rules={[{ required: true, message: 'CTA Buttons is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectFormData>
          label='Button Links to'
          name='button_link_to'
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
            showUploadList={!postDocumentMutation.isLoading}
            fileList={gallery}
            beforeUpload={() => false}
            onChange={handleChangeGallery}
          >
            <CarbonxUploadButton loading={postDocumentMutation.isLoading || loading} />
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

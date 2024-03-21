import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Col, Form, Input, Row, Upload, UploadFile, UploadProps } from 'antd';

import { CarbonxUploadButton } from 'components/upload-button';
import { useTeams } from '../useTeams';
import { currentAction } from 'utils';
import { usePostDocument } from 'hooks/usePostDocument';
import { useGetDocument } from 'hooks/useGetDocument';

interface TeamFormData {
  image: File;
  name: string;
  position: string;
  description: string;
  link: string;
}

export const TeamsForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id = '' } = useParams();
  const action = currentAction(id);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<UploadFile[]>([]);

  const { createTeamMutation, isLoadingTeamDetail, teamDetail, updateTeamMutation } = useTeams({ id, action });
  const documentLength = teamDetail?.data?.documents.length - 1 || 0;
  console.log('documentLength', documentLength);
  const documentId = teamDetail?.data.documents?.[documentLength]?.id ?? '';

  const { documentUrl } = useGetDocument(documentId);

  const { postDocumentMutation } = usePostDocument();

  useEffect(() => {
    if (action === 'create' || !id) return;
    form.setFieldsValue({ ...teamDetail?.data, image: documentUrl?.data.url });
    setImage([
      {
        url: documentUrl?.data.url,
        uid: 'uid',
        name: 'teams',
      },
    ]);
  }, [action, form, teamDetail, id, documentUrl]);

  const handleChangeimage: UploadProps['onChange'] = (info) => {
    setLoading(true);

    const fileList = [...info.fileList];
    fileList.slice(-1);

    if (fileList.length) {
      postDocumentMutation.mutate({
        document_type: 'team_avatar',
        file: fileList[0].originFileObj as File,
        reference_type: 'teams',
        id: documentId,
      });
    }
    setImage(fileList);

    setLoading(false);
  };

  const onClickBack = () => {
    navigate(-1);
  };

  const onFinish = () => {
    const data = form.getFieldsValue();
    if (action === 'edit') {
      updateTeamMutation.mutate({ id, payload: data });
    } else {
      createTeamMutation.mutate(data);
    }
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
        disabled={isLoadingTeamDetail && action !== 'create'}
      >
        <Form.Item<TeamFormData>
          label='Featured Image'
          name='image'
          rules={[{ required: true, message: 'Image is required!' }]}
        >
          <Upload
            name='image'
            listType='picture-card'
            className='border-solid bg-white'
            showUploadList
            fileList={image}
            beforeUpload={() => false}
            onChange={handleChangeimage}
          >
            {image.length ? null : <CarbonxUploadButton loading={loading} />}
          </Upload>
        </Form.Item>

        <Form.Item<TeamFormData> label='Nama' name='name' rules={[{ required: true, message: 'Name is required!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<TeamFormData>
          label='Jabatan'
          name='position'
          rules={[{ required: true, message: 'Jabatan is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<TeamFormData>
          label='LinkedIn Link'
          name='link'
          rules={[{ required: true, message: 'LinkedIn link is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<TeamFormData>
          label='Deskripsi'
          name='description'
          rules={[{ required: true, message: 'Description is required!' }]}
        >
          <Input.TextArea rows={4} />
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

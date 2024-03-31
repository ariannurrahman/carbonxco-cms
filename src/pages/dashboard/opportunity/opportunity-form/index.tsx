import { useNavigate, useParams } from 'react-router-dom';

import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { useJobs } from '../useJobs';
import { currentAction } from 'utils';
import { useEffect } from 'react';

interface OpportunityFormData {
  title: string;
  type: string;
  location: string;
  requirement: string[];
  qualification: string[];
}

export const OpportunityForm = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const action = currentAction(id);
  const [form] = Form.useForm();

  const { createJobMutation, jobDetail, isLoadingJobDetail, updateJobMutation } = useJobs({ id, action });

  useEffect(() => {
    if (action === 'create' || !id) return;
    form.setFieldsValue(jobDetail?.data);
  }, [action, form, jobDetail, id]);

  const onClickBack = () => {
    navigate(-1);
  };

  const onFinish = () => {
    const data = form.getFieldsValue();
    if (action === 'edit') {
      updateJobMutation.mutate({ id, payload: data });
    } else {
      createJobMutation.mutate(data);
    }
  };
  return (
    <div className='lg:pl-20 pb-40'>
      <Button onClick={onClickBack} className='mt-5' type='text'>
        <p className='underline text-[#46A7ED] text-[14px]'>Back to Jobs List</p>
      </Button>
      <Form
        form={form}
        className='mt-3 lg:mt-10'
        name='opportunity-form'
        colon={false}
        labelAlign='left'
        labelWrap
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
        disabled={isLoadingJobDetail && action !== 'create'}
      >
        <Form.Item<OpportunityFormData>
          label='Job Title'
          name='title'
          rules={[{ required: true, message: 'Job Title is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<OpportunityFormData>
          label='Type'
          name='type'
          rules={[{ required: true, message: 'Type is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<OpportunityFormData>
          label='Location'
          name='location'
          rules={[{ required: true, message: 'Location is required!' }]}
        >
          <Input />
        </Form.Item>

        <Form.List name='requirement' initialValue={jobDetail?.data.requirement ?? ['']}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => {
                  return (
                    <div key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? 'Requirements' : ' '}
                        rules={[{ required: true, message: 'Requirements is required!' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Row className='w-full mb-5' gutter={[12, 0]}>
                        {index === 0 && (
                          <Col offset={6}>
                            <Button onClick={() => add()}>+</Button>
                          </Col>
                        )}
                        {index !== 0 && (
                          <Col offset={6}>
                            <Button danger onClick={() => remove(index)}>
                              -
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Form.List>

        <Form.List name='qualification' initialValue={jobDetail?.data.qualification ?? ['']}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => {
                  return (
                    <div key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? 'Qualifications, Skills & Experiences' : ' '}
                        rules={[{ required: true, message: 'Qualifications, Skills & Experiences is required!' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Row className='w-full mb-5' gutter={[12, 0]}>
                        {index === 0 && (
                          <Col offset={6}>
                            <Button onClick={() => add()}>+</Button>
                          </Col>
                        )}
                        {index !== 0 && (
                          <Col offset={6}>
                            <Button danger onClick={() => remove(index)}>
                              -
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Form.List>

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

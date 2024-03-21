import { message } from 'antd';
import { useMutation } from '@tanstack/react-query';

import { Document, postDocument } from 'api/document';

export const usePostDocument = () => {
  const postDocumentMutation = useMutation({
    mutationKey: ['post-document'],
    mutationFn: (payload: Document) => {
      return postDocument(payload);
    },
    onSuccess: () => {
      message.success('Upload file success!');
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  return {
    postDocumentMutation,
  };
};

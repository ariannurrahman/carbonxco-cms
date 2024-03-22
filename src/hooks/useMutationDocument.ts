import { message } from 'antd';
import { useMutation } from '@tanstack/react-query';

import { deleteDocument, Document, postDocument } from 'api/document';

export const useMutationDocument = () => {
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

  const deleteDocumentMutation = useMutation({
    mutationKey: ['delete-document'],
    mutationFn: (id: string) => {
      return deleteDocument(id);
    },
    onSuccess: () => {
      message.success('Delete file success!');
    },
    onError: (e: any) => {
      const errorBE = e.response.data.error;
      message.error(`${errorBE}`);
    },
  });

  return {
    postDocumentMutation,
    deleteDocumentMutation,
  };
};

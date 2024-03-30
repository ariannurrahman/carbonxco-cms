import { message } from 'antd';
import { useMutation } from '@tanstack/react-query';

import { deleteDocument, Document, postDocument } from 'api/document';

export interface PostDocumentResponse {
  file_name: string;
  file_type: string;
  key: string;
  url: string;
}

export const useMutationDocument = () => {
  const postDocumentMutation = useMutation({
    mutationKey: ['post-document'],
    mutationFn: async (payload: Document) => {
      const response = await postDocument(payload);
      return response.data;
    },
    onSuccess: (response) => {
      message.success('Upload file success!');
      return response.data;
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

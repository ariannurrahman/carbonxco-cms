import { CarbonxApi } from 'api';

export type ReferenceType = 'careers' | 'projects' | 'blogs' | 'teams' | 'pages';
export type DocumentType =
  | 'team_avatar'
  | 'blog_thumbnail'
  | 'project_thumbnail'
  | 'applicants_cv'
  | 'project_gallery'
  | 'project_map';

export interface Document {
  reference_type: ReferenceType;
  document_type: DocumentType;
  id?: string;
  file: File;
}

export const postDocument = ({ document_type, file, reference_type, id }: Document) => {
  const payload = {
    document_type,
    file,
    reference_type,
    id,
  };

  return CarbonxApi.post('/documents', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getDocument = (id: string) => {
  return CarbonxApi.get(`/documents/${id}/url`, {
    headers: {
      'Content-Type': 'image/*',
    },
  });
};

export const deleteDocument = (id: string) => {
  return CarbonxApi.delete(`/documents/${id}`);
};

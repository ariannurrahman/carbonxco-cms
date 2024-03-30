export interface News {
  title: string;
  meta_title: string;
  meta_description: string;
  category: string;
  content: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  documents?: File[];
  featuredImage?: File[];
}

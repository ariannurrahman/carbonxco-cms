import { useQuery } from '@tanstack/react-query';
import { getDocument } from 'api/document';

export const useGetDocument = (id: string) => {
  const { isLoading: isLoadingDocument, data: documentUrl } = useQuery({
    queryFn: () => getDocument(id),
    queryKey: ['documents'],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });

  return {
    isLoadingDocument,
    documentUrl,
  };
};

import { CarbonxApi } from 'api';
import { Team } from 'pages/dashboard/teams/types';
import { Pagination } from 'types/Pagination';

export const getTeams = (pagination: Pagination) => {
  const { limit, page } = pagination;
  return CarbonxApi.get(`/teams?page=${page}&limit=${limit}`);
};

export const getTeamDetail = (id: string) => {
  return CarbonxApi.get(`/teams/${id}`);
};

export const postTeam = (payload: Team) => {
  const copy = { ...payload };
  const documents = handleImage(copy);
  delete copy.image;
  return CarbonxApi.post('/teams', { ...copy, documents });
};

export const updateTeam = (id: string, payload: Team) => {
  const copy = { ...payload };
  const documents = handleImage(copy);
  delete copy.image;
  return CarbonxApi.put(`/teams/${id}`, { ...copy, documents });
};

export const deleteTeam = (id: string) => {
  return CarbonxApi.delete(`/teams/${id}`);
};

const handleImage = (payload: Team) => {
  console.log('payload', payload);

  if (typeof payload.image === 'string') return [];

  const documents = payload?.image?.map((eachDoc: any) => {
    return {
      id: eachDoc.id ?? '',
      file_type: eachDoc.file_type,
      file_name: eachDoc.file_name,
      url: eachDoc.url,
      document_type: 'team_avatar',
      key: eachDoc.key,
    };
  });
  return documents;
};

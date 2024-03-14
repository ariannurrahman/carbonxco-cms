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
  return CarbonxApi.post('/teams', payload);
};

export const updateTeam = (id: string, payload: Team) => {
  return CarbonxApi.put(`/teams/${id}`, payload);
};

export const deleteTeam = (id: string) => {
  return CarbonxApi.delete(`/teams/${id}`);
};

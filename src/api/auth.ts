import { CarbonxApi } from 'api';
import { LoginPayload } from 'types/Auth';

export const login = (payload: LoginPayload) => {
  return CarbonxApi.post('/login', payload);
};

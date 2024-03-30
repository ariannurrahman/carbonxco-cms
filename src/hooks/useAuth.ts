import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useLocalStorage } from './useLocalStorage';
import { LoginPayload } from 'types/Auth';
import { login } from 'api/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setItem } = useLocalStorage();

  const mutationLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginPayload) => {
      return login(payload);
    },
    onSuccess: (res) => {
      const accessToken = res.data.access_token;
      console.log('accessToken', accessToken);
      setItem('accessToken', accessToken);
      queryClient.invalidateQueries(['login']);
      navigate('/dashboard/projects');
      window.location.reload();
    },
    onError: (err: any) => {
      console.log('err', err);
    },
  });
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return { login: mutationLogin, logout };
};

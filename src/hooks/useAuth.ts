import { useLocalStorage } from './useLocalStorage';
import { LoginPayload } from 'types/Auth';

export const useAuth = () => {
  const { setItem } = useLocalStorage();

  // eslint-disable-next-line
  const login = async (payload: LoginPayload) => {
    console.log('login payload', payload);
    const MOCK_RESPONSE = {
      id: 'id',
      name: 'my name',
      authToken: 'MY JWT TOKEN',
    };
    setItem('accessToken', MOCK_RESPONSE.authToken);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return { login, logout };
};

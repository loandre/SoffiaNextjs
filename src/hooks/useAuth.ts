import { useContext } from 'react';
import { AuthContext } from './../contexts/auth';

const useAuth = () => {
  const context = useContext(AuthContext);

  const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
  };

  const handleAuthenticationResponse = (response: { data: { token: string } }) => {
    const { token } = response.data;
    saveTokenToLocalStorage(token);
    return response;
  };

  return {
    ...context,
    handleAuthenticationResponse,
  };
};

export default useAuth;

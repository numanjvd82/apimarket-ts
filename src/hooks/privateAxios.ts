import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const usePrivateAxios = () => {
  const { user } = useAuth();

  const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });

  return api;
};

export default usePrivateAxios;

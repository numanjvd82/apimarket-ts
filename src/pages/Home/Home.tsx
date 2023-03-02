import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const LOGOUT_URL = '/api/logout';

  const logoutUser = async () => {
    try {
      const response = await api.get(LOGOUT_URL, { withCredentials: true });
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <p>Logged in as {user?.email}</p>
      <p>Your role is {user?.role}</p>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
};

export default Home;

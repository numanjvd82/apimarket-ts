import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../axios';
import FormContainer from '../../components/FormContainer';
import Input from '../../components/Input';
import { IUser, useAuth } from '../../context/AuthContext';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const LOGIN_URL = '/api/login';

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.pathname || '/';

  const inputs = [
    {
      id: 1,
      label: 'Email',
      type: 'email',
      errorMessage: 'Email is required and must be unique',
      pattern: '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]',
    },
    {
      id: 2,
      label: 'Password',
      type: 'password',
      errorMessage: 'Password is required and must be at least 6 characters',
      pattern: '^[a-zA-Z0-9]{6,}$',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // TODO: Login user
    try {
      const response = await api.post(LOGIN_URL, data);
      console.log(response);

      const user: IUser = {
        role: response.data.role,
        accessToken: response.data.accessToken,
        email: values.email,
        password: values.password,
      };

      // TODO: Save user to context
      setUser(user);

      // TODO: Redirect to home page
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.label}>{input.label}</label>
              <Input
                type={input.type}
                name={input.label.toLowerCase()}
                id={input.label.toLowerCase()}
                value={values[input.label.toLowerCase() as keyof typeof values]}
                onChange={handleChange}
                required
                pattern={input.pattern}
                errorMessage={input.errorMessage}
              />
            </div>
          ))}
          <button className="btn-submit" type="submit">
            Login
          </button>
        </form>
      </FormContainer>
    </>
  );
};

export default Login;

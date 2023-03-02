import { useState } from 'react';
import Input from '../../components/Input';
import FormContainer from '../../components/FormContainer';
import './register.css';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  const inputs = [
    {
      id: 1,
      label: 'Username',
      type: 'text',
      errorMessage: 'Username is required and must be at least 3 characters',
      pattern: '^[a-zA-Z0-9]{3,}$',
    },
    {
      id: 2,
      label: 'Email',
      type: 'email',
      errorMessage: 'Email is required and must be a valid email',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
    },
    {
      id: 3,
      label: 'Password',
      type: 'password',
      errorMessage: 'Password is required and must be at least 6 characters',
      pattern: '^[a-zA-Z0-9]{6,}$',
    },
    {
      id: 4,
      label: 'ConfirmPassword',
      type: 'password',
      errorMessage: 'Confirm password is required and must match password',
      pattern: values.password,
    },
  ];

  return (
    <>
      <h1>Register</h1>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div key={input.id} className="form-group">
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
            Register
          </button>
        </form>
      </FormContainer>
    </>
  );
};

export default Register;

import './formContainer.css';

const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="form-container">{children}</div>;
};

export default FormContainer;

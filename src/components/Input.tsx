import './input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
  rest?: any;
}

const Input = (props: InputProps) => {
  const {
    name,
    type,
    value,
    onChange,
    required,
    pattern,
    id,
    errorMessage,
    rest,
  } = props;
  return (
    <div className="form-group">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern}
        {...rest}
      />
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};

export default Input;

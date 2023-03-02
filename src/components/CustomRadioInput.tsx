import React from 'react';

interface CustomCheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rest?: any;
}

const CustomCheckboxInput = ({
  name,
  value,
  onChange,
  ...rest
}: CustomCheckboxInputProps) => {
  return (
    <div className="custom_radio">
      <input
        type="checkbox"
        onChange={onChange}
        id={name}
        name={name}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default CustomCheckboxInput;

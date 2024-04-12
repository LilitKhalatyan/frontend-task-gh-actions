import React from "react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div>
      <label>{label}:</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;

/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

interface Props {
  labelClassName?: string;
  label: string;
  value: boolean;
  name: string;
  onChange: any;
  onBlur?: any;
  [x: string]: any;
}

function Button({
  label,
  labelClassName,
  value,
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  return (
    <div className="inline-flex items-center py-2">
      <input
        id={name}
        name={name}
        className={`rounded w-5 h-5 ${
          value && 'text-pink-600'
        } shadow-md border-2 focus:outline-none form-radio focus:ring-2 focus:ring-pink-600`}
        type="checkbox"
        onChange={() => onChange(!value)}
        onBlur={() => onBlur(value)}
        checked={value}
        {...props}
      />
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default Button;

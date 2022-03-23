/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

interface Props {
  secondary?: boolean | false;
  [x: string]: any;
}

function Input({ secondary, ...props }: Props) {
  if (secondary) {
    return (
      <input
        className="w-full form-input text-sm p-2 focus:border-transparent rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        type="text"
        {...props}
      />
    );
  }
  return (
    <input
      className="w-full form-input text-sm p-2  focus:border-transparent rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
      type="text"
      {...props}
    />
  );
}

export default Input;

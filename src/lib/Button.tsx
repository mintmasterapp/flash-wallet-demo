/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import ReactLoading from 'react-loading';

interface Props {
  name: string;
  loading?: boolean | false;
  secondary?: boolean | false;
  [x: string]: any;
}

function Button({ secondary, name, loading, ...props }: Props) {
  if (secondary) {
    return (
      <button
        className="font-sans bg-gray-100 py-2 px-6 border border-gray-500 text-gray-600 font-semibold  rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-3 focus:ring-pink-800"
        type="button"
        {...props}
      >
        {loading ? (
          <ReactLoading type="bubbles" color="#ffffff" height={25} width={25} />
        ) : (
          name
        )}
      </button>
    );
  }
  return (
    <button
      className="font-sans bg-gradient-to-r from-blue-700 to-green-400 py-2 px-6 text-white font-semibold  rounded-lg shadow-md hover:bg-pink-800 focus:outline-none focus:ring-3 focus:ring-pink-800"
      type="button"
      {...props}
    >
      {loading ? (
        <ReactLoading type="bubbles" color="#ffffff" height={25} width={25} />
      ) : (
        name
      )}
    </button>
  );
}

export default Button;

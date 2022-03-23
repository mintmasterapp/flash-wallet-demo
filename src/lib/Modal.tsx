/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import classnames from 'classnames';

const Modal = ({
  isActive,
  setIsActiveModal,
  children,
}: {
  isActive: boolean;
  setIsActiveModal: any;
  children: any;
}) => {
  return (
    <div
      className={classnames(
        { hidden: !isActive },
        'fixed z-100 inset-0 overflow-y-auto',
      )}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;

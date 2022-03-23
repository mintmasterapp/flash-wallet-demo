/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import ReactLoading from 'react-loading';
import { MdOutlineClose } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { Button, Modal } from '../lib';

const SigningLoading = ({
  isActiveModal,
  onClose,
  error,
}: {
  isActiveModal: boolean;
  onClose: () => void;
  error: string | null;
}) => {
  const err = error && error.length > 0 ? error : null;
  return (
    <Modal isActive={isActiveModal} setIsActiveModal={onClose}>
      <div
        className="inline-block align-bottom  text-left overflow-hidden transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="flex flex-col justify-center p-4 items-center bg-white rounded-lg shadow-xl">
          <div
            className={`flex justify-${
              err ? 'between' : 'end'
            } items-center w-full`}
          >
            {err && <h1 className="text-xl font-bold">Error</h1>}
            <div
              className="text-2xl bg-black rounded-full p-2 cursor-pointer"
              onClick={onClose}
            >
              <MdOutlineClose size={15} color="#ffffff" />
            </div>
          </div>
          <div className="py-4">
            {err ? (
              <BiError size={80} color="red" />
            ) : (
              <ReactLoading
                type="spin"
                height={80}
                width={80}
                color="#000000"
              />
            )}
          </div>
          {err ? (
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-xl text-gray-400 pt-2 text-center">{err}</h1>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-2xl font-semibold">
                Waiting For Confirmation
              </h1>
              <h1 className="text-xl text-gray-400 pt-2 text-center">
                Confirm this transaction in your wallet
              </h1>
            </div>
          )}
          {err && (
            <div className="mt-4">
              <Button name="Dismiss" onClick={onClose} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SigningLoading;

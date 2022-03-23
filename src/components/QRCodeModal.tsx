/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { Modal, QRCode } from '../lib';

const QRCodeModal = ({
  isActiveModal,
  onClose,
  qrCodeValue,
}: {
  isActiveModal: boolean;
  onClose: () => void;
  qrCodeValue: string;
}) => {
  return (
    <Modal isActive={isActiveModal} setIsActiveModal={onClose}>
      <div
        className="inline-block align-bottom  text-left overflow-hidden transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="flex justify-between py-4 items-center">
          <h1 className="text-3xl font-bold">Flash Wallet</h1>
          <div
            className="text-2xl bg-black rounded-full p-2 cursor-pointer"
            onClick={onClose}
          >
            <MdOutlineClose size={25} color="#ffffff" />
          </div>
        </div>

        <div className="flex flex-col justify-center p-4 items-center bg-white rounded-lg shadow-xl">
          <h1 className="text-xl text-gray-500 font-semibold">
            Scan QR Code with flash wallet.
          </h1>
          <div className="py-4">
            <QRCode size={450} value={qrCodeValue} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeModal;

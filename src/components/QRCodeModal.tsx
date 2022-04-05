/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { Modal, QRCode } from '../lib';

const activeClass = `bg-gradient-to-r from-blue-700 to-green-400 rounded-lg text-white`;

const QRCodeModal = ({
  isActiveModal,
  onClose,
  qrCodeValue,
}: {
  isActiveModal: boolean;
  onClose: () => void;
  qrCodeValue: string;
}) => {
  const [isActiveMobile, setIsActiveMobile] = useState(false);

  return (
    <Modal isActive={isActiveModal} setIsActiveModal={onClose}>
      <div
        className="inline-block text-left overflow-hidden transform transition-all align-middle max-w-lg w-full"
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
          <div className="flex justify-around w-full bg-gray-300 rounded-lg">
            <div
              className={`text-base font-semibold w-1/2 py-2 text-center ${
                isActiveMobile && activeClass
              }`}
              onClick={() => setIsActiveMobile(true)}
            >
              Mobile
            </div>
            <div
              className={`text-base font-semibold w-1/2 py-2 text-center ${
                !isActiveMobile && activeClass
              }`}
              onClick={() => setIsActiveMobile(false)}
            >
              QR Code
            </div>
          </div>
          <h1 className="text-xl text-gray-500 font-semibold text-center pt-5">
            Scan QR Code with flash wallet.
          </h1>

          {isActiveMobile && (
            <a
              className={`${activeClass} p-2 my-10`}
              href={`flash://wc?uri=${qrCodeValue}`}
            >
              <p className="text-xl font-semibold">Connect</p>
            </a>
          )}

          {!isActiveMobile && (
            <div className="py-4">
              <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
                <QRCode size={300} value={qrCodeValue} />
              </div>
              <div className="hidden sm:block md:block lg:block xl:block">
                <QRCode size={450} value={qrCodeValue} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeModal;

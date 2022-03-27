import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Input, CheckBox } from '../../lib';

const AssociateTokenModal = ({
  loading,
  isActiveModal,
  onClose,
  onSubmit,
}: {
  loading: boolean;
  isActiveModal: boolean;
  onClose: any;
  onSubmit: any;
}) => {
  const Validation = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      tokenId: '',
    },
    validationSchema: Validation,
    onSubmit,
  });

  return (
    <Modal isActive={isActiveModal} setIsActiveModal={onClose}>
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-gray-50 px-4 py-3">
          <h1 className="text-2xl">Associate Token</h1>
        </div>
        <div className="bg-white px-4 py-5">
          <div className="pb-4">
            <p className="pb-2 text-base text-gray-600">Token Id</p>
            <Input
              id="tokenId"
              name="tokenId"
              placeholder="0.0.123456"
              onChange={formik.handleChange}
              value={formik.values.tokenId}
            />
            {formik.errors.tokenId && formik.touched.tokenId && (
              <p className="text-red-500 text-xl">{formik.errors.tokenId}</p>
            )}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <Button
            loading={loading}
            name="Submit"
            onClick={formik.handleSubmit}
          />
          <div className="mr-2">
            <Button secondary name="Cancel" onClick={() => onClose(false)} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AssociateTokenModal;

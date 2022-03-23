import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Input } from '../../lib';

const CreateAccountModal = ({
  loading,
  isActiveModal,
  onClose,
  onSubmit,
}: {
  loading: boolean;
  isActiveModal: boolean;
  onSubmit: any;
  onClose: any;
}) => {
  const Validation = Yup.object().shape({
    accountId: Yup.string().required('Account id is required'),
    amount: Yup.string().required('Amount is required'),
  });

  const formik = useFormik({
    initialValues: {
      accountId: '',
      amount: '',
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
          <h1 className="text-2xl">Send (ℏ)</h1>
        </div>
        <div className="bg-white px-4 py-5">
          <div className="pb-4">
            <p className="pb-1 text-xl text-gray-600">Address</p>
            <Input
              id="accountId"
              name="accountId"
              placeholder="Please enter account id.."
              onChange={formik.handleChange}
              value={formik.values.accountId}
            />
            {formik.errors.accountId && formik.touched.accountId && (
              <p className="text-red-500 text-base">
                {formik.errors.accountId}
              </p>
            )}
          </div>
          <div className="pb-4">
            <p className="pb-1 text-base text-gray-600">Amount</p>
            <Input
              id="amount"
              placeholder="Please enter amount here.."
              name="amount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            {formik.errors.amount && formik.touched.amount && (
              <p className="text-red-500 text-xl">{formik.errors.amount}</p>
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

export default CreateAccountModal;

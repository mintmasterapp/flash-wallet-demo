import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uniqueNamesGenerator, Config, starWars } from 'unique-names-generator';
import { Modal, Button, Input } from '../../lib';

const customConfig: Config = {
  dictionaries: [starWars],
};

const CreateAccountModal = ({
  loading,
  isActiveModal,
  onClose,
  handleCreateAccount,
}: {
  loading: boolean;
  isActiveModal: boolean;
  onClose: any;
  handleCreateAccount: any;
}) => {
  const Validation = Yup.object().shape({
    name: Yup.string().required('Account name is required'),
    balance: Yup.string().required('Initial balance is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: uniqueNamesGenerator(customConfig),
      balance: '',
    },
    validationSchema: Validation,
    onSubmit: handleCreateAccount,
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
          <h1 className="text-2xl">Create Account</h1>
        </div>
        <div className="bg-white px-4 py-5">
          <div className="pb-4">
            <p className="pb-1 text-xl text-gray-600">Account Name</p>
            <Input
              id="name"
              name="name"
              placeholder="Please enter account name here.."
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-xl">{formik.errors.name}</p>
            )}
          </div>
          <div className="pb-4">
            <p className="pb-1 text-xl text-gray-600">Initial Balance</p>
            <Input
              id="balance"
              placeholder="Please enter initial balance here.."
              name="balance"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.balance}
            />
            {formik.errors.balance && formik.touched.balance && (
              <p className="text-red-500 text-xl">{formik.errors.balance}</p>
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

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Input, CheckBox } from '../../lib';

const CreateTokenModal = ({
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
      tokenName: '',
      tokenSymbol: '',
      initialSupply: '',
      decimals: '',
      defaultFreezeStatus: false,
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
          <h1 className="text-2xl">Create Token</h1>
        </div>
        <div className="bg-white px-4 py-5">
          <div className="pb-4">
            <p className="pb-2 text-base text-gray-600">Token Name</p>
            <Input
              id="tokenName"
              name="tokenName"
              placeholder="e.g hedera"
              onChange={formik.handleChange}
              value={formik.values.tokenName}
            />
            {formik.errors.tokenName && formik.touched.tokenName && (
              <p className="text-red-500 text-xl">{formik.errors.tokenName}</p>
            )}
          </div>
          <div className="pb-4">
            <p className="pb-2 text-base text-gray-600">Token Symbol</p>
            <Input
              id="tokenSymbol"
              placeholder="eg. HBAR"
              name="tokenSymbol"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.tokenSymbol}
            />
            {formik.errors.tokenSymbol && formik.touched.tokenSymbol && (
              <p className="text-red-500 text-xl">
                {formik.errors.tokenSymbol}
              </p>
            )}
          </div>
          <div className="pb-4">
            <p className="pb-2 text-base text-gray-600">Initial Supply</p>
            <Input
              id="initialSupply"
              placeholder="eg. 23587348"
              name="initialSupply"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.initialSupply}
            />
            {formik.errors.initialSupply && formik.touched.initialSupply && (
              <p className="text-red-500 text-xl">
                {formik.errors.initialSupply}
              </p>
            )}
          </div>
          <div className="pb-4">
            <CheckBox
              label="Default Freeze Status"
              labelClassName="ml-5"
              name="defaultFreezeStatus"
              onBlur={() => {}}
              onChange={(value: boolean) => {
                formik.setFieldValue('defaultFreezeStatus', value);
              }}
              value={formik.values.defaultFreezeStatus}
            />
            {formik.errors.initialSupply && formik.touched.initialSupply && (
              <p className="text-red-500 text-xl">
                {formik.errors.initialSupply}
              </p>
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

export default CreateTokenModal;

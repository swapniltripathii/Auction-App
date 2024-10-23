// src/components/modals/PaymentMethodModal.js
import React from "react";
import gpay from "../../assets/images/google_pay_icon.png";

const PaymentMethodModal = ({ handlePaymentSelect, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-black bg-opacity-50 backdrop-blur-lg text-black w-64 p-4 rounded-lg">
        <h2 className="text-lg text-white pb-2">Payment Method</h2>
        <div className="space-y-4">
          <div
            className="flex items-center justify-between p-2 bg-gray-100 rounded cursor-pointer"
            onClick={() => handlePaymentSelect("Credit or Debit")}
          >
            <p className="text-lg">Credit or Debit</p>
            <img src="credit-card-logos.png" alt="" />
          </div>
          <div
            className="flex items-center justify-between p-2 bg-gray-100 rounded cursor-pointer"
            onClick={() => handlePaymentSelect("Google Pay")}
          >
            <p className="text-lg">Google Pay</p>
            <img src={gpay} alt="Google Pay" className="w-14 h-12" />
          </div>
          <button className="text-red-500 mt-4" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;

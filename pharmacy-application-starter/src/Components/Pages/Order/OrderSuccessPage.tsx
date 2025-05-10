import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { transactionId, netAmount, billNumber } = location.state || {};
  console.log(transactionId, netAmount, billNumber);
  const handleGoHome = () => {
    alert("Redirecting to homepage..."); // Replace with actual navigation if needed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4 order">
      <BsCheckCircle className="text-green-600 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-2">
        Thank you for your purchase. Your transaction has been completed.
      </p>
      <p className="text-gray-600 text-sm mb-4">
        BILL NUMBER: <span className="font-mono">{billNumber}</span>
      </p>
      <p className="text-gray-600 text-sm mb-4">
        Transaction ID: <span className="font-mono">{transactionId}</span>
      </p>
      <p className="text-gray-600 text-sm mb-4">
        Amount Paid: <strong>${netAmount}</strong>
      </p>
      <button
        onClick={handleGoHome}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default OrderSuccessPage;

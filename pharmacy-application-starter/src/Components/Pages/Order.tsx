import React from "react";
import OrderInfo from "./Order/OrderInfo";
import SearchPatient from "./patient-search/searchPatient";
import { PatientHeaderContext } from "../Header/PatientHeader.types";
import store from "../Store/store";
import PatientHeader from "../Header/PatientHeader";
import { useNavigate } from "react-router-dom";
import { CashReceipt } from "./Order/Order.type";

function Order() {
  const navigate = useNavigate();

  let patientHeaderContext: PatientHeaderContext =
    store.getState().patientReducer;
  console.log(patientHeaderContext);

  const handleSuccessPage = (orderBillInfo: CashReceipt) => {
    console.log(orderBillInfo);
    navigate("/Order/OrderSuccessPage", {
      state: {
        transactionId: orderBillInfo.transactionId,
        netAmount: orderBillInfo.amountPaid,
        billNumber: orderBillInfo.billNumber,
      },
    });
  };

  if (patientHeaderContext) {
    return (
      <div className="order">
        <PatientHeader patientHeader={patientHeaderContext} />
        <OrderInfo navigateToSuccessPage={handleSuccessPage} />
      </div>
    );
  } else {
    return (
      <div className="order">
        <SearchPatient />
        <OrderInfo navigateToSuccessPage={handleSuccessPage} />
      </div>
    );
  }
}

export default Order;

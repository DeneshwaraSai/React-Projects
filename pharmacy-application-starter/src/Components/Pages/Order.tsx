import React from "react";
import OrderInfo from "./Order/OrderInfo";
import SearchPatient from "./patient-search/searchPatient";
import { PatientHeaderContext } from "../Header/PatientHeader.types";
import store from "../Store/store";
import PatientHeader from "../Header/PatientHeader";

function Order() {
  let patientHeaderContext: PatientHeaderContext =
    store.getState().patientReducer;
  console.log(patientHeaderContext);
  
  if (patientHeaderContext) {
    return (
      <div className="order">
        <PatientHeader patientHeader={patientHeaderContext} />
        <OrderInfo />
      </div>
    );
  } else {
    return (
      <div className="order">
        <SearchPatient />
        <OrderInfo />
      </div>
    );
  }
}

export default Order;

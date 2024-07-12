import { PatientAction, PatientHeader } from "./PatientHeader.types";

const initialState: PatientHeader = {
  patientId: 0,
  firstName: "",
  lastName: "",
  age: 0,
  gender: "",
  uhid: 0,
  orderNumber: "",
  orderStatus: "",
  billStatus: "",
};

const PatientReducer = (state = initialState, action: PatientAction) => {
  switch (action.type) {
    case "header":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        age: action.payload.age,
        gender: action.payload.gender,
        uhid: action.payload.uhid,
        orderNumber: action.payload.orderNumber,
        orderStatus: action.payload.orderStatus,
        billStatus: action.payload.billStatus,
      };

    default:
      return null;
  }
};

export default PatientReducer;

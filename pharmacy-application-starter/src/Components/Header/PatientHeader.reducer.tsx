import { PatientAction, PatientHeaderContext } from "./PatientHeader.types";

const initialState: PatientHeaderContext = {
  patientId: null,
  firstName: "",
  lastName: "",
  age: 0,
  gender: "",
  uhid: 0,
  orderNumber: "",
  orderStatus: "",
  billStatus: "",
  phoneNumber: "",
};

const PatientReducer = (
  state = getSessionStorageWithPatientHeader("patientHeader"),
  action: PatientAction
) => {
  switch (action.type) {
    case "header":
      const header = {
        ...state,
        patientId: action.payload.patientId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        age: action.payload.age,
        gender: action.payload.gender,
        uhid: action.payload.uhid,
        orderNumber: action.payload.orderNumber,
        orderStatus: action.payload.orderStatus,
        billStatus: action.payload.billStatus,
        phoneNumber: action.payload.phoneNumber,
      };
      console.log(header);
      setSessionStorageWithPatientHeader("patientHeader", header);

      return header;
    case "clear":
      return {};
    default:
      return {};
  }
};

export const setSessionStorageWithPatientHeader = (
  key: string,
  state: PatientHeaderContext
) => {
  sessionStorage.setItem(key, JSON.stringify(state));
};

export const getSessionStorageWithPatientHeader = (key: string) => {
  const context: string | null = sessionStorage.getItem(key);
  return context ? JSON.parse(context) : initialState;
};
export default PatientReducer;

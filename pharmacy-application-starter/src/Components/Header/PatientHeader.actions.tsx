import { getSessionStorageWithPatientHeader } from "./PatientHeader.reducer";

export const patientHeaderAction = (patientHeader = null) => {
  return { 
    type: "header" , 
    payload: patientHeader ? patientHeader : getSessionStorageWithPatientHeader("patientHeader"), 
    hasPatientHeader: true 
  };
};

export const patientHeaderActionClear = (patientHeader = {}) => {
  return { 
    type: "clear" , 
    payload: null, 
    hasPatientHeader: false 
  };
};

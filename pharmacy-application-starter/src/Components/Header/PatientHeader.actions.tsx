export const patientHeaderAction = (patientHeader = {}) => {
  return { 
    type: "header" , 
    payload: patientHeader, 
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

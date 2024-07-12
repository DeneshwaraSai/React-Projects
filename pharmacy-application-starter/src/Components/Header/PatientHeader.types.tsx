export type PatientHeader = {
  patientId:number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  uhid: number;
  orderNumber: string;
  orderStatus: string;
  billStatus: string;
};

export type PatientAction = {
  type: string;
  payload: PatientHeader;
  hasPatientHeader: boolean
};

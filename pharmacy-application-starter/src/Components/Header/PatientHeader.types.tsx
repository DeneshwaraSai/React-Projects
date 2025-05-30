export type PatientHeaderContext = {
  patientId: number | null;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  uhid: number;
  orderNumber: string;
  orderStatus: string;
  billStatus: string;
  phoneNumber: string;
  // pharmacyContent: PharmaContent;
};

export type PharmaContent = {

}


export type PatientAction = {
  type: string;
  payload: PatientHeaderContext;
  hasPatientHeader: boolean;
};

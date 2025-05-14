export type PatientSearch = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  uhid: Number | null | undefined;
};

export const initialPatientSearch: PatientSearch = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  uhid: undefined,
};

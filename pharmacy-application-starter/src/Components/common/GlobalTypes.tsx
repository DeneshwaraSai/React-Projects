export type SimpleCodeValue = {
  code: string;
  value: string;
};

export type SnackbarType = {
  show: boolean;
  type: "success" | "error" | "info" | "warning";
  message: string;
};

export type ErrorMessage = {
  show: boolean;
  messageList: string[];
};

export type PatientSearch = {
  firstName: string;
  lastName: string;
  uhid: number;
  phoneNumber: string;
};

export type AutoCompleteType = {
  label: string;
  value: number;
};

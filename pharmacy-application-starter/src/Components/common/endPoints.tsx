export const PHARMACY_HOST_NAME = "http://localhost:8080";

export class EndPoints {
  static PATIENT_SAVE = "/patient/save";
  static PATIENT_UPDATE = "/patient/update";
  static FIND_PATIENT_BY_ID = "/patient/{patientId}";
  static FIND_PATIENT_HEADER_BY_UHID = "/patient/uhid/{uhid}";
  static SEARCH_PATIENT_BY_NAME = '/patient/search/{value}';
  static PATIENT_LIST = '/patient/list';
  
  static GET_TAX_CATEGORY = '/taxCategory/list';
}

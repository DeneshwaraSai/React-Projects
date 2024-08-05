export const PHARMACY_HOST_NAME = "http://localhost:8080";

export class EndPoints {
  static PATIENT_SAVE = "/patient/save";
  static PATIENT_UPDATE = "/patient/update";
  static FIND_PATIENT_BY_ID = "/patient/{patientId}";
  static FIND_PATIENT_HEADER_BY_UHID = "/patient/uhid/{uhid}";
  static SEARCH_PATIENT_BY_NAME = "/patient/search/{value}";
  static PATIENT_LIST = "/patient/list";

  static GET_TAX_CATEGORY = "/taxCategory/list";

  static GET_CODE_VALUE = "/codeValue/list";

  static SAVE_DRUG = "/drug/save";
  static UPDATE_DRUG = "/drug/update";
  static FIND_DRUG_BY_ID = "/drug/{id}";
  static DRUG_LIST = "/drug/all";
    static DRUG_LIST_BY_NAME ="/drug/name";

  static SUPPLIER_CODE_VALUE = "/supplier/codeValue";
  static SUPPLIER_LIST = "/supplier/supplier-list"; 
  static SUPPLIER_CREATE = "/supplier/create";
  static SUPPLIER_UPDATE = "/supplier/update";
  static SUPPLIER_FIND_BY_ID = "/supplier/{id}";
}

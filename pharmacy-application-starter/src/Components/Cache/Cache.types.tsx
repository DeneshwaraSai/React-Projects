export type ApplicationCache = {
  taxCategory: TaxCategory[];
  codeValue: Map<string, CodeValue[]> | null;
};

export type CacheAction = {
  type: String;
  payload: any;
};

export type TaxCategory = {
  id: Number | null;
  code: string| String | null;
  igst: Number | null;
  cgst: Number | null;
  sgst: Number | null;
};

export type CodeValue = {
  code: String;
  value: String;
};

export type LabelValue = {
  label: string;
  value: string;
  object: any | null;
};

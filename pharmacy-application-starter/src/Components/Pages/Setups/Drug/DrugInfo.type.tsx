export type DrugInfo = {
  id: Number | null;
  name: String | null;
  type: String | null;
  unitsPerPack: Number | null;
  hsnCode: String | null;
  cgst: Number | null;
  igst: Number | null;
  sgst: Number | null;
  status: String | null;
  composition: String | null;
  genericName: String | null;
};

export type SeletedDrug = {
  item: DrugInfo;
  index: Number;
};

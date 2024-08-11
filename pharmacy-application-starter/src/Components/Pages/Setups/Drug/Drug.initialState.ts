import { DrugInfo } from "./DrugInfo.type";

export const drugInfoInitialState: DrugInfo = {
    id: null,
    name: "",
    type: "",
    unitsPerPack: 0,
    hsnCode: "",
    cgst: 0.0,
    igst: 0.0,
    sgst: 0.0,
    status: "",
    composition: "",
    genericName: "",
  };
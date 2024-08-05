import { InventoryDetails } from "./Inventory.type";

export const inventoryChildInitialState: InventoryDetails = {
  id: undefined,
  drugName: undefined,
  drugCode: undefined,
  batchNumber: undefined,
  expiryDate: undefined,
  stripSize: undefined,
  quantity: undefined,
  hsnCode: undefined,
  cgst: undefined,
  sgst: undefined,
  manufacturerRate: undefined,
  totalManufacturerRate: undefined,
  netAmount: undefined,
  sellingCost: undefined,
  totalSellingCost: undefined,
};

export const TableHeaders = [
  "Drug Name",
  "Batch Number",
  "Expiry Date",
  "Strip Size",
  "Quantity",
  "HSN Code",
  "Manufacturer Rate",
  "Total Manufacturer Rate",
  "Net Amount",
  "Selling Cost",
  "Total Selling Cost",
  "",
];

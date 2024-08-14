import { SnackbarType } from "../../common/GlobalTypes";
import { Inventory, InventoryItems, InventoryModal } from "./Inventory.type";

export const inventoryChildInitialState: InventoryItems = {
  id: undefined,
  drugName: "",
  drugCode: "",
  batchNumber: "",
  expiryDate: new Date(),
  stripSize: 0,
  quantity: 0,
  hsnCode: "",
  cgst: 0,
  sgst: 0,
  manufacturerRate: 0,
  totalManufacturerRate: 0,
  netAmount: 0,
  invoiceAmount: 0,
  sellingCost: 0,
  totalSellingCost: 0,
};

export const inventoryInitialState: Inventory = {
  id: undefined,
  supplierCode: "",
  invoiceNumber: "",
  invoiceDate: new Date(),
  discountPerc: 0,
  discountAmt: 0,
  invoiceAmt: 0,
  notes: "",
  inventoryNumber: 0,
  inventoryDetails: [],
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
  // "Net Amount Including discounts",
  "Invoice Amount including Taxes",
  "Selling Cost",
  "Total Selling Cost",
  "",
];

export const initialInventoryModal: InventoryModal = {
  isOpen: false,
  deleteIndex: null,
};
export const initialSnackbar: SnackbarType = {
  show: false,
  type: "error",
  message: "",
};

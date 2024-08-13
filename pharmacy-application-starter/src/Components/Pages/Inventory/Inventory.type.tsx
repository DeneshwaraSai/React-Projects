export type InventorySearch = {
  supplierName: String;
  invoiceNumber: String;
  drugName: String;
  toDate: String;
  status: String;
};

export type Payment = {
  id: Number | undefined;
  paymentMethod: String;
  paymentAmount: Number;
  paymentDate: Date;
  paymentNodes: String;
};

export type PaymentInfo = {
  show: boolean;
  paymentDetails: Payment[];
};

export type Inventory = {
  id: Number | undefined;
  supplierCode: String;
  invoiceNumber: String;
  invoiceDate: Date;
  discountPerc: Number;
  discountAmt: Number;
  invoiceAmt: Number;
  notes: string;
  inventoryNumber: Number;
  inventoryDetails: InventoryItems[];
};

export type InventoryItems = {
  id: Number | undefined;
  drugName: String;
  drugCode: String;
  batchNumber: String;
  expiryDate: Date | null;
  stripSize: Number;
  quantity: Number;
  hsnCode: String;
  cgst: Number;
  sgst: Number;
  manufacturerRate: Number;
  totalManufacturerRate: Number;
  netAmount: Number;
  invoiceAmount: Number;
  sellingCost: Number;
  totalSellingCost: Number;
};

export type InventoryModal = {
  isOpen: boolean;
  deleteIndex: Number | null;
};

export type SimpleLabelCode = {
  label: string;
  code: string;
};

export type InventoryDashboard = {
  id: Number;
  invoiceNumber: String;
  invoiceAmt: Number;
  supplierCode: String;
  invoiceDate: Date;
  inventoryNumber: Number;
  status: String;
  createdBy: String;
};

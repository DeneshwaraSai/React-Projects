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

export type InventoryDetails = {
  id: Number | undefined;
  drugName: String | undefined;
  drugCode: Number | undefined;
  batchNumber: String | undefined;
  expiryDate: Date | undefined;
  stripSize: Number | undefined;
  quantity: Number | undefined;
  hsnCode: String | undefined;
  cgst: Number | undefined;
  sgst: Number | undefined;
  manufacturerRate: Number | undefined;
  totalManufacturerRate: Number | undefined;
  netAmount: Number | undefined;
  sellingCost: Number | undefined;
  totalSellingCost: Number | undefined;
};

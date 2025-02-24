export type Order = {
  orderNumber: string;
  sequenceNumber: string;
  billNumber: string;
  transactionId: string;
  orderDate: Date;
  lastModifiedDate: Date;
  uhid: number;
  status: string;
  amountPaid: number;
  dueAmount: number;
  createdBy: string;
  lastModifiedBy: string;
  orderDetails: OrderItems[];
};

export type OrderItems = {
  id: string | null;
  supplierCode: string;
  supplierName: string;
  batchNumber: string;
  drugId: string;
  drugName: string; // Transient
  taxCategory: string;
  expiryDate: Date;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
  discountPerc: number;
  billReceivableDetailsId: string | null;
  netAmount: number;
  sgst: number; // Transient
  cgst: number; // Transient
  sgstAmount: number; // Transient
  cgstAmount: number; // Transient
};

export type InventorySearchDto = {
  batchNumber: string;
  cgst: number;
  drugCode: number;
  drugName: string;
  expiryDate: Date;
  hsnCode: string;
  quantity: number;
  sellingCost: number;
  sgst: number;
  supplierCode: string;
  supplierName: string;
  totalSellingCost: number;
};

export type CashReceipt = {
  transactionId: string;
  billNumber: string;
  amountPaid: number;
  paymentType: string;
  bankName: string;
  billAmount: number;
  notes: string;
  receivedDate: Date;
  receivedBy: string;
  referenceNumber: string;
  discountPerc: number;
  discountAmount: number;
};

export const initialCashReceipt: CashReceipt = {
  transactionId: "",
  billNumber: "",
  amountPaid: 0.0,
  paymentType: "",
  bankName: "",
  billAmount: 0.0,
  notes: "",
  receivedDate: new Date(),
  receivedBy: "",
  referenceNumber: "",
  discountPerc: 0.0,
  discountAmount: 0.0,
};

export type OrderRequest = {
  orderInfo: Order;
  cashReceipt: CashReceipt;
};

export type OrderState = {
  orderInfo: Order;
  cashReceipt: CashReceipt;
  orderItems: OrderItems[];
  showPayment: boolean;
  errorMessage: string[];
};

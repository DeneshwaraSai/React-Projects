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

export const PAYMENT_TYPE = [
  {
    code: "CASH",
    value: "Cash",
  },
  {
    code: "CHQ",
    value: "Cheque",
  },
  {
    code: "NB",
    value: "Net Banking",
  },
  {
    code: "MB",
    value: "Mobile Banking",
  },
  {
    code: "DC",
    value: "Debit Card",
  },
  {
    code: "CC",
    value: "Credit Card",
  },
];
